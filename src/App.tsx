import React, { useReducer, useEffect, useRef, useState } from "react";
import "typeface-roboto";
import "./App.css";
import { Stage, Layer } from "react-konva";
import { FloorPlan } from "./FloorPlan";
import { appReducer, initialState } from "./reducers/appReducer";
import { AppActions } from "./actions/appActions";
import {
    getDimmerLightLevel,
    getDimmerOnOff,
    getDeviceType,
} from "./Logics/AttributeLogics";
import { allDevices } from "./Models/AllDevices";
import { DeviceDataKind, DeviceWebsocket } from "./Models/Devices";
const ip = "10.0.0.177";
const url = `ws://${ip}:5001`;

// function connect() {
//     const ws = new WebSocket(url);
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
    const [readyWs, setReadyWs] = useState(false);
    const websocketRef = useRef(new WebSocket(url));
    const [reconnectWebsocket, setReconnectWebsocket] = useState({});
    useEffect(() => {
        websocketRef.current = new WebSocket(url);
        console.log("attempt connection to ", url);
        websocketRef.current.onopen = function (e: Event) {
            console.log(`connection to  ${url} established`);
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
                        copyExistingDevice.attributes[objData.name] =
                            objData.value;
                        dispatch(
                            AppActions.initDevice({
                                device: copyExistingDevice,
                            })
                        );
                    } else {
                        console.log(
                            `Does not save ${objData.displayName}: No device configured`
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
    }, [reconnectWebsocket, readyWs]);

    useEffect(() => {
        console.log("Load from Hubitat");
        fetch(`http://${ip}:5000/api/getall`).then((value: Response) => {
            value.json().then((data: DeviceDataKind[]) => {
                data.forEach((p) => {
                    const configData = allDevices[p.id];
                    if (configData !== undefined) {
                        const mergedData = { ...configData, ...p };
                        dispatch(
                            AppActions.initDevice({
                                device: mergedData,
                            })
                        );
                    }
                });
                setReadyWs(true);
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
                            deviceData: dev,
                            position: dev.position,
                            onSave: (newDeviceData: DeviceDataKind) => {
                                save(
                                    state.devices[newDeviceData.id],
                                    newDeviceData
                                );
                            },
                        })
                    )}
                </Layer>
            </Stage>
        </div>
    );
}

function save(
    existingDeviceData: DeviceDataKind,
    newDeviceData: DeviceDataKind
): void {
    if (
        existingDeviceData.kind === "DIMMER" &&
        newDeviceData.kind === "DIMMER"
    ) {
        if (
            getDimmerLightLevel(existingDeviceData) !==
            getDimmerLightLevel(newDeviceData)
        ) {
            console.log("Saving Dimmer Light Level");
            // fetch(
            //     `http://${ip}:5000/api/save/${existingDeviceData.id}/setLevel/${levelRoom}`
            // );
        }
        if (
            getDimmerOnOff(existingDeviceData) !== getDimmerOnOff(newDeviceData)
        ) {
            console.log("Saving Dimmer Power");
            // fetch(
            //     `http://${ip}:5000/api/save/${existingDeviceData.id}/${
            //         livingRoomOn ? "on" : "off"
            //     }`
            // );
        }
    }
}

export default App;
