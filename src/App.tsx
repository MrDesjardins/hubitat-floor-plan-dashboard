import {
  Button,
  Divider,
  Drawer,
  Grid,
  ThemeProvider,
  Snackbar,
} from "@material-ui/core";
import { AppActions, InitData } from "actions/appActions";
import { AirPurifierOptions } from "components/AirPurifierOptions";
import { DimmerLightOptions } from "components/DimmerLightOptions";
import { LightSwitchOptions } from "components/LightSwitchOptions";
import { MainMenu } from "components/MainMenu";
import DataAccessGateway, { AjaxRequestExecute } from "dataaccessgateway";
import { ActionsWithPayload } from "infrastructure/reducerActions";
import {
  getDimmerLightLevelAttribute,
  getLightOnOffAttribute,
  getDeadboltAttribute,
  getAlarmCodes,
} from "logics/attributeLogics";
import { allDevices } from "models/allDevices";
import {
  AirPurifierDevice,
  DeviceData,
  DeviceDataKind,
  DeviceWebsocket,
  DimmingLightDevice,
  LightSwitchDevice,
  DeadboltDevice,
  VirtualKeyPadDevice,
} from "models/devices";
import { MainCanvas } from "pureCanvas/MainCanvas";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { appReducer, initialState } from "reducers/appReducer";
import "typeface-roboto";
import "./App.css";
import { WeatherPanel } from "./components/WeatherPanel";
import {
  APP_HEIGHT,
  APP_WIDTH,
  DARK_THEME,
  FETCHING_WEATHER_TIME_MS,
  MAIN_MENU_WIDTH,
  FETCHING_ALL_DEVICES_TIME_MS,
} from "./constants";
import { useInterval } from "./hooks/useInterval";
import { Weather } from "./models/weather";
import { DeadboltOptions } from "./components/DeadboltOptions";
import { Mode } from "./models/mode";
import { AlarmAction } from "./models/alarm";
import { KeyPad } from "./components/KeyPad";
import { Alert, AlertTitle } from '@material-ui/lab';

const SERVER_IP = process.env.REACT_APP_SERVER_IP;
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const WEBSOCKET_IP = process.env.REACT_APP_WEBSOCKET_IP;
const WEBSOCKET_PORT = process.env.REACT_APP_WEBSOCKET_PORT;
const WEBSOCKET_ENABLED = process.env.REACT_APP_WEBSOCKET_ENABLED === "true";

console.log(`Server  ${SERVER_IP}:${SERVER_PORT}, `);
console.log(
  `WS ${
  WEBSOCKET_ENABLED ? "Enabled" : "Disabled"
  } ${SERVER_IP}:${WEBSOCKET_PORT}, `
);

const webSocketUrl = `ws://${WEBSOCKET_IP}:${WEBSOCKET_PORT}`;

const dag = DataAccessGateway("HubitatDashboard");
dag.setConfiguration({
  defaultLifeSpanInSeconds: 30,
});
const audioBeep = new Audio("beep.mp3");
function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [readyWs, setReadyWs] = useState(false);
  const websocketRef = useRef(new WebSocket(webSocketUrl));
  const [reconnectWebsocket, setReconnectWebsocket] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [configuringDevice, setConfiguringDevice] = useState<
    DeviceData | undefined
  >(undefined);
  const [audio, setAudio] = useState(false);
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };
  useInterval(() => {
    if (audio) {
      audioBeep.play();
    }
  }, 1000);
  useEffect(() => {
    if (WEBSOCKET_ENABLED) {
      websocketRef.current = new WebSocket(webSocketUrl);
      console.log("attempt connection to ", webSocketUrl);
      websocketRef.current.onopen = function (e: Event) {
        console.log(`connection to  ${webSocketUrl} established`);
      };

      websocketRef.current.onmessage = (e: MessageEvent) => {
        if (readyWs) {
          try {
            console.log("OnMessage Data", e);
            const objData = JSON.parse(e.data) as DeviceWebsocket;
            const configuredData = allDevices[objData.deviceId];
            if (configuredData !== undefined) {
              const existingDevice = state.devices[objData.deviceId];
              const copyExistingDevice = {
                ...existingDevice,
              };
              copyExistingDevice.attributes = {
                ...copyExistingDevice.attributes,
              };
              copyExistingDevice.attributes[objData.name] = objData.value;
              dispatch(
                AppActions.initDevice({
                  devices: [copyExistingDevice],
                })
              );
            } else {
              if (objData.name === "hsmStatus" || objData.name === "hsmAlert") {
                console.log(objData);
                dispatch(AppActions.notify({ type: objData.name, value: objData.value }));

                if (objData.name === "hsmAlert") {
                  setAudio(objData.value === "intrusion-delay"); //""intrusion" is when reached
                }
              } else {
                console.log(
                  `Does not save ${objData.displayName}: No device configured for id# ${objData.deviceId} `
                );
              }
            }
          } catch (e) {
            console.log("Invalid JSON data received from websocket", e);
            return;
          }
        }
      };

      websocketRef.current.onclose = (e: CloseEvent) => {
        console.log("onclose", e);
        setTimeout(function () {
          setReconnectWebsocket({}); // New reference of objet will force this useEffect to restart
        }, 5000);
      };

      websocketRef.current.onerror = (event: Event) => {
        console.log("onError", event);
        websocketRef.current.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reconnectWebsocket, readyWs]);

  useEffect(() => {
    console.log("🌐 Fething all data");
    dag
      .fetchFastAndFresh<DeviceDataKind[]>({
        request: {
          method: "GET",
          url: `http://${SERVER_IP}:${SERVER_PORT}/api/getall`,
        },
      })
      .then((value) => {
        console.log("🌐 Using Data From Cache");
        saveState(value.result, dispatch);
        if (value.webPromise !== undefined) {
          value.webPromise.then((valueWeb) => {
            console.log("🌐 Using Data From Hubitat Server");
            saveState(valueWeb.result, dispatch);
          });
        }
        setReadyWs(true);
      });
  }, []);

  let optionComponent: JSX.Element | undefined = getOptionComponent();
  useEffect(() => {
    console.log(`Temperature mode is ${state.mode}`);
  }, [state.mode]);

  useInterval(
    () => {
      console.log("🌐 Fething all outside weather");
      dag
        .fetchFastAndFresh<Weather>({
          request: {
            method: "GET",
            url: `http://${SERVER_IP}:${SERVER_PORT}/api/weather`,
          },
          memoryCache: { lifespanInSeconds: 60 * 5 },
          persistentCache: { lifespanInSeconds: 60 * 5 },
        })
        .then((value) => {
          console.log("🌐 Using Weather Data From Cache");
          dispatch(AppActions.setOutsideWeather(value.result));
          if (value.webPromise !== undefined) {
            value.webPromise.then((valueWeb) => {
              console.log("🌐 Using Weather Data From Open Weather Server");
              dispatch(AppActions.setOutsideWeather(valueWeb.result));
            });
          }
          setReadyWs(true);
        });
    },
    FETCHING_WEATHER_TIME_MS,
    true
  );

  useInterval(
    () => {
      console.log("🌐 Fething all devices");
      dag
        .fetchFresh<DeviceDataKind[]>({
          request: {
            method: "GET",
            url: `http://${SERVER_IP}:${SERVER_PORT}/api/getall`,
          },
        })
        .then((value) => {
          console.log("🌐 Saving all devices data from web");
          saveState(value.result, dispatch);
        });
    },
    FETCHING_ALL_DEVICES_TIME_MS,
    false
  );



  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(AppActions.notify(undefined));
  };
  return (
    <div
      className="App"
      style={{
        width: APP_WIDTH,
        height: APP_HEIGHT,
      }}
    >
      <ThemeProvider theme={DARK_THEME}>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={state.feedback !== undefined} autoHideDuration={4000} onClose={handleClose}>

          <Alert variant="filled" onClose={handleClose} severity={state.feedback?.type === "intrusion-home" ? "error" : "info"} >
            <AlertTitle>Alarm State Changed</AlertTitle>
            {state.feedback?.value}
          </Alert>
        </Snackbar>
        <MainMenu
          applicationMode={state.mode}
          alarmState={state.alarmAction}
          onChangeMode={(mode: Mode) => {
            dispatch(AppActions.setMode(mode));
          }}
          onAlarm={(action: AlarmAction) => {
            dispatch(AppActions.setAlarmAction(action));
            if (action !== AlarmAction.Disarming) {
              let command: string;
              switch (action) {
                case AlarmAction.Away:
                  command = "armAway";
                  break;
                case AlarmAction.Disarmed:
                  command = "disarm";
                  break;
                case AlarmAction.Sleep:
                  command = "armNight";
                  break;
                case AlarmAction.Home:
                  command = "armHome";
                  break;
              }
              const request: AjaxRequestExecute = {
                request: {
                  method: "GET",
                  url: `http://${SERVER_IP}:${SERVER_PORT}/api/command/513/${command}`,
                },
              };
              dag.execute(request);
            }
          }}
        />
        {state.alarmAction === AlarmAction.Disarming ? (
          <KeyPad
            goodCodes={getAlarmCodes(state.devices[513] as VirtualKeyPadDevice)}
            disarm={() => {
              dispatch(AppActions.setAlarmAction(AlarmAction.Disarmed));
              const command: string = "disarm";
              const request: AjaxRequestExecute = {
                request: {
                  method: "GET",
                  url: `http://${SERVER_IP}:${SERVER_PORT}/api/command/513/${command}`,
                },
              };
              dag.execute(request);
            }}
            alarmState={state.alarmAction}
            rollback={() => {
              dispatch(AppActions.setAlarmAction(state.previousAlarmAction));
            }}
          />
        ) : undefined}
        <MainCanvas
          width={APP_WIDTH - MAIN_MENU_WIDTH}
          height={APP_HEIGHT}
          devices={state.devices}
          mode={state.mode}
          openConfiguration={(dev: DeviceDataKind, openDrawer: boolean) => {
            setConfiguringDevice(dev);
            setDrawerOpen(openDrawer);
          }}
        />
        <Drawer
          className={"app-drawer"}
          anchor={"left"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <h1>
            {configuringDevice === undefined
              ? "Unknown"
              : configuringDevice.label}
          </h1>
          {optionComponent}
          <Divider />
          <Grid
            container={true}
            alignContent={"flex-end"}
            alignItems={"flex-end"}
            direction={"column-reverse"}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                setDrawerOpen(false);
              }}
              style={{ marginLeft: 10 }}
            >
              Close
            </Button>
          </Grid>
        </Drawer>
        {drawerOpen ? undefined : (
          <WeatherPanel data={state.weather} alarmState={state.alarmAction} />
        )}
      </ThemeProvider>
    </div>
  );

  function getOptionComponent(): JSX.Element | undefined {
    let optionComponent: JSX.Element | undefined;
    if (configuringDevice !== undefined) {
      if (configuringDevice.kind === "SWITCH") {
        optionComponent = (
          <LightSwitchOptions
            dimmerName={configuringDevice.label}
            isDialogOpen={drawerOpen}
            deviceData={{
              ...(configuringDevice as LightSwitchDevice),
            }}
            onClose={() => {
              toggleDrawer(false);
            }}
            onSave={(deviceToSave: LightSwitchDevice) => {
              dispatch(AppActions.saveDevice({ ...deviceToSave }));
              save(state.devices[deviceToSave.id], deviceToSave);
            }}
          />
        );
      } else if (configuringDevice.kind === "DIMMER") {
        optionComponent = (
          <DimmerLightOptions
            dimmerName={configuringDevice.label}
            isDialogOpen={drawerOpen}
            deviceData={{
              ...(configuringDevice as DimmingLightDevice),
            }}
            onClose={() => {
              toggleDrawer(false);
            }}
            onSave={(deviceToSave: DimmingLightDevice) => {
              dispatch(AppActions.saveDevice(deviceToSave));
              save(state.devices[deviceToSave.id], deviceToSave);
            }}
          />
        );
      } else if (
        configuringDevice.kind === "AIRPURIFIER" ||
        configuringDevice.kind === "PROJECTING_LIGHT"
      ) {
        optionComponent = (
          <AirPurifierOptions
            switchName={configuringDevice.label}
            isDialogOpen={drawerOpen}
            deviceData={{
              ...(configuringDevice as AirPurifierDevice),
            }}
            onClose={() => {
              toggleDrawer(false);
            }}
            onSave={(deviceToSave: AirPurifierDevice) => {
              dispatch(AppActions.saveDevice(deviceToSave));
              save(state.devices[deviceToSave.id], deviceToSave);
            }}
          />
        );
      } else if (configuringDevice.kind === "DEADBOLT") {
        optionComponent = (
          <DeadboltOptions
            name={configuringDevice.label}
            isDialogOpen={drawerOpen}
            deviceData={{
              ...(configuringDevice as DeadboltDevice),
            }}
            onClose={() => {
              toggleDrawer(false);
            }}
            onSave={(deviceToSave: DeadboltDevice) => {
              dispatch(AppActions.saveDevice(deviceToSave));
              save(state.devices[deviceToSave.id], deviceToSave);
            }}
          />
        );
      }
    }
    return optionComponent;
  }
}

function saveState(
  value: DeviceDataKind[],
  dispatch: React.Dispatch<
    | ActionsWithPayload<"ACTION_INIT_DEVICE", InitData>
    | ActionsWithPayload<"ACTION_SAVE_DEVICE", DeviceDataKind>
    | ActionsWithPayload<"ACTION_SET_TEMPERATURE_MODE", Mode>
  >
) {
  const allDataWithConfigurationInAllDevices: DeviceDataKind[] = [];
  value.forEach((p) => {
    const configData = allDevices[p.id];
    if (configData !== undefined) {
      const mergedData = { ...configData, ...p };
      allDataWithConfigurationInAllDevices.push(mergedData);
    }
  });
  dispatch(
    AppActions.initDevice({
      devices: allDataWithConfigurationInAllDevices,
    })
  );
}

function save(
  existingDeviceData: DeviceDataKind,
  newDeviceData: DeviceDataKind
): void {
  if (existingDeviceData.kind === "DIMMER" && newDeviceData.kind === "DIMMER") {
    if (
      getDimmerLightLevelAttribute(existingDeviceData) !==
      getDimmerLightLevelAttribute(newDeviceData)
    ) {
      console.log("Saving Dimmer Light Level");
      fetch(
        `http://${SERVER_IP}:${SERVER_PORT}/api/save/${
        existingDeviceData.id
        }/setLevel/${getDimmerLightLevelAttribute(newDeviceData)}`
      );
    }
    if (
      getLightOnOffAttribute(existingDeviceData) !==
      getLightOnOffAttribute(newDeviceData)
    ) {
      console.log("Saving Dimmer Power");
      fetch(
        `http://${SERVER_IP}:${SERVER_PORT}/api/save/${existingDeviceData.id}/${
        getLightOnOffAttribute(newDeviceData) ? "on" : "off"
        }`
      );
    }
  } else if (
    existingDeviceData.kind === "SWITCH" &&
    newDeviceData.kind === "SWITCH"
  ) {
    if (
      getLightOnOffAttribute(existingDeviceData) !==
      getLightOnOffAttribute(newDeviceData)
    ) {
      console.log("Saving Switch Light Level");
      fetch(
        `http://${SERVER_IP}:${SERVER_PORT}/api/save/${existingDeviceData.id}/${
        getLightOnOffAttribute(newDeviceData) ? "on" : "off"
        }`
      );
    }
  } else if (
    existingDeviceData.kind === "DEADBOLT" &&
    newDeviceData.kind === "DEADBOLT"
  ) {
    if (
      getDeadboltAttribute(existingDeviceData) !==
      getDeadboltAttribute(newDeviceData)
    ) {
      console.log("Saving Dead bolt Level");
      fetch(
        `http://${SERVER_IP}:${SERVER_PORT}/api/save/${existingDeviceData.id}/${
        getDeadboltAttribute(newDeviceData) ? "lock" : "unlock"
        }`
      );
    }
  }
}
export default App;
