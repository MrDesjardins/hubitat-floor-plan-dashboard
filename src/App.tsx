import React, { useReducer, useEffect } from "react";
import "typeface-roboto";
import "./App.css";
import { Stage, Layer } from "react-konva";
import { FloorPlan } from "./FloorPlan";
import { appReducer, initialState } from "./reducers/appReducer";
import { AppActions } from "./actions/appActions";
import {
    getDevice,
    getDimmerLightLevel,
    getDimmerOnOff,
    getDeviceType,
} from "./Logics/AttributeLogics";
import { allDevices } from "./Models/AllDevices";
import { useInterval } from "./hooks/useInterval";
import { API_TOKEN, APP_ID } from "./Models/HubitatConstants";
import { DeviceDataKind, DeviceData } from "./Models/Devices";
import { response } from "express";
let off = false;

// function connect() {
//     var url = "ws://192.168.1.10/eventsocket";
//     var ws = new WebSocket(url);
//     console.log("attempt connection to ", url);
//     ws.onopen = function (e: Event) {
//         console.log(`connection to  ${url} established`);
//     };

//     ws.onmessage = (e: MessageEvent) => {
//         try {
//             console.log("OnMessage Data", e.data);
//         } catch (e) {
//             console.log("Invalid JSON data received from websocket", e.data);
//             return;
//         }
//     };

//     ws.onclose = (e: CloseEvent) => {
//         console.log("onclose", e);
//         setTimeout(function () {
//             connect();
//         }, 1000);
//     };

//     ws.onerror = (event: Event) => {
//         console.log("onError", event);
//         ws.close();
//     };
// }
// connect();
function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        console.log("Load from Hubitat");
        fetch(
            `http://10.0.0.191/apps/api/${APP_ID}/devices/all?access_token=${API_TOKEN}`
        ).then((value: Response) => {
            value.json().then((data: DeviceDataKind[]) => {
                data.forEach((p) => {
                    const configData = allDevices.find((d) => d.id === p.id);
                    if (configData !== undefined) {
                        const mergedData = { ...configData, ...p };
                        dispatch(
                            AppActions.initDevice({
                                device: mergedData,
                            })
                        );
                    }
                });
            });
        });
    }, []);

    return (
        <div className="App">
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <FloorPlan />
                    {Object.values(state.devices).map((dev) =>
                        React.createElement(dev.component, {
                            key: dev.id,
                            componentId: dev.id,
                            deviceData: getDevice(state, dev),
                            position: dev.position,
                            onSave: (deviceData: DeviceDataKind) => {
                                save(deviceData);
                            },
                        })
                    )}
                </Layer>
            </Stage>
        </div>
    );
}

function save(deviceData: DeviceDataKind): void {
    if (deviceData.kind === "DIMMER") {
        const levelRoom = getDimmerLightLevel(deviceData);
        const livingRoomOn = getDimmerOnOff(deviceData);
        const extractedDeviceType = getDeviceType(deviceData.id);
        // fetch(
        //     `http://10.0.0.191/apps/api/${APP_ID}/devices/${DeviceIds.LIVING_ROOM_CEILING_LIGHT}/setLevel/${levelRoom}?${API_TOKEN}`
        // );

        // fetch(
        //     `http://10.0.0.191/apps/api/${APP_ID}/devices/${
        //         DeviceIds.LIVING_ROOM_CEILING_LIGHT
        //     }/${
        //         livingRoomOn ? "on" : "off"
        //     }?access_token=${API_TOKEN}`
        // );
        console.log(
            `Saving Device id ${deviceData.id} of type ${extractedDeviceType} to Hubitat with values: ${levelRoom} - ${livingRoomOn}`
        );
    }
}

export default App;
