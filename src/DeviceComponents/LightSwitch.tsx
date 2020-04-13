import { useState } from "react";
import { ImageLightBulb } from "../ImageLightBulb";
import Konva from "konva";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { LightSwitchDevice } from "../Models/Devices";
import { getDimmerOnOff, setLightOnOff } from "../Logics/AttributeLogics";
import Portal from "../infrastructure/Portal";
import React from "react";
import { LightSwitchOptions } from "../Components/LightSwitchOptions";
import { TEXT_COLOR } from "../constants";
export interface LightSwitchOptions extends CommonProps {
    deviceData: LightSwitchDevice;
    position: [number, number];
    onSave: (deviceData: LightSwitchDevice) => void;
}
export const LightSwitch = (props: LightSwitchOptions) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [, updateState] = React.useState();
    return (
        <>
            <ImageLightBulb
                on={getDimmerOnOff(props.deviceData)}
                xPosition={props.position[0]}
                yPosition={props.position[1]}
                onClick={(e: Konva.KonvaEventObject<MouseEvent>) => {
                    setDialogOpen(true);
                }}
            />
            <Text
                text={`${getDimmerOnOff(props.deviceData) ? "On" : "Off"}`}
                x={props.position[0]}
                y={props.position[1] + 40}
                fill={TEXT_COLOR}
            />
            <Portal>
                <LightSwitchOptions
                    dimmerName={props.deviceData.name}
                    isDialogOpen={isDialogOpen}
                    deviceData={{ ...props.deviceData }}
                    openClose={(isOpen: boolean, isLightOn?: boolean) => {
                        if (isOpen === false && isLightOn === undefined) {
                            setDialogOpen(false);
                        } else if (isLightOn !== undefined) {
                            setDialogOpen(false);
                            const newDeviceData = { ...props.deviceData };
                            setLightOnOff(newDeviceData, isLightOn);
                            props.onSave(newDeviceData);
                            updateState({});
                        }
                    }}
                />
            </Portal>
        </>
    );
};
