import { ProjectingLightDevice, DeviceDataKind } from "Models/devices";
import { getLightOnOffAttribute } from "Logics/attributeLogics";
import { delayedDeviceAnimation } from "Commons/animation";
import { TEXT_SIZE, TEXT_COLOR } from "../constants";
import { getProjectionText } from "Commons/textbuilder";
import { DictionaryOf } from "Commons/dictionaryOf";
import { drawPath2D } from "./commonDrawing";

export interface Star {
  x: number;
  y: number;
  opacity: number;
  fadingSpeed: number;
  size: number;
}
const stars: DictionaryOf<Star[]> = {};

export function drawProjectingLight(
  ctx: CanvasRenderingContext2D,
  device: ProjectingLightDevice,
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void
): void {
  const isOn = getLightOnOffAttribute(device);


  ctx.beginPath();
  ctx.font = `${TEXT_SIZE}px Arial`;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(
    getProjectionText(isOn),
    device.textPosition[0],
    device.textPosition[1]
  );

  if (isOn) {
    if (stars[device.id] === undefined) {
      stars[device.id] = createNewStars(device);
    }

    delayedDeviceAnimation(device.id, (update: boolean) => {
      const starsPath = new Path2D("M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z");
      if (update) {
        for (let i = 0; i < stars[device.id].length; i++) {
          const s = stars[device.id][i];
          if (Math.random() * 10 <= s.fadingSpeed) {
            s.opacity *= 0.95;
            if (s.opacity < 0.05) {
              stars[device.id][i] = createNewStar(device);
            }
          }
        }
      }
      stars[device.id].forEach(s => {
        drawPath2D(
          ctx,
          [starsPath],
          {
            location: {
              x: s.x,
              y: s.y,
            },
            lineWidth: 1,
            fillStyle: `rgba(255,228,122, ${s.opacity})`,
            stroke: `rgba(194,107,0, ${s.opacity})`,
            scale: s.size,
          },
          true
        );
      });
    }, 50);
  }
}

export function createNewStars(device: ProjectingLightDevice): Star[] {
  const newStars: Star[] = []
  for (let i = 0; i < device.amount; i++) {
    newStars.push(createNewStar(device));
  }
  return newStars;
}

export function createNewStar(device: ProjectingLightDevice): Star {
  return {
    x: (device.box[2] - device.box[0]) * Math.random() + device.box[0],
    y: (device.box[3] - device.box[1]) * Math.random() + device.box[1],
    size: 0.4 + Math.random() * 0.6,
    fadingSpeed: Math.random() * 10,
    opacity: 0.5 + Math.random() * 0.5
  };
}