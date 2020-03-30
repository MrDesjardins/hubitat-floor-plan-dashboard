import React from "react";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { ContactDevice } from "../Models/DeviceData";
import { getContactOnOff } from "../Logics/AttributeLogics";
import { Spring, animated } from "react-spring/renderprops-konva";
export interface ContactOptions extends CommonProps {
    deviceData: ContactDevice;
    position: [number, number];
    onSave: (deviceData: ContactDevice) => void;
}
export const Contact = (props: ContactOptions) => {
    const isOn = getContactOnOff(props.deviceData);
    let startingCoord = isOn ? [0, 0, 40, 0] : [0, 0, 30, 30];
    let finalCoord = isOn ? [0, 0, 30, 30] : [0, 0, 40, 0];
    return (
        <>
            <Text
                text={`${isOn ? "Open" : "Close"}`}
                x={props.position[0]}
                y={props.position[1] - 20}
            />
            <Spring
                native={true}
                from={{ points: startingCoord }}
                to={{
                    points: finalCoord
                }}
            >
                {props2 => (
                    <animated.Line
                        {...props2}
                        strokeWidth={4}
                        stroke="black"
                        x={props.position[0]}
                        y={props.position[1]}
                    />
                )}
            </Spring>
        </>
    );
};
