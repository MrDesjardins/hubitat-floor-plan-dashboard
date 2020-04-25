import React from "react";
import { Text } from "react-konva";
import { TEXT_COLOR } from "../constants";
import { ImageLightBulb } from "../PhysicalComponent/ImageLightBulb";
import {
  getDimmerLightLevelAttribute,
  getLightOnOffAttribute,
} from "../Logics/AttributeLogics";
import { DimmingLightDevice } from "../Models/Devices";
import { CommonProps } from "./Common";

export interface DimmerOptions extends CommonProps {
  deviceData: DimmingLightDevice;

  openConfiguration: () => void;
}
export const Dimmer = (props: DimmerOptions) => {
  const isOn = getLightOnOffAttribute(props.deviceData);
  return (
    <>
      <ImageLightBulb
        on={isOn}
        xPosition={props.textPosition[0]}
        yPosition={props.textPosition[1] - 40}
        onClick={() => {
          props.openConfiguration();
        }}
      />
      <Text
        text={`${isOn ? "On" : "Off"} ${getDimmerLightLevelAttribute(
          props.deviceData
        )} %`}
        x={props.textPosition[0]}
        y={props.textPosition[1]}
        fill={TEXT_COLOR}
      />
    </>
  );
};
