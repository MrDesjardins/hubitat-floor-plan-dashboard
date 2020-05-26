import { delayedDeviceAnimation } from "../Commons/animation";
import { DictionaryOf } from "../Commons/dictionaryOf";
import { degreeToRadian } from "../Commons/mathematic";
import { getWashingMachineText } from "../Commons/textbuilder";
import { COLOR_MACHINE1, TEXT_COLOR, TEXT_SIZE, WASHING_MACHINE_WIDTH } from "../constants";
import { getPowerAttribute } from "../Logics/AttributeLogics";
import { DeviceDataKind, WashingMachineDevice } from "../Models/devices";

const deviceAngle: DictionaryOf<number> = {};

export function drawWashingMachine(
  ctx: CanvasRenderingContext2D,
  device: WashingMachineDevice,
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void
): void {

  const powerNumber = getPowerAttribute(device);
  const isInPower = powerNumber > 5;

  delayedDeviceAnimation(device.id, (update: boolean) => {

    if (deviceAngle[device.id] === undefined) {
      deviceAngle[device.id] = 0;
    }

    const x = device.textPosition[0];
    const y = device.textPosition[1];
    const xMachine = x + device.width / 3;
    const yMachine = y - device.width;

    const length = (Math.pow(Math.pow(device.width, 2) + Math.pow(device.width, 2), 0.5)) / 2;
    const angleRadian = degreeToRadian(deviceAngle[device.id]);
    const cosAngle = Math.cos(angleRadian); // Only need cos(angle) once.
    const sinAngle = Math.sin(angleRadian); // Only need sin(angle) once.

    const endXPos = xMachine + cosAngle * length;
    const endYPos = yMachine + sinAngle * length;

    ctx.beginPath();
    ctx.font = `${TEXT_SIZE}px Arial`;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(
      getWashingMachineText(isInPower),
      x,
      y
    );

    ctx.lineWidth = WASHING_MACHINE_WIDTH;
    ctx.strokeStyle = COLOR_MACHINE1;
    ctx.rect(xMachine - device.width / 2, yMachine - device.width / 2, device.width, device.width);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(xMachine, yMachine, device.width / 3, degreeToRadian(0), degreeToRadian(360), true);
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
  }, 500);
}

const getSpeedWashingMachineFromPower = (power: number) => {
  const min = 2;
  const max = 24;
  let powerAdjusted = power > 100 ? 100 : power;
  const scale = max - min;
  return (powerAdjusted / 100) * scale;
};
