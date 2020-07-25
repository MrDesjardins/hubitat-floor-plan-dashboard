import { delayedDeviceMultiAnimations } from "commons/animation";
import { DictionaryOf } from "commons/dictionaryOf";
import { degreeToRadian } from "commons/mathematic";
import { getMotionText } from "commons/textbuilder";
import { MOTION_COLOR, TEXT_COLOR, TEXT_SIZE } from "../constants";
import { getMotionOnOffAttribute } from "logics/attributeLogics";
import { MotionDevice } from "models/devices";
import { clearRectangle } from "./commonDrawing";

const deviceRadiusDirection: DictionaryOf<number> = {};
const deviceRadiusDimension: DictionaryOf<number> = {};

const devicePathIndex: DictionaryOf<number> = {};
const devicePathLocation: DictionaryOf<[number, number]> = {};
const devicePathLocationPrevious: DictionaryOf<[number, number]> = {};

const lastValue: DictionaryOf<boolean | undefined> = {};

export function drawMotion(
  ctx: CanvasRenderingContext2D,
  device: MotionDevice,
  animationEnabled: boolean
): void {
  const isInMotion = !getMotionOnOffAttribute(device);
  delayedDeviceMultiAnimations(
    device.id,
    (update: boolean[]) => {
      const x = device.textPosition[0];
      const y = device.textPosition[1];

      if (
        lastValue[device.id] === undefined ||
        lastValue[device.id] !== isInMotion
      ) {
        clearRectangle(
          ctx,
          device.textPosition[0],
          device.textPosition[1] - 20,
          35,
          25
        );
      }

      if (deviceRadiusDirection[device.id] === undefined) {
        deviceRadiusDirection[device.id] = 1;
        devicePathIndex[device.id] = 0;
        deviceRadiusDimension[device.id] = 6;
        devicePathLocation[device.id] = [
          device.path[devicePathIndex[device.id]][0],
          device.path[devicePathIndex[device.id]][1],
        ];
      }

      // Radius
      if (update[0] && animationEnabled) {
        if (deviceRadiusDimension[device.id] === 10) {
          deviceRadiusDirection[device.id] = -1;
        } else {
          deviceRadiusDirection[device.id] = 1;
        }
        deviceRadiusDimension[device.id] += deviceRadiusDirection[device.id];
      }

      // Clear text
      if (
        lastValue[device.id] === undefined ||
        lastValue[device.id] !== isInMotion
      ) {
        clearRectangle(ctx, x, y - 15, 65, 20, false);
      }

      ctx.beginPath();
      ctx.font = `${TEXT_SIZE}px Arial`;
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(getMotionText(isInMotion), x, y);

      // const angle = getAngleFromDirection(device.direction);
      if (isInMotion && animationEnabled) {
        // Position
        if (update[1] && animationEnabled) {
          const indexNext =
            devicePathIndex[device.id] + 1 >= device.path.length
              ? 0
              : devicePathIndex[device.id] + 1;
          const xTotalDistance = Math.ceil(
            device.path[indexNext][0] -
              device.path[devicePathIndex[device.id]][0]
          );
          const yTotalDistance = Math.ceil(
            device.path[indexNext][1] -
              device.path[devicePathIndex[device.id]][1]
          );
          const xPixelMove = xTotalDistance / 20;
          const yPixelMove = yTotalDistance / 20;
          const nextXPixel = devicePathLocation[device.id][0] + xPixelMove;
          const nextYPixel = devicePathLocation[device.id][1] + yPixelMove;
          const horizontalRightMovement =
            xTotalDistance >= 0 && nextXPixel >= device.path[indexNext][0];
          const horizontalLeftMovement =
            xTotalDistance <= 0 && nextXPixel <= device.path[indexNext][0];
          const verticalTopMovement =
            yTotalDistance >= 0 && nextYPixel >= device.path[indexNext][1];
          const verticalBottomMovement =
            yTotalDistance <= 0 && nextYPixel <= device.path[indexNext][1];

          devicePathLocationPrevious[device.id] = devicePathLocation[device.id];

          if (
            (horizontalRightMovement || horizontalLeftMovement) &&
            (verticalTopMovement || verticalBottomMovement)
          ) {
            devicePathIndex[device.id] = indexNext;
            devicePathLocation[device.id] = [
              device.path[devicePathIndex[device.id]][0],
              device.path[devicePathIndex[device.id]][1],
            ];
          } else {
            devicePathLocation[device.id] = [nextXPixel, nextYPixel];
          }

          // Clear past move
          clearRectangle(
            ctx,
            devicePathLocationPrevious[device.id][0] -
              deviceRadiusDimension[device.id] -
              2,
            devicePathLocationPrevious[device.id][1] -
              deviceRadiusDimension[device.id] -
              2,
            deviceRadiusDimension[device.id] * 2 + 4,
            deviceRadiusDimension[device.id] * 2 + 4,
            false
          );

          ctx.beginPath();
          ctx.fillStyle = MOTION_COLOR;
          ctx.arc(
            devicePathLocation[device.id][0],
            devicePathLocation[device.id][1],
            deviceRadiusDimension[device.id],
            degreeToRadian(0),
            degreeToRadian(360),
            false
          );
          ctx.fill();
        }
      }
    },
    [400, 40]
  );
}
