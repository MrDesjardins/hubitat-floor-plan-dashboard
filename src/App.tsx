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
    getDeviceType
} from "./Logics/AttributeLogics";
import { allDevices, APP_ID, API_TOKEN } from "./Models/DeviceIds";
import { DeviceDataKind } from "./Models/DeviceData";

function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        console.log("Load from Hubitat");

        const all = Promise.all(
            allDevices.map(device => {
                return fetch(
                    `http://10.0.0.191/apps/api/${APP_ID}/devices/${device.deviceId}?access_token=${API_TOKEN}`
                ).then((data: any) => {
                    return Promise.resolve(data.json()).then(d => {
                        return {
                            id: device.deviceId,
                            data: d
                        };
                    });
                });
            })
        );

        all.then(listPromise => {
            listPromise.forEach(p => {
                dispatch(AppActions.initDevice({ id: p.id, data: p.data }));
            });
        });
    }, []);

    return (
        <div className="App">
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <FloorPlan />
                    {allDevices.map(dev =>
                        React.createElement(dev.component, {
                            key: dev.deviceId,
                            componentId: dev.deviceId,
                            deviceData: getDevice(
                                state,
                                dev.deviceId,
                                dev.deviceType
                            ),
                            position: dev.position,
                            onSave: (deviceData: DeviceDataKind) => {
                                save(deviceData);
                            }
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
