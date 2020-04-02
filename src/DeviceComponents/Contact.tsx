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
    SlideUp,
    SlideRight,
    SlideLeft
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
    const isContactOpen = !getContactOnOff(props.deviceData);

    let positionsAngles = getDoorStartPositionEndPosition(
        props.deviceData.direction,
        props.position
    );
    console.log(props.deviceData.direction + " " + isContactOpen);
    return (
        <>
            <Text
                text={`${isContactOpen ? "Open" : "Close"}`}
                x={positionsAngles.positionX}
                y={positionsAngles.positionY}
            />

            {/* <Line
                strokeWidth={4}
                stroke="red"
                x={positionsAngles.positionX}
                y={positionsAngles.positionY}
                points={[0, 0, 40, 0]}
            /> */}
            {props.deviceData.direction <= 3 ? (
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
                            x={positionsAngles.positionX}
                            y={positionsAngles.positionY}
                            points={[
                                0,
                                0,
                                positionsAngles.positionXOpen,
                                positionsAngles.positionYOpen
                            ]}
                        />
                    )}
                </Spring>
            ) : (
                <Spring
                    native={true}
                    from={{ x: positionsAngles.positionX }}
                    to={{
                        x:
                            props.deviceData.direction ===
                            ContactDirection.SlideLeft
                                ? positionsAngles.positionX - 40
                                : positionsAngles.positionX + 40
                    }}
                >
                    {props2 => (
                        <animated.Line
                            {...props2}
                            strokeWidth={4}
                            stroke="red"
                            y={positionsAngles.positionY}
                            points={[
                                0,
                                0,
                                positionsAngles.positionXOpen,
                                positionsAngles.positionYOpen
                            ]}
                        />
                    )}
                </Spring>
            )}
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
        case ContactDirection.SlideLeft:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: 40,
                positionYOpen: 0,
                angleOpen: 0,
                angleClose: 0
            };
        case ContactDirection.SlideRight:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: 40,
                positionYOpen: 0,
                angleOpen: 0,
                angleClose: 0
            };
    }
}
