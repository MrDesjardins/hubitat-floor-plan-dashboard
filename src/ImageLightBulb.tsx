import useImage from "use-image";
import lightOff from "./images/iconmonstr-light-bulb-12.svg";
import lightOn from "./images/iconmonstr-light-bulb-18.svg";
import { Image } from "react-konva";
import React from "react";
import Konva from "konva";
import { LIGHT_ON, LIGHT_OFF } from "./constants";
export interface ImageLightBulbProps {
    on: boolean;
    xPosition: number;
    yPosition: number;
    onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
}
export const ImageLightBulb = (props: ImageLightBulbProps) => {
    const [image] = useImage(props.on ? lightOn : lightOff);
    return (
        <Image
            image={image}
            width={30}
            height={30}
            x={props.xPosition}
            y={props.yPosition}
            onClick={props.onClick}
            fill={props.on ? LIGHT_ON : LIGHT_OFF}
        />
    );
};
