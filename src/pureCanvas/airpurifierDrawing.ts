import { getAirPurifierText } from "commons/textbuilder";
import {
  COLOR_MACHINE1,
  COLOR_MACHINE2,
  TEXT_COLOR,
  TEXT_SIZE,
  COLOR_MACHINE3,
} from "../constants";
import { getLightOnOffAttribute } from "logics/attributeLogics";
import { AirPurifierDevice } from "models/devices";
import { drawPath2D, clearRectangle } from "./commonDrawing";
import { delayedDeviceAnimation } from "commons/animation";
import { DictionaryOf } from "commons/dictionaryOf";

interface SiveWaveProps {
  x: number;
  y: number;
}
interface DataT {
  type: string;
  values: number[];
}

const machine = [
  new Path2D(
    "m256 256a40 40 0 1 0 -40-40 40.045 40.045 0 0 0 40 40zm0-64a24 24 0 1 1 -24 24 24.028 24.028 0 0 1 24-24z"
  ),
  new Path2D(
    "m196.46 118.055c16.033 6.413 37.178 9.945 59.54 9.945s43.507-3.532 59.54-9.945c18.353-7.341 28.46-18.014 28.46-30.055s-10.107-22.714-28.46-30.055c-16.033-6.413-37.178-9.945-59.54-9.945s-43.507 3.532-59.54 9.945c-18.353 7.341-28.46 18.014-28.46 30.055s10.107 22.714 28.46 30.055zm59.54-54.055c43.952 0 72 14.214 72 24s-28.048 24-72 24-72-14.214-72-24 28.048-24 72-24z"
  ),
  new Path2D("m152 416h16v16h-16z"),
  new Path2D("m184 416h16v16h-16z"),
  new Path2D("m216 416h16v16h-16z"),
  new Path2D("m248 416h16v16h-16z"),
  new Path2D("m280 416h16v16h-16z"),
  new Path2D("m312 416h16v16h-16z"),
  new Path2D("m344 416h16v16h-16z"),
  new Path2D("m152 384h16v16h-16z"),
  new Path2D("m184 384h16v16h-16z"),
  new Path2D("m216 384h16v16h-16z"),
  new Path2D("m248 384h16v16h-16z"),
  new Path2D("m280 384h16v16h-16z"),
  new Path2D("m312 384h16v16h-16z"),
  new Path2D("m344 384h16v16h-16z"),
  new Path2D("m152 352h16v16h-16z"),
  new Path2D("m184 352h16v16h-16z"),
  new Path2D("m216 352h16v16h-16z"),
  new Path2D("m248 352h16v16h-16z"),
  new Path2D("m280 352h16v16h-16z"),
  new Path2D("m312 352h16v16h-16z"),
  new Path2D("m344 352h16v16h-16z"),
  new Path2D("m152 320h16v16h-16z"),
  new Path2D("m184 320h16v16h-16z"),
  new Path2D("m216 320h16v16h-16z"),
  new Path2D("m248 320h16v16h-16z"),
  new Path2D("m280 320h16v16h-16z"),
  new Path2D("m312 320h16v16h-16z"),
  new Path2D("m344 320h16v16h-16z"),
  new Path2D("m152 288h16v16h-16z"),
  new Path2D("m184 288h16v16h-16z"),
  new Path2D("m216 288h16v16h-16z"),
  new Path2D("m248 288h16v16h-16z"),
  new Path2D("m280 288h16v16h-16z"),
  new Path2D("m312 288h16v16h-16z"),
  new Path2D("m344 288h16v16h-16z"),
  new Path2D(
    "m128 456a40.045 40.045 0 0 0 40 40h176a40.045 40.045 0 0 0 40-40v-8.028a39.789 39.789 0 0 0 8-23.972v-368a40.045 40.045 0 0 0 -40-40h-192a40.045 40.045 0 0 0 -40 40v368a39.789 39.789 0 0 0 8 23.972zm8-304.022a39.788 39.788 0 0 0 24 8.022h192a39.788 39.788 0 0 0 24-8.022v272.022a24.027 24.027 0 0 1 -24 24h-192a24.027 24.027 0 0 1 -24-24zm208 328.022h-176a24.04 24.04 0 0 1 -23.5-19.127 39.8 39.8 0 0 0 15.5 3.127h192a39.8 39.8 0 0 0 15.5-3.127 24.04 24.04 0 0 1 -23.5 19.127zm-208-424a24.027 24.027 0 0 1 24-24h192a24.027 24.027 0 0 1 24 24v64a24.028 24.028 0 0 1 -24 24h-192a24.028 24.028 0 0 1 -24-24z"
  ),
];
const amplitude = 1.05;
const frequency = 0.35;
const movement: DictionaryOf<number> = {};
const lastValue: DictionaryOf<boolean | undefined> = {};
const pathFunction = (x: number, offset: number) => {
  const result =
    // Function to determine curve
    // 0.2*(Math.sin(Math.sqrt(x)-$scope.offset))*x;
    Math.sin(Math.sqrt(x * frequency) - offset) * x * (0.1 * amplitude);

  return result;
};

const paths: string[] = [];

for (let i = 0; i <= 300; i++) {
  let data: DataT[] = [
    {
      type: "M",
      values: [0, 150],
    },
  ];
  let x = 0;
  while (x < 300) {
    let point = {
      x: x,
      y: 150 - pathFunction(x, i),
    };
    data.push({
      type: "L",
      values: [point.x, point.y],
    });
    x += 1;
  }

  paths.push(data.map((d) => d.type + " " + d.values.join(" ")).join(" "));
}

export function drawAirPurifier(
  ctx: CanvasRenderingContext2D,
  device: AirPurifierDevice,
  animationEnabled: boolean
): void {
  const isInPower = getLightOnOffAttribute(device);

  if (
    lastValue[device.id] === undefined ||
    lastValue[device.id] !== isInPower
  ) {
    clearRectangle(
      ctx,
      device.textPosition[0],
      device.textPosition[1] - 20,
      45,
      25,
      false
    );
    clearRectangle(
      ctx,
      device.textPosition[0] + 10,
      device.textPosition[1] - 60,
      25,
      60,
      false
    );

    ctx.beginPath();
    ctx.font = `${TEXT_SIZE}px Arial`;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(
      getAirPurifierText(isInPower),
      device.textPosition[0],
      device.textPosition[1]
    );

    ctx.strokeStyle = COLOR_MACHINE2;

    drawPath2D(
      ctx,
      machine,
      {
        location: {
          x: device.textPosition[0],
          y: device.textPosition[1] - 55,
        },
        lineWidth: 1,
        fillStyle: COLOR_MACHINE2,
        stroke: COLOR_MACHINE1,
        scale: 0.07,
      },
      true
    );
  }

  delayedDeviceAnimation(
    device.id,
    (update: boolean) => {
      if (animationEnabled) {
        if (update) {
          clearRectangle(
            ctx,
            device.textPosition[0] - 25,
            device.textPosition[1] - 45,
            32,
            20,
            false
          );

          // const paths = path.map(p => new Path2D(p));
          for (let vertical = 0; vertical < 3; vertical++) {
            if (movement[device.id] === undefined) {
              movement[device.id] = 0;
            }
            drawPath2D(
              ctx,
              [new Path2D(paths[movement[device.id]])],
              {
                location: {
                  x: device.textPosition[0] - 18,
                  y: device.textPosition[1] - 40 - vertical * 6,
                },
                lineWidth: 30,
                fillStyle: "none",
                scale: 0.075,
                stroke: COLOR_MACHINE3,
              },
              false
            );
          }
          movement[device.id]++;
          if (movement[device.id] > paths.length) {
            movement[device.id] = 0;
          }
        }
      }
    },
    animationEnabled ? 200 : 5000
  );
}
