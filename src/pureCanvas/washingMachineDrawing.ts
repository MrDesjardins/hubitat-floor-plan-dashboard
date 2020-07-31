import { delayedDeviceAnimation } from "commons/animation";
import { DictionaryOf } from "commons/dictionaryOf";
import { degreeToRadian } from "commons/mathematic";
import { getWashingMachineText } from "commons/textbuilder";
import {
  COLOR_MACHINE1,
  TEXT_COLOR,
  TEXT_SIZE,
  WASHING_MACHINE_WIDTH,
} from "../constants";
import { getPowerAttribute } from "logics/attributeLogics";
import { WashingMachineDevice } from "models/devices";
import { clearRectangle } from "./commonDrawing";

const deviceAngle: DictionaryOf<number> = {};

export let washingMachinePowerLastValues: DictionaryOf<
  boolean | undefined
> = {};
export let washingMachineEnergyLastValues: DictionaryOf<
  number | undefined
> = {};

export function drawWashingMachine(
  ctx: CanvasRenderingContext2D,
  device: WashingMachineDevice,
  animationEnabled: boolean
): void {
  const powerNumber = getPowerAttribute(device);
  const isInPower = powerNumber > 5;

  delayedDeviceAnimation(
    device.id,
    (update: boolean) => {
      const x = device.textPosition[0];
      const y = device.textPosition[1];
      const xMachine = x + device.width / 3;
      const yMachine = y - device.width;

      if (deviceAngle[device.id] === undefined) {
        deviceAngle[device.id] = 0;
      }

      // Clear text
      if (
        washingMachinePowerLastValues[device.id] === undefined &&
        washingMachinePowerLastValues[device.id] !== isInPower
      ) {
        clearRectangle(ctx, x, y - 15, 20, 20, false);
        washingMachinePowerLastValues[device.id] = isInPower;
      }
      // Clear washing machine
      if (
        washingMachineEnergyLastValues[device.id] === undefined &&
        washingMachineEnergyLastValues[device.id] !== powerNumber
      ) {
        clearRectangle(
          ctx,
          xMachine - device.width / 2,
          yMachine - device.width / 2,
          device.width,
          device.width,
          true
        );
        washingMachineEnergyLastValues[device.id] = powerNumber;

        const length =
          Math.pow(Math.pow(device.width, 2) + Math.pow(device.width, 2), 0.5) /
          2;
        const angleRadian = degreeToRadian(deviceAngle[device.id]);
        const cosAngle = Math.cos(angleRadian); // Only need cos(angle) once.
        const sinAngle = Math.sin(angleRadian); // Only need sin(angle) once.

        const endXPos = xMachine + cosAngle * length;
        const endYPos = yMachine + sinAngle * length;

        ctx.beginPath();
        ctx.font = `${TEXT_SIZE}px Arial`;
        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(getWashingMachineText(isInPower), x, y);

        ctx.lineWidth = WASHING_MACHINE_WIDTH;
        ctx.strokeStyle = COLOR_MACHINE1;
        ctx.rect(
          xMachine - device.width / 2,
          yMachine - device.width / 2,
          device.width,
          device.width
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(
          xMachine,
          yMachine,
          device.width / 3,
          degreeToRadian(0),
          degreeToRadian(360),
          true
        );
        ctx.stroke();
        if (isInPower) {
          ctx.beginPath();
          ctx.fillStyle = COLOR_MACHINE1;
          ctx.moveTo(xMachine, yMachine);
          ctx.lineTo(endXPos, endYPos);
          ctx.stroke();
          const speed = getSpeedWashingMachineFromPower(powerNumber);
          deviceAngle[device.id] += speed;
        }
      }
    },
    500
  );
}

const getSpeedWashingMachineFromPower = (power: number) => {
  const min = 2;
  const max = 24;
  let powerAdjusted = power > 100 ? 100 : power;
  const scale = max - min;
  return (powerAdjusted / 100) * scale;
};
