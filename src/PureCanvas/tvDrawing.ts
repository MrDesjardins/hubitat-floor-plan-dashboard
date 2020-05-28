import { getTVText } from "commons/textbuilder";
import { TEXT_COLOR, TEXT_SIZE } from "../constants";
import { getPowerOnAttribute } from "logics/attributeLogics";
import { DeviceDataKind, TvDevice } from "models/devices";
import { degreeToRadian } from "commons/mathematic";
import { DictionaryOf } from "commons/dictionaryOf";
import { delayedDeviceAnimation } from "commons/animation";


const devicseRadius: DictionaryOf<number> = {};
const devicseDirection: DictionaryOf<number> = {};
export function drawTV(
  ctx: CanvasRenderingContext2D,
  device: TvDevice,
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void
): void {

  delayedDeviceAnimation(device.id, (update: boolean) => {
    const isTVOn = getPowerOnAttribute(device, device.wattThreashold);
    const x = device.textPosition[0];
    const y = device.textPosition[1];
    if (devicseRadius[device.id] === undefined) {
      devicseRadius[device.id] = device.radius[0];
      devicseDirection[device.id] = -1;
    }

    if (update) {
      if (devicseRadius[device.id] >= device.radius[1] || devicseRadius[device.id] <= device.radius[0]) {
        devicseDirection[device.id] *= -1;
      }
      devicseRadius[device.id] += devicseDirection[device.id];

    }
    ctx.beginPath();
    ctx.font = `${TEXT_SIZE}px Arial`;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(
      getTVText(isTVOn),
      device.textPosition[0],
      device.textPosition[1]
    );

    // const angle = getAngleFromDirection(device.direction);
    ctx.beginPath();
    ctx.fillStyle = "rgba(250,235,100,0.4)";
    ctx.arc(x, y, devicseRadius[device.id], degreeToRadian(-90), degreeToRadian(90), true);
    ctx.fill();
  }, (3000 * 1 / (device.radius[1] - device.radius[0])));
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
