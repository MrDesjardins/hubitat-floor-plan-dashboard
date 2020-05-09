import React from "react";
import { Text } from "react-konva";
import { TEXT_COLOR } from "../constants";
import { getLightOnOffAttribute } from "../Logics/AttributeLogics";
import { AirPurifierDevice } from "../Models/Devices";
import { CommonProps } from "./Common";
import { AirPurifierMachine } from "../PhysicalComponent/AirPurifierMachine";
// import { useInterval } from "../hooks/useInterval";
export interface AirPurifierOptions extends CommonProps {
  deviceData: AirPurifierDevice;
  openConfiguration: () => void;
}

export const AirPurifier = (props: AirPurifierOptions) => {
  const isInPower = getLightOnOffAttribute(props.deviceData);

  const x = props.deviceData.textPosition[0];
  const y = props.deviceData.textPosition[1];

  return (
    <>
      <Text
        text={`${isInPower ? "Air On" : "Air Off"}`}
        x={x}
        y={y}
        fill={TEXT_COLOR}
      />
      <AirPurifierMachine
        on={isInPower}
        xPosition={x}
        yPosition={y - 30}
        onClick={() => {
          props.openConfiguration();
        }}
      />
    </>
  );
};
