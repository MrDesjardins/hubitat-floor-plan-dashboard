import "konva/lib/shapes/Path";
import React from "react";
import { Text } from "react-konva";
import { TEXT_COLOR, LINE_COLOR } from "../constants";
import { getDeadboltLockStatus } from "../Logics/attributeLogics";
import { DeadboltDevice } from "../Models/devices";
import { CommonProps } from "./Common";
import { useSvgImage } from "../hooks/useSvgImage";
import { Image } from "react-konva";
export interface LightSwitchOptions extends CommonProps {
  deviceData: DeadboltDevice;
  openConfiguration: () => void;
}
export const Deadbolt = (props: LightSwitchOptions) => {
  const isLock = getDeadboltLockStatus(props.deviceData);
  const lockImage = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" pointer-events="bounding-box">
    <path fill="none" stroke="${LINE_COLOR}" stroke-miterlimit="10" stroke-width="2" d="M63 84H37c-8.284 0-15-6.716-15-15V48c0-2.761 2.239-5 5-5h46c2.761 0 5 2.239 5 5v21C78 77.284 71.284 84 63 84zM71 42.5v-6.997c0-11.387-8.854-21.085-20.234-21.49C38.819 13.589 29 23.148 29 35v7"/>
    <path fill="none" stroke="${LINE_COLOR}" stroke-miterlimit="10" stroke-width="2" d="M36,42v-6.605c0-7.538,5.793-14.025,13.323-14.379C57.363,20.637,64,27.044,64,35v7.5"/>
    <path fill="none" stroke="${LINE_COLOR}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M65.5 51.5L78 51.5M57.5 51.5L62.5 51.5M22 51.5L54.5 51.5"/>
    <path fill="none" stroke="${LINE_COLOR}" stroke-miterlimit="10" d="M22 60.5L78 60.5"/>
    <path fill="none" stroke="${LINE_COLOR}" stroke-linejoin="round" stroke-miterlimit="10" d="M53.5,77.5l-1.896-7.583C52.152,69.459,52.5,68.77,52.5,68c0-1.381-1.119-2.5-2.5-2.5s-2.5,1.119-2.5,2.5c0,0.77,0.348,1.459,0.896,1.917L46.5,77.5H53.5z"/>
    <path fill="none" stroke="${LINE_COLOR}" stroke-miterlimit="10" d="M29.028 51.319L22.454 60.689M37.028 51.319L30.454 60.689M45.028 51.319L38.454 60.689M53.028 51.319L46.454 60.689M61.028 51.319L54.454 60.689M69.028 51.319L62.454 60.689M77.028 51.319L70.454 60.689"/>
  '</svg>`;
  const unlockImage = `
  <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <path fill="none" stroke="${LINE_COLOR}" stroke-miterlimit="10" stroke-width="2" d="M69 84H43c-8.284 0-15-6.716-15-15V48c0-2.761 2.239-5 5-5h46c2.761 0 5 2.239 5 5v21C84 77.284 77.284 84 69 84zM46 42.5v-6.997c0-11.387-8.854-21.085-20.234-21.49C13.819 13.589 4 23.148 4 35v.5C4 37.433 5.567 39 7.5 39s3.5-1.567 3.5-3.5v-.105c0-7.538 5.793-14.025 13.323-14.379C32.363 20.637 39 27.044 39 35v7.5"/>
    <path fill="none" stroke="${LINE_COLOR}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M71.5 51.5L84 51.5M63.5 51.5L68.5 51.5M28 51.5L60.5 51.5"/>
    <path fill="none" stroke="${LINE_COLOR}" stroke-miterlimit="10" d="M28 60.5L84 60.5"/>
    <path fill="none" stroke="${LINE_COLOR}" stroke-linejoin="round" stroke-miterlimit="10" d="M59.5,77.5l-1.896-7.583C58.152,69.459,58.5,68.77,58.5,68c0-1.381-1.119-2.5-2.5-2.5s-2.5,1.119-2.5,2.5c0,0.77,0.348,1.459,0.896,1.917L52.5,77.5H59.5z"/>
    <path fill="none" stroke="${LINE_COLOR}" stroke-miterlimit="10" d="M35.028 51.319L28.454 60.689M43.028 51.319L36.454 60.689M51.028 51.319L44.454 60.689M59.028 51.319L52.454 60.689M67.028 51.319L60.454 60.689M75.028 51.319L68.454 60.689M83.028 51.319L76.454 60.689"/>
  </svg>
  `;

  const [imageLock] = useSvgImage({
    svg: lockImage,
  });

  const [imageUnLock] = useSvgImage({
    svg: unlockImage,
  });
  return (
    <>
      <Image
        image={isLock ? imageLock : imageUnLock}
        width={150}
        height={150}
        x={props.textPosition[0] - 2}
        y={props.textPosition[1] - 30}
      />
      <Text
        text={`${isLock ? "Lock" : "Unlock"}`}
        x={props.textPosition[0]}
        y={props.textPosition[1]}
        fill={TEXT_COLOR}
      />
    </>
  );
};
