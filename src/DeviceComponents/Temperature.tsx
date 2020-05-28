import React, { useState } from "react";
import { Text, Circle } from "react-konva";
import { CommonProps } from "./Common";
import { TemperatureDevice } from "../Models/devices";
import { TEXT_COLOR, TEXT_SIZE } from "../constants";
import {
  getTemperatureAtribute,
  getHumidityAtribute,
} from "../Logics/attributeLogics";
import { useInterval } from "../hooks/useInterval";
export interface TemperatureOptions extends CommonProps {
  deviceData: TemperatureDevice;
}
const radiusTick = 0.5;
export const Temperature = (props: TemperatureOptions) => {
  const maxRadius = 70;
  const minRadius = 55;
  const temperature = getTemperatureAtribute(props.deviceData);
  const humidity = getHumidityAtribute(props.deviceData);
  const [x, y] = props.deviceData.textPosition;
  const color1 = getColorFromTemperature(temperature);
  const color2 = getColorFromTemperature(temperature - 3, 0.15);
  const [pulseDirection, setPulseDirection] = useState(radiusTick);
  const [radius, setRadius] = useState(
    minRadius + Math.random() * (maxRadius - minRadius)
  );

  useInterval(() => {
    if (radius <= minRadius) {
      setPulseDirection(radiusTick);
    } else if (radius >= maxRadius) {
      setPulseDirection(-1 * radiusTick);
    }
    setRadius(radius + pulseDirection);
  }, 100 + Math.random() * 200);

  return (
    <>
      <Circle
        x={x + 15}
        y={y + 15}
        radius={radius}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={radius * 0.9}
        fillRadialGradientColorStops={[0, color1, 1, color2]}
      />
      <Text
        text={`${temperature.toFixed(1)}°F`}
        x={x}
        y={y}
        fill={TEXT_COLOR}
        fontSize={TEXT_SIZE}
      />
      {isNaN(humidity) ? null : (
        <Text
          text={`${humidity.toFixed(1)}%`}
          x={x}
          y={y + 15}
          fill={TEXT_COLOR}
          fontSize={TEXT_SIZE}
        />
      )}
    </>
  );
};

function getColorFromTemperature(
  fahrenheit: number,
  alpha: number = 0.8
): string {
  const colors: string[] = [
    `rgba(255, 10, 15, ${alpha})`,
    `rgba(250, 20, 25, ${alpha})`,
    `rgba(245, 40, 30, ${alpha})`,
    `rgba(240, 60, 35, ${alpha})`,
    `rgba(235, 80, 40, ${alpha})`,
    `rgba(225, 100, 45, ${alpha})`,
    `rgba(215, 120, 50, ${alpha})`,
    `rgba(200, 120, 70, ${alpha})`,
    `rgba(180, 120, 100, ${alpha})`,
    `rgba(160, 120, 130, ${alpha})`,
    `rgba(130, 120, 160, ${alpha})`,
    `rgba(100, 120, 180, ${alpha})`,
    `rgba(70, 120, 200, ${alpha})`,
    `rgba(50, 120, 215, ${alpha})`,
    `rgba(45, 100, 225, ${alpha})`,
    `rgba(40, 80, 235, ${alpha})`,
    `rgba(35, 60, 240, ${alpha})`,
    `rgba(30, 40, 245, ${alpha})`,
    `rgba(25, 20, 250, ${alpha})`,
    `rgba(20, 10, 255, ${alpha})`,
  ];

  const max = 80;
  // const min = 60;
  const index = Math.round(max - fahrenheit);
  if (index < 0) {
    return `rgba(238, 27, 27, ${alpha})`;
  }
  if (index > colors.length) {
    return `rgba(138, 15, 138, ${alpha})`;
  }
  return colors[index];
  // const diff = fahrenheit-65;
  // let colorRed: number;
  // let colorBlue: number;
  // if (fahrenheit > 80) {
  //   colorRed = 240;
  // }
  // else if (fahrenheit > 65) {
  //   colorRed = log(fahrenheit - 65);
  // }
  // else {
  //   colorRed = 15;
  // }

  // if (fahrenheit < 65) {
  //   colorBlue = 240;
  // } else if (fahrenheit < 80) {
  //   colorBlue = log(fahrenheit - 65);
  // }
  // else {
  //   colorBlue = 15;
  // }

  // const color = `rgba(${colorRed}, 100, ${colorBlue}, ${alpha})`;
  // console.log(fahrenheit-65, color);
  // return color;
}

// function log(x: number) {
//   return Math.log(x + 1) / Math.log(1.01);
// }
