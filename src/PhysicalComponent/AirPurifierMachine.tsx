import { Image } from "react-konva";
import React from "react";
import {
  LIGHT_ON_COLOR,
  LIGHT_OFF_COLOR,
  COLOR_MACHINE1,
  COLOR_MACHINE2,
  COLOR_MACHINE3,
} from "../constants";
import { useSvgImage } from "../hooks/useSvgImage";
import { SineWave } from "./SineWave";
export interface AirPurifierMachineProps {
  on: boolean;
  xPosition: number;
  yPosition: number;
  onClick: () => void;
}
export const AirPurifierMachine = (props: AirPurifierMachineProps) => {
  const [image] = useSvgImage({
    svg: `
            <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
                <path fill="${COLOR_MACHINE1}" stroke="${COLOR_MACHINE1}" d="m256 256a40 40 0 1 0 -40-40 40.045 40.045 0 0 0 40 40zm0-64a24 24 0 1 1 -24 24 24.028 24.028 0 0 1 24-24z"/>
                <path fill="${COLOR_MACHINE1}" stroke="${COLOR_MACHINE1}" d="m196.46 118.055c16.033 6.413 37.178 9.945 59.54 9.945s43.507-3.532 59.54-9.945c18.353-7.341 28.46-18.014 28.46-30.055s-10.107-22.714-28.46-30.055c-16.033-6.413-37.178-9.945-59.54-9.945s-43.507 3.532-59.54 9.945c-18.353 7.341-28.46 18.014-28.46 30.055s10.107 22.714 28.46 30.055zm59.54-54.055c43.952 0 72 14.214 72 24s-28.048 24-72 24-72-14.214-72-24 28.048-24 72-24z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m152 416h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m184 416h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m216 416h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m248 416h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m280 416h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m312 416h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m344 416h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m152 384h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m184 384h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m216 384h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m248 384h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m280 384h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m312 384h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m344 384h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m152 352h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m184 352h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m216 352h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m248 352h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m280 352h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m312 352h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m344 352h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m152 320h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m184 320h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m216 320h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m248 320h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m280 320h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m312 320h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m344 320h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m152 288h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m184 288h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m216 288h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m248 288h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m280 288h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m312 288h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m344 288h16v16h-16z"/>
                <path fill="${COLOR_MACHINE2}" stroke="${COLOR_MACHINE1}" d="m128 456a40.045 40.045 0 0 0 40 40h176a40.045 40.045 0 0 0 40-40v-8.028a39.789 39.789 0 0 0 8-23.972v-368a40.045 40.045 0 0 0 -40-40h-192a40.045 40.045 0 0 0 -40 40v368a39.789 39.789 0 0 0 8 23.972zm8-304.022a39.788 39.788 0 0 0 24 8.022h192a39.788 39.788 0 0 0 24-8.022v272.022a24.027 24.027 0 0 1 -24 24h-192a24.027 24.027 0 0 1 -24-24zm208 328.022h-176a24.04 24.04 0 0 1 -23.5-19.127 39.8 39.8 0 0 0 15.5 3.127h192a39.8 39.8 0 0 0 15.5-3.127 24.04 24.04 0 0 1 -23.5 19.127zm-208-424a24.027 24.027 0 0 1 24-24h192a24.027 24.027 0 0 1 24 24v64a24.028 24.028 0 0 1 -24 24h-192a24.028 24.028 0 0 1 -24-24z"/>
                </svg>
            `,
  });

  return (
    <>
      <Image
        image={image}
        width={30}
        height={30}
        x={props.xPosition}
        y={props.yPosition}
        onClick={props.onClick}
      />
      <SineWave x={props.xPosition} y={props.xPosition} />
    </>
  );
};
