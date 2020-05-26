import { delayedDeviceMultiAnimations } from "../Commons/animation";
import { DictionaryOf } from "../Commons/dictionaryOf";
import { degreeToRadian } from "../Commons/mathematic";
import { getMotionText } from "../Commons/textbuilder";
import { MOTION_COLOR, TEXT_COLOR, TEXT_SIZE } from "../constants";
import { getMotionOnOffAttribute } from "../Logics/AttributeLogics";
import { DeviceDataKind, MotionDevice } from "../Models/devices";

const deviceRadiusDirection: DictionaryOf<number> = {};
const deviceRadiusDimension: DictionaryOf<number> = {};

const devicePathIndex: DictionaryOf<number> = {};
const devicePathLocation: DictionaryOf<[number, number]> = {};

export function drawMotion(
  ctx: CanvasRenderingContext2D,
  device: MotionDevice,
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void
): void {

  const isInMotion = getMotionOnOffAttribute(device);
  delayedDeviceMultiAnimations(device.id, (update: boolean[]) => {

    const x = device.textPosition[0];
    const y = device.textPosition[1];
    if (deviceRadiusDirection[device.id] === undefined) {
      deviceRadiusDirection[device.id] = 1
      devicePathIndex[device.id] = 0
      deviceRadiusDimension[device.id] = 6;
      devicePathLocation[device.id] = [device.path[devicePathIndex[device.id]][0], device.path[devicePathIndex[device.id]][1]]
    }

    // Radius
    if (update[0]) {
      if (deviceRadiusDimension[device.id] === 10) {
        deviceRadiusDirection[device.id] = -1;
      } else {
        deviceRadiusDirection[device.id] = 1;
      }
      deviceRadiusDimension[device.id] += deviceRadiusDirection[device.id];
    }

    // Position
    if (update[1]) {
      const indexNext = (devicePathIndex[device.id] + 1) >= device.path.length ? 0 : devicePathIndex[device.id] + 1;
      const xTotalDistance = Math.ceil(device.path[indexNext][0] - device.path[devicePathIndex[device.id]][0]);
      const yTotalDistance = Math.ceil(device.path[indexNext][1] - device.path[devicePathIndex[device.id]][1]);
      const xPixelMove = xTotalDistance / 20;
      const yPixelMove = yTotalDistance / 20;
      const nextXPixel = devicePathLocation[device.id][0] + xPixelMove;
      const nextYPixel = devicePathLocation[device.id][1] + yPixelMove;
      const horizontalRightMovement = (xTotalDistance >= 0 && nextXPixel >= device.path[indexNext][0]);
      const horizontalLeftMovement = (xTotalDistance <= 0 && nextXPixel <= device.path[indexNext][0]);
      const verticalTopMovement = (yTotalDistance >= 0 && nextYPixel >= device.path[indexNext][1]);
      const verticalBottomMovement = (yTotalDistance <= 0 && nextYPixel <= device.path[indexNext][1]);
      if ((horizontalRightMovement || horizontalLeftMovement) && (verticalTopMovement || verticalBottomMovement)) {
        devicePathIndex[device.id] = indexNext;
        devicePathLocation[device.id] = [device.path[devicePathIndex[device.id]][0], device.path[devicePathIndex[device.id]][1]];
      } else {
        devicePathLocation[device.id] = [nextXPixel, nextYPixel];
      }
    }

    ctx.beginPath();
    ctx.font = `${TEXT_SIZE}px Arial`;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(
      getMotionText(isInMotion),
      x,
      y
    );

    // const angle = getAngleFromDirection(device.direction);
    if (isInMotion) {
      ctx.beginPath();
      ctx.fillStyle = MOTION_COLOR;
      ctx.arc(devicePathLocation[device.id][0], devicePathLocation[device.id][1], deviceRadiusDimension[device.id], degreeToRadian(0), degreeToRadian(360), true);
      ctx.fill();
    }
  }, [250, 20]);
}