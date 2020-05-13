import React from "react";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { TemperatureDevice } from "../Models/Devices";
import { TEXT_COLOR } from "../constants";
import {
  getTemperatureAtribute,
  getHumidityAtribute,
} from "../Logics/AttributeLogics";
export interface TemperatureOptions extends CommonProps {
  deviceData: TemperatureDevice;
}

export const Temperature = (props: TemperatureOptions) => {
  const temperature = getTemperatureAtribute(props.deviceData);
  const humidity = getHumidityAtribute(props.deviceData);

  return (
    <>
      <Text
        text={`${temperature.toFixed(1)}°F`}
        x={props.deviceData.textPosition[0]}
        y={props.deviceData.textPosition[1]}
        fill={TEXT_COLOR}
      />
      {isNaN(humidity) ? null : (
        <Text
          text={`${humidity.toFixed(1)}%`}
          x={props.deviceData.textPosition[0]}
          y={props.deviceData.textPosition[1] + 15}
          fill={TEXT_COLOR}
        />
      )}
    </>
  );
};
