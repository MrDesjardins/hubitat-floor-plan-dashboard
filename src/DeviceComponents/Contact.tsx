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

function getComponentDoor(
    direction: ContactDirection,
    isContactOpen: boolean,
    positionsAngles: PositionAngle
): JSX.Element | undefined {
    if (
        direction === ContactDirection.East ||
        direction === ContactDirection.West ||
        direction === ContactDirection.North ||
        direction === ContactDirection.South
    ) {
        return (
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
        );
    } else if (direction === ContactDirection.SlideLeft) {
        return (
            <Spring
                native={true}
                from={{ x: positionsAngles.positionX }}
                to={{
                    x: isContactOpen
                        ? positionsAngles.positionX + 40
                        : positionsAngles.positionX 
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
        );
    } else if (direction === ContactDirection.SlideRight) {
        return (
            <Spring
                native={true}
                from={{ x: positionsAngles.positionX }}
                to={{
                    x: isContactOpen
                        ? positionsAngles.positionX - 40
                        : positionsAngles.positionX 
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
        );
    } else if (direction === ContactDirection.SlideDown) {
        return (
            <Spring
                native={true}
                from={{ y: positionsAngles.positionY }}
                to={{
                    y: isContactOpen
                        ? positionsAngles.positionY + 40
                        : positionsAngles.positionY 
                }}
            >
                {props2 => (
                    <animated.Line
                        {...props2}
                        strokeWidth={4}
                        stroke="red"
                        x={positionsAngles.positionX}
                        points={[
                            0,
                            0,
                            positionsAngles.positionXOpen,
                            positionsAngles.positionYOpen
                        ]}
                    />
                )}
            </Spring>
        );
    } else if (direction === ContactDirection.SlideUp) {
        return (
            <Spring
                native={true}
                from={{ y: positionsAngles.positionY }}
                to={{
                    y: isContactOpen
                        ? positionsAngles.positionY - 40
                        : positionsAngles.positionY 
                }}
            >
                {props2 => (
                    <animated.Line
                        {...props2}
                        strokeWidth={4}
                        stroke="red"
                        x={positionsAngles.positionX}
                        points={[
                            0,
                            0,
                            positionsAngles.positionXOpen,
                            positionsAngles.positionYOpen
                        ]}
                    />
                )}
            </Spring>
        );
    }
    return undefined;
}
export const Contact = (props: ContactOptions) => {
    const isContactOpen = getContactOnOff(props.deviceData);

    let positionsAngles = getDoorStartPositionEndPosition(
        props.deviceData.direction,
        props.position
    );

    let contactComponentDoor = getComponentDoor(
        props.deviceData.direction,
        isContactOpen,
        positionsAngles
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
                stroke="red"
                x={positionsAngles.positionX}
                y={positionsAngles.positionY}
                points={[0, 0, 40, 0]}
            /> */}
            {getComponentDoor(
                props.deviceData.direction,
                isContactOpen,
                positionsAngles
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
                positionY: positions[1],
                positionXOpen: 0,
                positionYOpen: 40,
                angleOpen: 0,
                angleClose: 0
            };
        case ContactDirection.SlideUp:
            return {
                positionX: positions[0],
                positionY: positions[1],
                positionXOpen: 0,
                positionYOpen: 40,
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
