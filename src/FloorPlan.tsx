import React from "react";
import { Image } from "react-konva";
import floorPlanImg from "./images/FloorPlan2.jpg";
import useImage from "use-image";
import Konva from "konva";

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
