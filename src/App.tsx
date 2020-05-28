import { Button, Divider, Drawer, Grid, ThemeProvider } from "@material-ui/core";
import DataAccessGateway from "dataaccessgateway";
import { getDimmerLightLevelAttribute, getLightOnOffAttribute } from "Logics/attributeLogics";
import React, { useEffect, useReducer, useRef, useState } from "react";
import "typeface-roboto";
import { AppActions, InitData } from "actions/appActions";
import "./App.css";
import { AirPurifierOptions } from "Components/AirPurifierOptions";
import { DimmerLightOptions } from "Components/DimmerLightOptions";
import { LightSwitchOptions } from "Components/LightSwitchOptions";
import { MainMenu } from "Components/MainMenu";
import { APP_HEIGHT, APP_WIDTH, DARK_THEME, MAIN_MENU_WIDTH } from "./constants";
import { ActionsWithPayload } from "infrastructure/ReducerActions";
import { allDevices } from "Models/allDevices";
import { AirPurifierDevice, DeviceData, DeviceDataKind, DeviceWebsocket, DimmingLightDevice, LightSwitchDevice } from "Models/devices";
import { MainCanvas } from "PureCanvas/MainCanvas";
import { appReducer, initialState } from "reducers/appReducer";

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

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [readyWs, setReadyWs] = useState(false);
  const websocketRef = useRef(new WebSocket(webSocketUrl));
  const [reconnectWebsocket, setReconnectWebsocket] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [configuringDevice, setConfiguringDevice] = useState<
    DeviceData | undefined
  >(undefined);
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
              console.log(
                `Does not save ${objData.displayName}: No device configured for id# ${objData.deviceId}`
              );
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
    console.log(`Temperature mode is ${state.isTemperatureModeOn}`);
  }, [state.isTemperatureModeOn]);
  return (
    <div
      className="App"
      style={{
        width: APP_WIDTH,
        height: APP_HEIGHT,
      }}
    >
      <ThemeProvider theme={DARK_THEME}>
        <MainMenu
          temperatureMode={state.isTemperatureModeOn}
          onChangeTemperature={(isTemperatureModeOn: boolean) => {
            dispatch(AppActions.setTemperatureMode(isTemperatureModeOn));
          }}
        />
        <MainCanvas
          width={APP_WIDTH - MAIN_MENU_WIDTH}
          height={APP_HEIGHT}
          devices={state.devices}
          isTemperatureModeOn={state.isTemperatureModeOn}
          openConfiguration={(dev: DeviceDataKind, openDrawer: boolean) => {
            setConfiguringDevice(dev);
            setDrawerOpen(openDrawer);
          }}
        />
        <Drawer
          className={"app-drawer"}
          anchor={"bottom"}
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
      } else if (configuringDevice.kind === "AIRPURIFIER") {
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
    | ActionsWithPayload<"ACTION_SET_TEMPERATURE_MODE", boolean>
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
  }
}

export default App;
