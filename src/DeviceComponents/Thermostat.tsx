import React from "react";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { ThermostatDevice } from "../Models/Devices";
import { TEXT_COLOR } from "../constants";
import { getTemperatureAtribute } from "../Logics/AttributeLogics";
export interface ThermostatOptions extends CommonProps {
  deviceData: ThermostatDevice;

}

export const Thermostat = (props: ThermostatOptions) => {
  const temperature = getTemperatureAtribute(props.deviceData);
  return (
    <>
      <Text
        text={`${temperature.toFixed(1)}°F`}
        x={props.deviceData.textPosition[0]}
        y={props.deviceData.textPosition[1]}
        fill={TEXT_COLOR}
      />
    </>
  );
};
