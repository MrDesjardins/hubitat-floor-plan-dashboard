import React, { useState } from "react";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { MotionDevice } from "../Models/Devices";
import { getMotionOnOffAttribute } from "../Logics/AttributeLogics";
import { animated, Spring } from "react-spring/renderprops-konva";
import { useInterval } from "../hooks/useInterval";
import { TEXT_COLOR, MOTION_COLOR } from "../constants";
export interface MotionOptions extends CommonProps {
  deviceData: MotionDevice;

  onSave: (deviceData: MotionDevice) => void;
}

export const Motion = (props: MotionOptions) => {
  const [pathIndex, setPathIndex] = useState(0);
  const [pulseDirection, setPulseDirection] = useState(1);
  const [radius, setRadius] = useState(10);
  useInterval(() => {
    if (pathIndex >= props.deviceData.path.length - 1) {
      setPathIndex(0);
    } else {
      setPathIndex(pathIndex + 1);
    }
  }, 2000);

  useInterval(() => {
    if (radius === 10) {
      setPulseDirection(-1);
    } else if (radius === 6) {
      setPulseDirection(+1);
    }
    setRadius(radius + pulseDirection);
  }, 120);
  const isInMotion = getMotionOnOffAttribute(props.deviceData);

  return (
    <>
      <Text
        text={`${isInMotion ? "Motion" : "No Motion"}`}
        x={props.deviceData.textPosition[0]}
        y={props.deviceData.textPosition[1]}
        fill={TEXT_COLOR}
      />
      {isInMotion ? (
        <Spring
          native={true}
          from={{
            x: props.deviceData.path[0][0],
            y: props.deviceData.path[pathIndex][1],
          }}
          to={{
            x: props.deviceData.path[pathIndex][0],
            y: props.deviceData.path[pathIndex][1],
          }}
        >
          {(props: { x: number; y: number }) => (
            <animated.Circle
              x={props.x}
              y={props.y}
              radius={radius}
              fill={MOTION_COLOR}
              strokeEnabled={false}
            />
          )}
        </Spring>
      ) : undefined}
    </>
  );
};
