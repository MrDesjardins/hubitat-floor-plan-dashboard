import { DeviceDataKind } from "models/devices";
import {
  TEXT_SIZE,
  TEXT_COLOR,
  WARNING_COLOR,
  ERROR_COLOR,
  BATTERY_MEDIUM,
  BATTERY_LOW,
  BATTERY_HIGH,
} from "../constants";
import { getBattery } from "../logics/attributeLogics";
import { drawPath2D } from "./commonDrawing";

const lowBattery = [
  new Path2D(`M471.108,96.392H36.27c-20,0-36.27,16.227-36.27,36.172v304.033c0,19.945,16.27,36.172,36.27,36.172h434.838
c20,0,36.271-16.227,36.271-36.172V132.564C507.382,112.619,491.108,96.392,471.108,96.392z M126.911,422.065
c0,11.455-9.315,20.746-20.802,20.746H53.544c-11.49,0-20.802-9.291-20.802-20.746v-274.97c0-11.459,9.314-20.747,20.802-20.747
h52.564c11.491,0,20.802,9.287,20.802,20.747V422.065z M242.753,422.065c0,11.455-9.314,20.746-20.802,20.746h-52.568
c-11.49,0-20.802-9.291-20.802-20.746v-274.97c0-11.459,9.314-20.747,20.802-20.747h52.564c11.491,0,20.802,9.287,20.802,20.747
v274.97H242.753z M358.592,422.065c0,11.455-9.314,20.746-20.802,20.746h-52.564c-11.49,0-20.802-9.291-20.802-20.746v-274.97
c0-11.459,9.314-20.747,20.802-20.747h52.564c11.49,0,20.802,9.287,20.802,20.747V422.065z"`),
  new Path2D(`M532.89,174.893c0,0-1.606,0-3.592,0c-1.986,0-3.593,2.727-3.593,6.086v207.199c0,3.361,1.606,6.086,3.593,6.086h3.592
c20,0,36.271-16.227,36.271-36.172V211.065C569.16,191.12,552.89,174.893,532.89,174.893z`),
];

const mediumBattery = [
  new Path2D(`M471.108,96.392H36.27c-20,0-36.27,16.227-36.27,36.172v304.033c0,19.945,16.27,36.172,36.27,36.172h434.838
  c20,0,36.273-16.227,36.273-36.172V132.564C507.382,112.619,491.108,96.392,471.108,96.392z M217.26,422.065
  c0,11.459-9.315,20.746-20.802,20.746H53.544c-11.49,0-20.802-9.291-20.802-20.746v-274.97c0-11.459,9.314-20.747,20.802-20.747
  h142.914c11.49,0,20.802,9.29,20.802,20.747V422.065L217.26,422.065z`),
  new Path2D(`M532.89,174.893c0,0-1.609,0-3.592,0c-1.983,0-3.593,2.727-3.593,6.086v207.199c0,3.361,1.606,6.086,3.593,6.086h3.592
  c20,0,36.271-16.227,36.271-36.172V211.065C569.16,191.12,552.89,174.893,532.89,174.893z`),
];

const fullBattery = [
  new Path2D(`M471.108,96.392H36.27c-20,0-36.27,16.227-36.27,36.172v304.033c0,19.945,16.27,36.172,36.27,36.172h434.838
  c20,0,36.273-16.227,36.273-36.172V132.564C507.382,112.619,491.108,96.392,471.108,96.392z M433.973,375.112
  c0,2.922-2.708,3.938-6.047,2.268l-121.696-60.885c-3.339-1.672-5.994-0.656-5.931,2.264l0.79,35.902
  c0.064,2.924-2.179,3.59-5.013,1.49L75.258,192.509c-2.833-2.099-2.359-2.512,1.056-0.924l152.73,71.01
  c3.415,1.588,6.185,0.508,6.185-2.415v-45.282c0-2.922,2.723-3.957,6.086-2.307l186.571,91.438
  c3.36,1.646,6.087,5.354,6.087,8.275V375.112z`),
  new Path2D(`M532.89,174.893c0,0-1.609,0-3.592,0c-1.983,0-3.593,2.727-3.593,6.086v207.199c0,3.361,1.606,6.086,3.593,6.086h3.592
  c20,0,36.271-16.227,36.271-36.172V211.065C569.16,191.12,552.89,174.893,532.89,174.893z`),
];

export function drawBatteriesLayer(
  ctx: CanvasRenderingContext2D,
  devices: DeviceDataKind[],
  animationEnabled: boolean
): void {
  devices.forEach((singleDevice) => {
    drawBatteries(ctx, singleDevice);
  });
}

export function drawBatteries(
  ctx: CanvasRenderingContext2D,
  device: DeviceDataKind
) {
  const battery = getBattery(device);
  if (!isNaN(battery) && battery < BATTERY_HIGH) {
    ctx.font = `${TEXT_SIZE}px Arial`;
    ctx.fillStyle = batteryColor(battery);
    ctx.fillText(`${battery}%`, device.textPosition[0], device.textPosition[1]);
    let image: Path2D[];
    if (battery > BATTERY_MEDIUM) {
      image = fullBattery;
    } else if (battery > BATTERY_LOW) {
      image = mediumBattery;
    } else {
      image = lowBattery;
    }
    ctx.fillText(
      device.label,
      device.textPosition[0],
      device.textPosition[1] + 18
    );
    drawPath2D(
      ctx,
      image,
      {
        scale: 0.04,
        location: {
          x: device.textPosition[0] + 40,
          y: device.textPosition[1] - 15,
        },
        strokeStyle: batteryColor(battery),
      },
      true
    );
  }
}

function batteryColor(batteryLevel: number): string {
  if (batteryLevel > BATTERY_MEDIUM) {
    return TEXT_COLOR;
  } else if (batteryLevel > BATTERY_LOW) {
    return WARNING_COLOR;
  }
  return ERROR_COLOR;
}
