import { CommonProps } from "./Common";
import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { getPowerOnAttribute } from "../Logics/AttributeLogics";
import { TvDevice } from "../Models/Devices";
import { Text, Arc } from "react-konva";
import { TEXT_COLOR } from "../constants";
export enum TvDirection {
    North,
    South,
    East,
    West,
}

export interface TvOptions extends CommonProps {
    deviceData: TvDevice;
}

export const Tv = (props: TvOptions) => {
    const [pulseDirection, setPulseDirection] = useState(1);
    const [radius, setRadius] = useState(props.deviceData.radius[0]);

    useInterval(() => {
        if (radius <= props.deviceData.radius[0]) {
            setPulseDirection(+1);
        } else if (radius >= props.deviceData.radius[1]) {
            setPulseDirection(-1);
        }
        setRadius(radius + pulseDirection);
    }, 120);
    const isTvOn = getPowerOnAttribute(
        props.deviceData,
        props.deviceData.wattThreashold
    );
    const angle = getAngleFromDirection(props.deviceData.direction);
    return (
        <>
            <Text
                text={`${isTvOn ? "On" : "Off"}`}
                x={props.deviceData.position[0]}
                y={props.deviceData.position[1]}
                fill={TEXT_COLOR}
            />
            <Arc
                x={props.deviceData.position[0]}
                y={props.deviceData.position[1]}
                innerRadius={0}
                outerRadius={radius}
                angle={180}
                fill="rgba(250,235,100,0.4)"
                strokeEnabled={false}
                rotation={angle}
                visible={isTvOn}
            />
        </>
    );
};

const getAngleFromDirection = (direction: TvDirection): number => {
    switch (direction) {
        case TvDirection.East:
            return 270;
        case TvDirection.South:
            return 0;
        case TvDirection.West:
            return 90;
        case TvDirection.North:
            return 180;
    }
};
