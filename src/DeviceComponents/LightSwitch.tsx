import { useState } from "react";
import { ImageLightBulb } from "../ImageLightBulb";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { LightSwitchDevice } from "../Models/Devices";
import {
    getLightOnOffAttribute,
    setLightOnOffAttribute,
} from "../Logics/AttributeLogics";
import Portal from "../infrastructure/Portal";
import React from "react";
import { LightSwitchOptions } from "../Components/LightSwitchOptions";
import { TEXT_COLOR } from "../constants";
import "konva/lib/shapes/Path";
export interface LightSwitchOptions extends CommonProps {
    deviceData: LightSwitchDevice;
    position: [number, number];
    openConfiguration: () => void;
}
export const LightSwitch = (props: LightSwitchOptions) => {
    return (
        <>
            <ImageLightBulb
                on={getLightOnOffAttribute(props.deviceData)}
                xPosition={props.position[0]}
                yPosition={props.position[1]}
                onClick={() => {
                    props.openConfiguration();
                }}
            />
            <Text
                text={`${
                    getLightOnOffAttribute(props.deviceData) ? "On" : "Off"
                }`}
                x={props.position[0]}
                y={props.position[1] + 40}
                fill={TEXT_COLOR}
            />
        </>
    );
};
