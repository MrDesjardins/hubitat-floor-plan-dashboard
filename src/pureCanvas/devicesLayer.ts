import { DeviceDataKind } from "../models/devices";
import { drawContact } from "./contactDrawing";
import { drawDeadbolt } from "./deadboltDrawing";
import { drawTV } from "./tvDrawing";
import { drawLightSwitch } from "./lightSwitchDrawing";
import { drawDimmerSwitch } from "./dimmerSwitchDrawing";
import { drawMotion } from "./motionDrawing";
import { drawWashingMachine } from "./washingMachineDrawing";
import { drawThermostat } from "./thermostatDrawing";
import { drawAirPurifier } from "./airpurifierDrawing";
import { drawProjectingLight } from "./projectionLightDrawing";
import { drawLeakSensor } from "./drawLeakSensor";

export function drawDevicesLayer(
  ctx: CanvasRenderingContext2D,
  devices: DeviceDataKind[],
  animationEnabled: boolean
) {
  devices.forEach((singleDevice) => {
    switch (singleDevice.kind) {
      case "CONTACT":
        drawContact(ctx, singleDevice, animationEnabled);
        break;
      case "DEADBOLT":
        drawDeadbolt(ctx, singleDevice, animationEnabled);
        break;
      case "TV":
        drawTV(ctx, singleDevice, animationEnabled);
        break;
      case "SWITCH":
        drawLightSwitch(ctx, singleDevice, animationEnabled);
        break;
      case "DIMMER":
        drawDimmerSwitch(ctx, singleDevice, animationEnabled);
        break;
      case "MOTION":
        drawMotion(ctx, singleDevice, animationEnabled);
        break;
      case "WASHINGMACHINE":
        drawWashingMachine(ctx, singleDevice, animationEnabled);
        break;
      case "THERMOSTAT":
        drawThermostat(ctx, singleDevice, animationEnabled);
        break;
      case "AIRPURIFIER":
        drawAirPurifier(ctx, singleDevice, animationEnabled);
        break;
      case "PROJECTING_LIGHT":
        drawProjectingLight(ctx, singleDevice, animationEnabled);
        break;
      case "LEAK_SENSOR":
        drawLeakSensor(ctx, singleDevice, animationEnabled);
        break;
    }
  });
}
