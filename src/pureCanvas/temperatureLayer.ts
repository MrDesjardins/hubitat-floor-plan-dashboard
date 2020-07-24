import { ThermostatDevice, MotionDevice } from "../models/devices";
import { DictionaryOf } from "../commons/dictionaryOf";
import { delayedDeviceAnimation } from "../commons/animation";
import {
  getTemperatureAtribute,
  getHumidityAtribute,
  getLuxAtribute,
} from "../logics/attributeLogics";
import { TEXT_SIZE, TEXT_COLOR } from "../constants";

type TemperatureDevice = ThermostatDevice | MotionDevice;
let deviceRadius: DictionaryOf<number> = {};
let deviceDirection: DictionaryOf<number> = {};
export function drawTemperatureLayer(
  ctx: CanvasRenderingContext2D,
  devices: TemperatureDevice[],
  animationEnabled: boolean
) {
  delayedDeviceAnimation(
    "temperature",
    (update: boolean) => {
      devices.forEach((singleDevice) => {
        drawTemperatureSensor(ctx, singleDevice, update, animationEnabled);
      });
    },
    animationEnabled ? 120 : 5000
  );
}
const maxRadius = 65;
const minRadius = 50;

export function drawTemperatureSensor(
  ctx: CanvasRenderingContext2D,
  device: TemperatureDevice,
  update: boolean,
  animationEnabled: boolean
) {
  const temperature = getTemperatureAtribute(device);
  const humidity = device.kind === "MOTION" ? getHumidityAtribute(device) : -1;
  const lux = device.kind === "MOTION" ? getLuxAtribute(device) : -1;
  const [x, y] = device.textPosition;
  const color1 = getColorFromTemperature(temperature);
  const color2 = getColorFromTemperature(temperature - 3, 0.15);
  const text = `${temperature.toFixed(1)}°F`;

  let radius = deviceRadius[device.id];
  if (animationEnabled) {
    if (radius === undefined) {
      radius = minRadius;
      deviceRadius[device.id] = radius + 1;
    }
    if (update) {
      if (radius >= maxRadius || radius <= minRadius) {
        deviceDirection[device.id] = (deviceDirection[device.id] ?? -1) * -1;
      }
      radius += deviceDirection[device.id];
    }
  }

  ctx.beginPath();
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  ctx.fillStyle = gradient;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.font = `${TEXT_SIZE}px Arial`;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(text, x, y);
  if (!isNaN(humidity) && humidity !== -1) {
    ctx.beginPath();
    ctx.fillText(`${humidity.toFixed(1)}%`, x, y + 15);
  }
  if (!isNaN(lux) && lux !== -1) {
    ctx.beginPath();
    ctx.fillText(`${lux} lux`, x, y + 30);
  }
  deviceRadius[device.id] = radius;
}

function getColorFromTemperature(
  fahrenheit: number,
  alpha: number = 0.8
): string {
  const colors: string[] = [
    `rgba(255, 10, 15, ${alpha})`,
    `rgba(250, 20, 25, ${alpha})`,
    `rgba(245, 40, 30, ${alpha})`,
    `rgba(240, 60, 35, ${alpha})`,
    `rgba(235, 80, 40, ${alpha})`,
    `rgba(225, 100, 45, ${alpha})`,
    `rgba(215, 120, 50, ${alpha})`,
    `rgba(200, 120, 70, ${alpha})`,
    `rgba(180, 120, 100, ${alpha})`,
    `rgba(160, 120, 130, ${alpha})`,
    `rgba(130, 120, 160, ${alpha})`,
    `rgba(100, 120, 180, ${alpha})`,
    `rgba(70, 120, 200, ${alpha})`,
    `rgba(50, 120, 215, ${alpha})`,
    `rgba(45, 100, 225, ${alpha})`,
    `rgba(40, 80, 235, ${alpha})`,
    `rgba(35, 60, 240, ${alpha})`,
    `rgba(30, 40, 245, ${alpha})`,
    `rgba(25, 20, 250, ${alpha})`,
    `rgba(20, 10, 255, ${alpha})`,
  ];

  const max = 80;
  // const min = 60;
  const index = Math.round(max - fahrenheit);
  if (index < 0) {
    return `rgba(238, 27, 27, ${alpha})`;
  }
  if (index >= colors.length) {
    return `rgba(138, 15, 138, ${alpha})`;
  }
  const colorToReturn = colors[index];
  return colorToReturn;
  // const diff = fahrenheit-65;
  // let colorRed: number;
  // let colorBlue: number;
  // if (fahrenheit > 80) {
  //   colorRed = 240;
  // }
  // else if (fahrenheit > 65) {
  //   colorRed = log(fahrenheit - 65);
  // }
  // else {
  //   colorRed = 15;
  // }

  // if (fahrenheit < 65) {
  //   colorBlue = 240;
  // } else if (fahrenheit < 80) {
  //   colorBlue = log(fahrenheit - 65);
  // }
  // else {
  //   colorBlue = 15;
  // }

  // const color = `rgba(${colorRed}, 100, ${colorBlue}, ${alpha})`;
  // console.log(fahrenheit-65, color);
  // return color;
}

// function log(x: number) {
//   return Math.log(x + 1) / Math.log(1.01);
// }
