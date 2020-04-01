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
    West,
    SlideDown,
    SlideUp
}
interface PositionAngle {
    positionX: number;
    positionY: number;

    positionXOpen: number;
    positionYOpen: number;
    angleOpen: number;
    angleClose: number;
}
export interface ContactOptions extends CommonProps {
    deviceData: ContactDevice;
    position: [number, number];
    onSave: (deviceData: ContactDevice) => void;
}
export const Contact = (props: ContactOptions) => {
    const isContactOpen = getContactOnOff(props.deviceData);

    let positionsAngles = getDoorStartPositionEndPosition(
        props.deviceData.direction,
        props.position
    );
    return (
        <>
            <Text
                text={`${isContactOpen ? "Open" : "Close"}`}
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
                    rotation: isContactOpen
                        ? positionsAngles.angleOpen
                        : positionsAngles.angleClose
                }}
            >
                {props2 => (
                    <animated.Line
                        {...props2}
                        strokeWidth={4}
                        stroke="red"
                        x={props.position[0]}
                        y={props.position[1]}
                        points={[
                            0,
                            0,
                            positionsAngles.positionXOpen,
                            positionsAngles.positionYOpen
                        ]}
                    />
                )}
            </Spring>
        </>
    );
};

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
                positionYOpen: 30,
                angleOpen: 0,
                angleClose: -45
            };
        case ContactDirection.North:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: 30,
                positionYOpen: 30,
                angleOpen: 0,
                angleClose: -45
            };
        case ContactDirection.East:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: -30,
                positionYOpen: 30,
                angleOpen: 0,
                angleClose: -45
            };
        case ContactDirection.West:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: 30,
                positionYOpen: 30,
                angleOpen: 0,
                angleClose: 45
            };
        case ContactDirection.SlideDown:
            return {
                positionX: positions[0],
                positionY: positions[1] + 30,
                positionXOpen: 0,
                positionYOpen: -50,
                angleOpen: 0,
                angleClose: 0
            };
        case ContactDirection.SlideUp:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: 30,
                positionYOpen: 30,
                angleOpen: 0,
                angleClose: 0
            };
    }
}
