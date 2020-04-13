import React, { useState } from "react";
import { ImageLightBulb } from "../ImageLightBulb";
import Konva from "konva";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { DimmerLightOptions } from "../Components/DimmerLightOptions";
import { DimmingLightDevice } from "../Models/Devices";
import Portal from "../infrastructure/Portal";
import { getDimmerOnOff, getDimmerLightLevel } from "../Logics/AttributeLogics";
import { TEXT_COLOR } from "../constants";

export interface DimmerOptions extends CommonProps {
    deviceData: DimmingLightDevice;
    position: [number, number];
    onSave: (deviceData: DimmingLightDevice) => void;
}
export const Dimmer = (props: DimmerOptions) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [, updateState] = React.useState();
    const isOn = getDimmerOnOff(props.deviceData);
    return (
        <>
            <ImageLightBulb
                on={isOn}
                xPosition={props.position[0]}
                yPosition={props.position[1]}
                onClick={(e: Konva.KonvaEventObject<MouseEvent>) => {
                    setDialogOpen(true);
                }}
            />
            <Text
                text={`${isOn ? "On" : "Off"} ${getDimmerLightLevel(
                    props.deviceData
                )} %`}
                x={props.position[0]}
                y={props.position[1] + 40}
                fill={TEXT_COLOR}
            />
            <Portal>
                <DimmerLightOptions
                    dimmerName={props.deviceData.name}
                    isDialogOpen={isDialogOpen}
                    deviceData={{ ...props.deviceData }}
                    openClose={(isOpen: boolean) => {
                        setDialogOpen(isOpen);
                        updateState({});
                    }}
                    onSave={(newDeviceData) => props.onSave(newDeviceData)}
                />
            </Portal>
        </>
    );
};
