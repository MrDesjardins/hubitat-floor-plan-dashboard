import React from "react";
import { Image } from "react-konva";
import Konva from "konva";
import { useSvgImage } from "./hooks/useSvgImage";
import { WALL_COLOR } from "./constants";
const PlanImageComponent = () => {
    const svgFloor =
        `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"  fill="${WALL_COLOR}" width="600" height="813" viewBox="0 0 600 813" preserveAspectRatio="xMidYMid meet">
         <g transform="translate(0.000000,813.000000) scale(0.100000,-0.100000)"> 
         <path stroke-linecap="square" d="M7 7783 c-4 -3 -7 -613 -7 -1355 0 -1341 0 -1348 20 -1348 19 0 20 7 20 115 l0 115 40 0 c33 0 40 3 40 20 0 17 -7 20 -40 20 l-40 0 0 275 0 275 325 0 325 0 0 -275 0 -275 -95 0 c-88 0 -95 -1 -95 -20 0 -20 7 -20 505 -20 498 0 505 0 505 20 0 17 -7 20 -45 20 l-45 0 0 200 0 200 -340 0 -340 0 0 315 0 315 35 0 c31 0 35 3 35 25 l0 25 -385 0 -385 0 0 660 0 660 245 0 c238 0 245 1 245 20 0 19 -7 20 -258 20 -142 0 -262 -3 -265 -7z m683 -1618 l0 -215 -325 0 -325 0 0 215 0 215 325 0 325 0 0 -215z m480 -640 l0 -175 -225 0 -225 0 0 175 0 175 225 0 225 0 0 -175z m200 0 l0 -175 -75 0 -75 0 0 175 0 175 75 0 75 0 0 -175z"/> 
         <path stroke-linecap="square" d="M900 7770 c0 -20 7 -20 313 -20 l312 0 -3 -660 -2 -660 -165 0 -165 0 0 -25 0 -25 605 0 605 0 0 25 0 25 -415 0 -415 0 0 660 0 660 230 0 c223 0 230 1 230 20 0 20 -7 20 -565 20 -558 0 -565 0 -565 -20z"/> 
         <path stroke-linecap="square" d="M2390 7770 c0 -19 7 -20 245 -20 l245 0 0 -660 0 -660 -50 0 c-47 0 -50 -2 -50 -25 l0 -25 225 0 225 0 0 25 c0 20 -5 25 -25 25 l-25 0 0 660 0 660 145 0 c138 0 145 1 145 20 0 20 -7 20 -540 20 -533 0 -540 0 -540 -20z m740 -680 l0 -660 -100 0 -100 0 0 660 0 660 100 0 100 0 0 -660z"/> 
         <path stroke-linecap="square" d="M3840 7770 c0 -19 7 -20 255 -20 l255 0 0 -660 0 -660 -370 0 -370 0 0 -25 c0 -18 5 -25 20 -25 19 0 20 -7 20 -240 l0 -240 25 0 25 0 0 240 0 240 495 0 495 0 0 570 0 570 635 0 635 0 0 -50 c0 -43 3 -50 20 -50 19 0 20 7 20 185 l0 185 -1080 0 c-1073 0 -1080 0 -1080 -20z m2120 -120 l0 -100 -650 0 -650 0 0 -560 0 -560 -130 0 -130 0 0 660 0 660 780 0 780 0 0 -100z"/> 
         <path stroke-linecap="square" d="M5130 6775 l0 -435 220 0 220 0 0 50 0 51 22 -21 c36 -33 112 -23 145 19 22 28 16 89 -12 116 -29 30 -97 34 -133 9 l-22 -15 0 71 0 71 22 -21 c32 -29 89 -27 127 6 26 21 31 33 31 69 0 36 -5 48 -31 69 -38 33 -95 35 -127 6 l-22 -21 0 82 0 82 23 -21 c33 -31 87 -29 126 4 26 21 31 33 31 69 0 36 -5 48 -31 69 -39 33 -93 35 -126 4 l-23 -21 0 71 0 72 -220 0 -220 0 0 -435z m410 0 l0 -405 -190 0 -190 0 0 405 0 405 190 0 190 0 0 -405z"/> 
         <path stroke-linecap="square" d="M5960 6296 l0 -825 -42 -3 -43 -3 0 -195 0 -195 43 -3 42 -3 0 -420 0 -419 -24 0 c-13 0 -27 -7 -30 -16 -3 -9 -6 -157 -6 -329 l0 -313 30 -7 30 -7 0 -349 0 -349 -255 0 -255 0 0 -25 0 -25 275 0 275 0 0 2155 c0 2148 0 2155 -20 2155 -20 0 -20 -7 -20 -824z m0 -1026 l0 -170 -30 0 -30 0 0 170 0 170 30 0 30 0 0 -170z m0 -1375 c0 -264 -2 -305 -15 -305 -13 0 -15 41 -15 305 0 264 2 305 15 305 13 0 15 -41 15 -305z"/> 
         <path stroke-linecap="square" d="M4107 6232 c-34 -36 -37 -97 -7 -130 l21 -22 -51 0 -50 0 0 -165 0 -165 50 0 51 0 -21 -22 c-13 -15 -20 -35 -20 -64 0 -86 92 -125 159 -68 25 21 31 33 31 67 0 28 -7 48 -22 64 l-21 23 106 0 107 0 -20 -20 c-14 -14 -20 -33 -20 -65 0 -62 32 -95 90 -95 58 0 90 33 90 95 0 32 -6 51 -20 65 l-20 20 75 0 75 0 0 165 0 165 -75 0 -75 0 20 20 c30 30 28 103 -5 135 -33 34 -92 34 -129 0 -34 -31 -37 -104 -6 -135 l20 -20 -107 0 -106 0 21 23 c15 16 22 36 22 64 0 84 -105 125 -163 65z m548 -317 l0 -125 -297 0 -298 0 0 125 0 125 298 0 297 0 0 -125z"/> 
         <path stroke-linecap="square" d="M1960 5650 l0 -300 -40 0 c-33 0 -40 -3 -40 -20 0 -17 7 -20 40 -20 l40 0 0 -380 0 -380 25 0 25 0 0 140 0 140 493 0 492 0 0 -510 0 -510 -492 0 -493 0 0 185 0 185 -25 0 -25 0 0 -185 0 -185 -960 0 -960 0 0 130 c0 123 -1 130 -20 130 -20 0 -20 -7 -20 -325 0 -318 0 -325 20 -325 19 0 20 7 20 170 l0 170 950 0 950 0 0 -120 0 -120 270 0 270 0 0 -165 0 -165 258 0 257 0 0 -1360 0 -1360 -1477 0 -1478 0 0 469 0 470 23 3 c22 3 22 4 25 208 3 229 1 250 -28 250 -20 0 -20 9 -20 585 0 579 0 585 -20 585 -20 0 -20 -5 -18 -1302 l3 -1303 1518 -3 1517 -2 0 1385 0 1385 35 0 c31 0 35 3 35 25 0 22 -4 25 -35 25 -28 0 -35 4 -35 20 0 12 -7 20 -17 20 -17 0 -18 15 -18 185 0 170 1 185 18 185 16 0 17 61 17 1145 l0 1145 -130 0 -130 0 0 -25 0 -25 108 0 107 0 0 -510 0 -510 -492 0 -493 0 0 510 0 510 195 0 195 0 0 25 0 25 -220 0 -220 0 0 -300z m500 -2005 l0 -85 -240 0 -240 0 0 85 0 85 240 0 240 0 0 -85z m510 -165 l0 -250 -225 0 -225 0 0 250 0 250 225 0 225 0 0 -250z"/> 
         <path stroke-linecap="square" d="M4360 4140 l0 -660 335 0 335 0 0 170 0 170 -160 0 -160 0 0 490 0 490 -175 0 -175 0 0 -660z m312 136 l-2 -483 46 -7 c26 -3 98 -6 160 -6 l114 0 0 -130 0 -130 -297 0 -298 0 0 620 0 620 140 0 140 0 -3 -484z"/> 
         <path stroke-linecap="square" d="M4009 3458 c0 -95 -4 -145 -9 -132 -15 38 -59 64 -107 64 -38 0 -50 -5 -79 -34 -29 -29 -34 -41 -34 -81 0 -40 5 -52 34 -81 29 -29 41 -34 79 -34 48 0 92 26 107 64 5 13 9 -37 9 -131 l1 -153 165 0 165 0 0 335 0 335 -165 0 -165 0 -1 -152z m291 -183 l0 -295 -125 0 -125 0 0 295 0 295 125 0 125 0 0 -295z m-355 50 c14 -13 25 -36 25 -50 0 -14 -11 -37 -25 -50 -13 -14 -36 -25 -50 -25 -14 0 -37 11 -50 25 -14 13 -25 36 -25 50 0 14 11 37 25 50 13 14 36 25 50 25 14 0 37 -11 50 -25z"/> 
         <path stroke-linecap="square" d="M3480 3225 c0 -24 2 -25 75 -25 l75 0 0 -195 0 -195 200 0 200 0 0 25 0 25 -175 0 -175 0 0 195 0 195 -100 0 -100 0 0 -25z"/> 
         <path stroke-linecap="square" d="M2740 2915 l0 -255 110 0 110 0 0 255 0 255 -110 0 -110 0 0 -255z m180 0 l0 -215 -70 0 -70 0 0 215 0 215 70 0 70 0 0 -215z"/> 
         <path stroke-linecap="square" d="M2130 3085 l0 -75 300 0 300 0 0 75 0 75 -300 0 -300 0 0 -75z m560 0 l0 -35 -260 0 -260 0 0 35 0 35 260 0 260 0 0 -35z"/> 
         <path stroke-linecap="square" d="M70 2845 l0 -135 435 0 435 0 0 135 0 135 -435 0 -435 0 0 -135z m830 0 l0 -95 -395 0 -395 0 0 95 0 95 395 0 395 0 0 -95z"/> 
         <path stroke-linecap="square" d="M970 2530 l0 -430 140 0 140 0 0 430 0 430 -140 0 -140 0 0 -430z m240 0 l0 -390 -100 0 -100 0 0 390 0 390 100 0 100 0 0 -390z"/> 
         <path stroke-linecap="square" d="M4400 2835 l0 -25 335 0 335 0 0 25 0 25 -335 0 -335 0 0 -25z"/> 
         <path stroke-linecap="square" d="M70 2540 l0 -140 435 0 435 0 0 140 0 140 -435 0 -435 0 0 -140z m830 0 l0 -100 -395 0 -395 0 0 100 0 100 395 0 395 0 0 -100z"/> 
         <path stroke-linecap="square" d="M970 1015 l0 -435 140 0 140 0 0 435 0 435 -140 0 -140 0 0 -435z m240 0 l0 -395 -100 0 -100 0 0 395 0 395 100 0 100 0 0 -395z"/> 
         </g> 
         </svg>`;

    const [image] = useSvgImage({
        svg: svgFloor,
    });

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
