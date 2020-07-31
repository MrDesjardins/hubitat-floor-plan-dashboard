import { getTVText } from "commons/textbuilder";
import { TEXT_COLOR, TEXT_SIZE, TEXT_PADDING } from "../constants";
import { getPowerOnAttribute } from "logics/attributeLogics";
import { TvDevice } from "models/devices";
import { degreeToRadian } from "commons/mathematic";
import { DictionaryOf } from "commons/dictionaryOf";
import { delayedDeviceAnimation } from "commons/animation";
import { clearRectangle } from "./commonDrawing";

const devicseRadius: DictionaryOf<number> = {};
const devicseDirection: DictionaryOf<number> = {};

export let tvPowerLastValues: DictionaryOf<boolean | undefined> = {};
export let tvPowerEnergyLastValues: DictionaryOf<number | undefined> = {};

export function drawTV(
  ctx: CanvasRenderingContext2D,
  device: TvDevice,
  animationEnabled: boolean
): void {
  delayedDeviceAnimation(
    device.id,
    (update: boolean) => {
      const isTVOn = getPowerOnAttribute(device, device.wattThreashold);
      const x = device.textPosition[0];
      const y = device.textPosition[1];

      if (
        tvPowerLastValues[device.id] === undefined ||
        tvPowerLastValues[device.id] !== isTVOn
      ) {
        clearRectangle(
          ctx,
          device.textPosition[0] + TEXT_PADDING,
          device.textPosition[1] - 15,
          30,
          20,
          false
        );
        ctx.beginPath();
        ctx.font = `${TEXT_SIZE}px Arial`;
        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(
          getTVText(isTVOn),
          device.textPosition[0] + TEXT_PADDING,
          device.textPosition[1]
        );
      }

      if (
        tvPowerEnergyLastValues[device.id] === undefined ||
        tvPowerEnergyLastValues[device.id] !== devicseRadius[device.id]
      ) {
        clearRectangle(
          ctx,
          x - devicseRadius[device.id],
          y - devicseRadius[device.id],
          devicseRadius[device.id],
          devicseRadius[device.id] * 2,
          false
        );

        if (devicseRadius[device.id] === undefined) {
          devicseRadius[device.id] = device.radius[0];
          devicseDirection[device.id] = -1;
        }

        if (update && animationEnabled) {
          if (
            devicseRadius[device.id] >= device.radius[1] ||
            devicseRadius[device.id] <= device.radius[0]
          ) {
            devicseDirection[device.id] *= -1;
          }
          devicseRadius[device.id] += devicseDirection[device.id];
        }

        // const angle = getAngleFromDirection(device.direction);
        if (isTVOn) {
          ctx.beginPath();
          ctx.fillStyle = "rgba(250,235,100,0.4)";
          ctx.arc(
            x,
            y,
            devicseRadius[device.id],
            degreeToRadian(-90),
            degreeToRadian(90),
            true
          );
          ctx.fill();
        }
      }
    },
    animationEnabled ? (3000 * 1) / (device.radius[1] - device.radius[0]) : 5000
  );
}

// const getAngleFromDirection = (direction: TvDirection): number => {
//   switch (direction) {
//     case TvDirection.East:
//       return 270;
//     case TvDirection.South:
//       return 0;
//     case TvDirection.West:
//       return 90;
//     case TvDirection.North:
//       return 180;
//   }
// };
