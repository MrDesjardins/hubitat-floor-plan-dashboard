import React, { useReducer, useEffect } from "react";
import "typeface-roboto";
import "./App.css";
import { Stage, Layer } from "react-konva";
import { FloorPlan } from "./FloorPlan";
import { appReducer, initialState } from "./reducers/appReducer";
import { AppActions } from "./actions/appActions";
import { Dimmer } from "./DeviceComponents/Dimmer";
import {
    getDevice,
    getDimmerLightLevel,
    getDimmerOnOff,
    getDeviceType
} from "./Logics/AttributeLogics";
import { DeviceIds, APP_ID, API_TOKEN } from "./Models/DeviceIds";
import { DeviceDataKind } from "./Models/DimmingLight";

function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        console.log("Load from Hubitat");

        async function fetchData() {
            const response = await fetch(
                `http://10.0.0.191/apps/api/${APP_ID}/devices/${DeviceIds.LIVING_ROOM_CEILING_LIGHT}?access_token=${API_TOKEN}`
            );
            const json = await response.json();
            dispatch(
                AppActions.initDevice({
                    id: DeviceIds.LIVING_ROOM_CEILING_LIGHT,
                    jsonPayload: json
                })
            );
        }
        fetchData();
    }, []);

    return (
        <div className="App">
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <FloorPlan />
                    <Dimmer
                        componentId={DeviceIds.LIVING_ROOM_CEILING_LIGHT}
                        deviceData={getDevice(
                            state,
                            DeviceIds.LIVING_ROOM_CEILING_LIGHT
                        )}
                        position={[565, 440]}
                        onSave={(deviceData: DeviceDataKind) => {
                            save(deviceData);
                        }}
                    />
                    {/* <Rect width={50} height={50} fill="green" /> */}
                </Layer>
            </Stage>
        </div>
    );
}

function save(deviceData: DeviceDataKind): void {
    if (deviceData.kind === "DimmingLightData") {
        const levelRoom = getDimmerLightLevel(deviceData);
        const livingRoomOn = getDimmerOnOff(deviceData);
        const deviceId = deviceData.id;
        const extractedDeviceType = getDeviceType(deviceData.name);
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
            `Saving Device id ${deviceId} of type ${extractedDeviceType} to Hubitat with values: ${levelRoom} - ${livingRoomOn}`
        );
    }
}

export default App;
