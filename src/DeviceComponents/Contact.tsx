import React from "react";
import { Text, Line } from "react-konva";
import { CommonProps } from "./Common";
import { ContactDevice } from "../Models/Devices";
import { getContactOnOff } from "../Logics/AttributeLogics";
import { Spring, animated } from "react-spring/renderprops-konva";

export enum ContactDirection {
    North,
    South,
    East,
    West
}

export interface ContactOptions extends CommonProps {
    deviceData: ContactDevice;
    position: [number, number];
    onSave: (deviceData: ContactDevice) => void;
}
export const Contact = (props: ContactOptions) => {
    const isOn = getContactOnOff(props.deviceData);

    let positionsAngles = getDoorStartPositionEndPosition(
        props.deviceData.direction,
        props.position
    );
    return (
        <>
            <Text
                text={`${isOn ? "Open" : "Close"}`}
                x={positionsAngles.positionX}
                y={positionsAngles.positionY}
            />
            {/* <Line
                strokeWidth={4}
                stroke="black"
                x={startEndPosition[2]}
                y={startEndPosition[3]}
                points={[0, 40, 0, 0]}
            />
            <Line
                strokeWidth={4}
                stroke="red"
                x={startEndPosition[2]}
                y={startEndPosition[3]}
                points={[0, 0, 40, 0]}
            /> */}
            <Spring
                native={true}
                from={{ rotation: 0 }}
                to={{
                    rotation: isOn
                        ? positionsAngles.angleOpen
                        : positionsAngles.angleClose
                }}
            >
                {props2 => (
                    <animated.Line
                        {...props2}
                        strokeWidth={4}
                        stroke="black"
                        x={props.position[0]}
                        y={props.position[1]}
                        points={[
                            0,
                            0,
                            positionsAngles.positionXOpen,
                            positionsAngles.positionYClose
                        ]}
                    />
                )}
            </Spring>
        </>
    );
};

interface PositionAngle {
    positionX: number;
    positionY: number;

    positionXOpen: number;
    positionYClose: number;
    angleOpen: number;
    angleClose: number;
}
export function getDoorStartPositionEndPosition(
    direction: ContactDirection,
    positions: [number, number]
): PositionAngle {
    switch (direction) {
        case ContactDirection.South:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: 30,
                positionYClose: 30,
                angleOpen: 0,
                angleClose: 45
            };
        case ContactDirection.North:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: 30,
                positionYClose: 30,
                angleOpen: 0,
                angleClose: 45
            };
        case ContactDirection.East:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: -30,
                positionYClose: 30,
                angleOpen: 0,
                angleClose: -45
            };
        case ContactDirection.West:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: 30,
                positionYClose: 30,
                angleOpen: 0,
                angleClose: 45
            };
    }
}
const doorWidth = 40;
