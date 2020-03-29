import React, { useState } from "react";
import { FloorPlan } from "../FloorPlan";
import { ImageLightBulb } from "../ImageLightBulb";
import Konva from "konva";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { DimmerLightOptions } from "../Components/DimmerLightOptions";
import { DimmingLightData } from "../Models/DimmingLight";
import {
    getDimmerOnOff,
    getDimmerLightLevel,
    setDimmerLightLevel,
    setDimmerOnOff
} from "../Logics/AttributeLogics";
import Portal from "../infrastructure/Portal";

export interface DimmerOptions extends CommonProps {
    deviceData: DimmingLightData;
    position: [number, number];
    onSave: (deviceData: DimmingLightData) => void;
}
export const Dimmer = (props: DimmerOptions) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [, updateState] = React.useState();
    return (
        <>
            <FloorPlan />
            <ImageLightBulb
                on={getDimmerOnOff(props.deviceData)}
                xPosition={props.position[0]}
                yPosition={props.position[1]}
                onClick={(e: Konva.KonvaEventObject<MouseEvent>) => {
                    setDialogOpen(true);
                }}
            />
            <Text
                text={`${getDimmerLightLevel(props.deviceData)} %`}
                x={props.position[0]}
                y={props.position[1] + 40}
            />
            <Portal>
                <DimmerLightOptions
                    dimmerName={props.deviceData.name}
                    isDialogOpen={isDialogOpen}
                    deviceData={{ ...props.deviceData }}
                    openClose={(
                        isOpen: boolean,
                        isLightOn?: boolean,
                        dimmingLevel?: number
                    ) => {
                        if (
                            isOpen === false &&
                            isLightOn === undefined &&
                            dimmingLevel === undefined
                        ) {
                            setDialogOpen(false);
                        } else if (
                            isLightOn !== undefined &&
                            dimmingLevel !== undefined
                        ) {
                            setDialogOpen(false);
                            const newDeviceData = { ...props.deviceData };
                            setDimmerLightLevel(newDeviceData, dimmingLevel);
                            setDimmerOnOff(newDeviceData, isLightOn);
                            props.onSave(newDeviceData);
                            updateState({});
                        }
                    }}
                />
            </Portal>
        </>
    );
};
