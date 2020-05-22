import React, { useState } from "react";
import { Text, Circle, Rect, Line } from "react-konva";
import { CommonProps } from "./Common";
import { WashingMachineDevice } from "../Models/devices";
import { getPowerAttribute } from "../Logics/AttributeLogics";
import { useInterval } from "../hooks/useInterval";
import { TEXT_COLOR, LINE_COLOR } from "../constants";
// import { useInterval } from "../hooks/useInterval";
export interface WashingMachineOptions extends CommonProps {
  deviceData: WashingMachineDevice;
}

export const WashingMachine = (props: WashingMachineOptions) => {
  const [angle, setAngle] = useState(0);
  const powerNumber = getPowerAttribute(props.deviceData);
  const isInPower = powerNumber > 5;

  const speed = getSpeedWashingMachineFromPower(powerNumber);
  useInterval(() => {
    if (isInPower) {
      setAngle(angle + speed);
    }
  }, 100);

  const x = props.deviceData.textPosition[0];
  const y = props.deviceData.textPosition[1];

  const length = props.deviceData.width / 2;
  const angleRadian = angle * (Math.PI / 180); // Convert to radians.
  const cosAngle = Math.cos(angleRadian); // Only need cos(angle) once.
  const sinAngle = Math.sin(angleRadian); // Only need sin(angle) once.

  const endXPos = cosAngle * length;
  const endYPos = sinAngle * length;

  return (
    <>
      <Text
        text={`${isInPower ? "On" : "Off"}`}
        x={x - props.deviceData.width / 4}
        y={y + (3 * props.deviceData.width) / 4}
        fill={TEXT_COLOR}
      />
      <Rect
        x={x - props.deviceData.width / 2}
        y={y - props.deviceData.width / 2}
        width={props.deviceData.width}
        height={props.deviceData.width}
        strokeEnabled={true}
        stroke={LINE_COLOR}
        strokeWidth={3}
      />
      <Circle
        x={x}
        y={y}
        radius={props.deviceData.width / 3}
        stroke={LINE_COLOR}
      />
      <Line
        x={x}
        y={y}
        points={[0, 0, endXPos, endYPos]}
        stroke={LINE_COLOR}
        strokeWidth={3}
      />
    </>
  );
};

const getSpeedWashingMachineFromPower = (power: number) => {
  const min = 2;
  const max = 24;
  let powerAdjusted = power > 100 ? 100 : power;
  const scale = max - min;
  return (powerAdjusted / 100) * scale;
};
