import { LightSwitchDevice } from "../models/devices";
import { getLightOnOffAttribute } from "../logics/attributeLogics";
import {
  TEXT_SIZE,
  TEXT_COLOR,
  TEXT_PADDING,
  LIGHT_ON_COLOR,
  LIGHT_OFF_COLOR,
} from "../constants";
import { drawPath2D, clearRectangle } from "./commonDrawing";
import { DictionaryOf } from "../commons/dictionaryOf";

export let lightSwitchLastValues: DictionaryOf<boolean | undefined> = {};
export function drawLightSwitch(
  ctx: CanvasRenderingContext2D,
  device: LightSwitchDevice,
  animationEnabled: boolean
): void {
  const isOn = getLightOnOffAttribute(device);

  const imageX = device.textPosition[0] - TEXT_PADDING / 2 + 5;
  const imageY = device.textPosition[1] + 5;


  if (lightSwitchLastValues[device.id] === undefined || lightSwitchLastValues[device.id] !== isOn) {
    clearRectangle(
      ctx,
      device.textPosition[0],
      device.textPosition[1] - 20,
      30,
      25,
    );
    clearRectangle(
      ctx,
      imageX,
      imageY,
      30,
      30,
    );
    const text = `${isOn ? "On" : "Off"}`;

    ctx.beginPath();
    ctx.font = `${TEXT_SIZE}px Arial`;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(text, device.textPosition[0], device.textPosition[1]);

    const pathOff = new Path2D(
      "M19 6.734c0 4.164-3.75 6.98-3.75 10.266h-1.992c.001-2.079.996-3.826 1.968-5.513.913-1.585 1.774-3.083 1.774-4.753 0-3.108-2.518-4.734-5.004-4.734-2.482 0-4.996 1.626-4.996 4.734 0 1.67.861 3.168 1.774 4.753.972 1.687 1.966 3.434 1.967 5.513h-1.991c0-3.286-3.75-6.103-3.75-10.266 0-4.343 3.498-6.734 6.996-6.734 3.502 0 7.004 2.394 7.004 6.734zm-4 11.766c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm0 2c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5zm-1.701 3.159c-.19.216-.465.341-.752.341h-1.094c-.287 0-.562-.125-.752-.341l-1.451-1.659h5.5l-1.451 1.659zm-3.629-16.347l-1.188-.153c.259-1.995 1.5-3.473 3.518-3.847l.219 1.177c-1.947.361-2.433 1.924-2.549 2.823z"
    );
    const pathOn = new Path2D(
      "M14 19h-4c-.276 0-.5.224-.5.5s.224.5.5.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm0 2h-4c-.276 0-.5.224-.5.5s.224.5.5.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm.25 2h-4.5l1.188.782c.154.138.38.218.615.218h.895c.234 0 .461-.08.615-.218l1.187-.782zm3.75-13.799c0 3.569-3.214 5.983-3.214 8.799h-1.989c-.003-1.858.87-3.389 1.721-4.867.761-1.325 1.482-2.577 1.482-3.932 0-2.592-2.075-3.772-4.003-3.772-1.925 0-3.997 1.18-3.997 3.772 0 1.355.721 2.607 1.482 3.932.851 1.478 1.725 3.009 1.72 4.867h-1.988c0-2.816-3.214-5.23-3.214-8.799 0-3.723 2.998-5.772 5.997-5.772 3.001 0 6.003 2.051 6.003 5.772zm4-.691v1.372h-2.538c.02-.223.038-.448.038-.681 0-.237-.017-.464-.035-.69h2.535zm-10.648-6.553v-1.957h1.371v1.964c-.242-.022-.484-.035-.726-.035-.215 0-.43.01-.645.028zm-3.743 1.294l-1.04-1.94 1.208-.648 1.037 1.933c-.418.181-.822.401-1.205.655zm10.586 1.735l1.942-1.394.799 1.115-2.054 1.473c-.191-.43-.423-.827-.687-1.194zm-3.01-2.389l1.038-1.934 1.208.648-1.041 1.941c-.382-.254-.786-.473-1.205-.655zm-10.068 3.583l-2.054-1.472.799-1.115 1.942 1.393c-.264.366-.495.763-.687 1.194zm13.707 6.223l2.354.954-.514 1.271-2.425-.982c.21-.397.408-.812.585-1.243zm-13.108 1.155l-2.356 1.06-.562-1.251 2.34-1.052c.173.433.371.845.578 1.243zm-1.178-3.676h-2.538v-1.372h2.535c-.018.226-.035.454-.035.691 0 .233.018.458.038.681z"
    );

    ctx.strokeStyle = isOn ? LIGHT_ON_COLOR : LIGHT_OFF_COLOR;
    drawPath2D(
      ctx,
      isOn ? [pathOn] : [pathOff],
      {
        location: {
          x: imageX,
          y: imageY,
        },
        lineWidth: 1,
        fillStyle: "none",
        scale: 1,
      },
      false
    );
    lightSwitchLastValues[device.id] = isOn;
  }
}
