import { LearkSensorDevice } from "models/devices";
import { TEXT_COLOR, TEXT_SIZE } from "../constants";
import { getLeakAttribute } from "../logics/attributeLogics";
import { getLeakStatusText } from "../commons/textbuilder";

export function drawLeakSensor(
  ctx: CanvasRenderingContext2D,
  device: LearkSensorDevice,
): void {
  const leakStatus = getLeakAttribute(device);

  ctx.beginPath();
  ctx.font = `${TEXT_SIZE}px Arial`;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(
    getLeakStatusText(leakStatus),
    device.textPosition[0],
    device.textPosition[1]
  );
}
