import React from "react";
import { Text } from "react-konva";
import { CommonProps } from "./Common";
import { ThermostatDevice } from "../Models/devices";
import { TEXT_COLOR, COLOR_MACHINE1 } from "../constants";
import {
  getTemperatureAtribute,
  getThermostatMode,
} from "../Logics/AttributeLogics";
import { useSvgImage } from "../hooks/useSvgImage";
import { Image } from "react-konva";
export interface ThermostatOptions extends CommonProps {
  deviceData: ThermostatDevice;
}

export const Thermostat = (props: ThermostatOptions) => {
  const temperature = getTemperatureAtribute(props.deviceData);
  const mode = getThermostatMode(props.deviceData);
  const [image] = useSvgImage({
    svg:
      mode === "cool"
        ? `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
    <path d="M20.79 13.95l-2.33.62l-2-1.13v-2.88l2-1.13l2.33.62l.52-1.93l-1.77-.47l.46-1.77l-1.93-.52l-.62 2.33l-2 1.13L13 7.38V5.12l1.71-1.71L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12v2.26L8.5 8.82l-2-1.13l-.58-2.33L4 5.88l.47 1.77l-1.77.47l.52 1.93l2.33-.62l2 1.13v2.89l-2 1.13l-2.33-.62l-.52 1.93l1.77.47L4 18.12l1.93.52l.62-2.33l2-1.13L11 16.62v2.26l-1.71 1.71L10.71 22L12 20.71L13.29 22l1.41-1.41l-1.7-1.71v-2.26l2.5-1.45l2 1.13l.62 2.33l1.88-.51l-.47-1.77l1.77-.47l-.51-1.93M9.5 10.56L12 9.11l2.5 1.45v2.88L12 14.89l-2.5-1.45v-2.88z" 
    fill="${COLOR_MACHINE1}"/>
    </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0-7l2.39 3.42C13.65 5.15 12.84 5 12 5c-.84 0-1.65.15-2.39.42L12 2M3.34 7l4.16-.35A7.2 7.2 0 0 0 5.94 8.5c-.44.74-.69 1.5-.83 2.29L3.34 7m.02 10l1.76-3.77a7.131 7.131 0 0 0 2.38 4.14L3.36 17M20.65 7l-1.77 3.79a7.023 7.023 0 0 0-2.38-4.15l4.15.36m-.01 10l-4.14.36c.59-.51 1.12-1.14 1.54-1.86c.42-.73.69-1.5.83-2.29L20.64 17M12 22l-2.41-3.44c.74.27 1.55.44 2.41.44c.82 0 1.63-.17 2.37-.44L12 22z" 
    fill="${COLOR_MACHINE1}"/></svg>`,
  });
  return (
    <>
      <Image
        image={image}
        width={20}
        height={20}
        x={props.deviceData.textPosition[0] - 22}
        y={props.deviceData.textPosition[1] - 6}
      />
      <Text
        text={`${temperature.toFixed(1)}°F`}
        x={props.deviceData.textPosition[0]}
        y={props.deviceData.textPosition[1]}
        fill={TEXT_COLOR}
      />
    </>
  );
};
