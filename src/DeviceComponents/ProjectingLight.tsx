import "konva/lib/shapes/Path";
import React from "react";
import { Text } from "react-konva";
import { TEXT_COLOR } from "../constants";
import { getLightOnOffAttribute } from "../Logics/AttributeLogics";
import { ProjectingLightDevice } from "../Models/Devices";
import { CommonProps } from "./Common";
import { Image } from "react-konva";
import { useSvgImage2 } from "../hooks/useSvgImage";
export interface ProjectingLightOptions extends CommonProps {
  deviceData: ProjectingLightDevice;
  openConfiguration: () => void;
}
export const ProjectingLight = (props: ProjectingLightOptions) => {
  const starsPath =
    "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z";

  let coords = [];
  for (let i = 0; i < props.deviceData.amount; i++) {
    const x =
      (props.deviceData.box[2] - props.deviceData.box[0]) * Math.random() +
      props.deviceData.box[0];
    const y =
      (props.deviceData.box[3] - props.deviceData.box[1]) * Math.random() +
      props.deviceData.box[1];
    const size = 4 + Math.random() * 10;
    coords.push([x, y, size]);
  }

  const starsComponent = coords.map((c) => (
    <Image
      // eslint-disable-next-line react-hooks/rules-of-hooks
      image={useSvgImage2({
        svg:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path stroke="lime" d="' +
          starsPath +
          '"/></svg>',
      })}
      width={c[2]}
      height={c[2]}
      x={c[0]}
      y={c[1]}
    />
  ));
  return (
    <>
      {starsComponent}
      <Text
        text={`${getLightOnOffAttribute(props.deviceData) ? "On" : "Off"}`}
        x={props.textPosition[0]}
        y={props.textPosition[1]}
        fill={TEXT_COLOR}
      />
    </>
  );
};
