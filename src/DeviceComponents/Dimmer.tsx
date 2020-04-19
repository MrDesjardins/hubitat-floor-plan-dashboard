import React, { useState } from "react";
import { ImageLightBulb } from "../ImageLightBulb";
import Konva from "konva";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { DimmerLightOptions } from "../Components/DimmerLightOptions";
import { DimmingLightDevice } from "../Models/Devices";
import Portal from "../infrastructure/Portal";
import {
    getLightOnOffAttribute,
    getDimmerLightLevelAttribute,
} from "../Logics/AttributeLogics";
import { TEXT_COLOR } from "../constants";

export interface DimmerOptions extends CommonProps {
    deviceData: DimmingLightDevice;
    position: [number, number];
    openConfiguration: () => void;
}
export const Dimmer = (props: DimmerOptions) => {
    const isOn = getLightOnOffAttribute(props.deviceData);
    return (
        <>
            <ImageLightBulb
                on={isOn}
                xPosition={props.position[0]}
                yPosition={props.position[1]}
                onClick={() => {
                    props.openConfiguration();
                }}
            />
            <Text
                text={`${isOn ? "On" : "Off"} ${getDimmerLightLevelAttribute(
                    props.deviceData
                )} %`}
                x={props.position[0]}
                y={props.position[1] + 40}
                fill={TEXT_COLOR}
            />
        </>
    );
};
