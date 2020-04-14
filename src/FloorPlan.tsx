import React from "react";
import { Image } from "react-konva";
import floorPlanImg from "./images/FloorPlan6.png";
import useImage from "use-image";
import Konva from "konva";
import { WALL_COLOR } from "./constants";

const PlanImageComponent = () => {
    const [image] = useImage(floorPlanImg);

    return (
        <Image
            image={image}
            onClick={(evt: Konva.KonvaEventObject<MouseEvent>) => {
                console.log(`${evt.evt.x}, ${evt.evt.y}`);
            }}
        />
    );
};
export const FloorPlan = () => {
    return <PlanImageComponent />;
};
