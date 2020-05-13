import "konva/lib/shapes/Path";
import React, { useState, useEffect, useRef } from "react";
import { Text } from "react-konva";
import { TEXT_COLOR } from "../constants";
import { getLightOnOffAttribute } from "../Logics/AttributeLogics";
import { ProjectingLightDevice } from "../Models/Devices";
import { CommonProps } from "./Common";
import { Image } from "react-konva";
import { useSvgImage2 } from "../hooks/useSvgImage";
import Konva from "konva";
import { IFrame } from "konva/types/types";
export interface ProjectingLightOptions extends CommonProps {
  deviceData: ProjectingLightDevice;
  openConfiguration: () => void;
}
let i = 0;
export const ProjectingLight = (props: ProjectingLightOptions) => {
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
  const isOn = getLightOnOffAttribute(props.deviceData);
  const starsComponent = isOn
    ? coords.map((c) => {
        return (
          <AnimatedLight
            key={i++}
            width={c[2]}
            height={c[2]}
            x={c[0]}
            y={c[1]}
          />
        );
      })
    : undefined;
  return (
    <>
      {starsComponent}
      <Text
        text={`${isOn ? "On" : "Stars Off"}`}
        x={props.textPosition[0]}
        y={props.textPosition[1]}
        fill={TEXT_COLOR}
        onClick={() => {
          console.log("Turn on or off");
        }}
      />
    </>
  );
};

export interface AnimatedLightOptions {
  width: number;
  height: number;
  x: number;
  y: number;
}
export const AnimatedLight = (props: AnimatedLightOptions) => {
  const starsPath =
    "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z";

  const [ref, setRef] = useState<Konva.Image | null>(null);
  const animation = useRef<Konva.Animation>();
  const opacity = useRef<number>(1);
  const speedFading = useRef<number>(Math.random() * 500 + 500);

  useEffect(() => {
    if (ref) {
      if (animation.current === undefined) {
        animation.current = new Konva.Animation((frame: IFrame | undefined) => {
          if (frame) {
            if (
              Math.floor(frame.time) % speedFading.current >
              speedFading.current * 0.9
            ) {
              opacity.current = opacity.current - 0.1;
              if (opacity.current <= 0) {
                opacity.current = 1;
              }
              ref.to({ opacity: opacity.current });
            }
          }
        });
        animation.current.start();
      }
    }

    return () => {
      if (animation.current) {
        animation.current.stop();
      }
    };
  }, [ref]);

  return (
    <Image
      ref={(x) => {
        setRef(x);
      }}
      image={useSvgImage2({
        svg:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" pointer-events="bounding-box"><path stroke="#c26b00" fill="#ffe47a" d="' +
          starsPath +
          '"/></svg>',
      })}
      width={props.width}
      height={props.height}
      x={props.x}
      y={props.y}
    />
  );
};
