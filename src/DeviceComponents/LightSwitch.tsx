import "konva/lib/shapes/Path";
import React from "react";
import { Text } from "react-konva";
import { TEXT_COLOR } from "../constants";
import { ImageLightBulb } from "../PhysicalComponent/ImageLightBulb";
import { getLightOnOffAttribute } from "../Logics/AttributeLogics";
import { LightSwitchDevice } from "../Models/Devices";
import { CommonProps } from "./Common";
export interface LightSwitchOptions extends CommonProps {
  deviceData: LightSwitchDevice;
  openConfiguration: () => void;
}
export const LightSwitch = (props: LightSwitchOptions) => {
  return (
    <>
      <ImageLightBulb
        on={getLightOnOffAttribute(props.deviceData)}
        xPosition={props.textPosition[0]}
        yPosition={props.textPosition[1] - 40}
        onClick={() => {
          props.openConfiguration();
        }}
      />
      <Text
        text={`${getLightOnOffAttribute(props.deviceData) ? "On" : "Off"}`}
        x={props.textPosition[0]}
        y={props.textPosition[1]}
        fill={TEXT_COLOR}
      />
    </>
  );
};
