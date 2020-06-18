import { DeviceDataKind } from "models/devices";
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
  devices: DeviceDataKind[]
) {
  devices.forEach((singleDevice) => {
    switch (singleDevice.kind) {
      case "CONTACT":
        drawContact(ctx, singleDevice);
        break;
      case "DEADBOLT":
        drawDeadbolt(ctx, singleDevice);
        break;
      case "TV":
        drawTV(ctx, singleDevice);
        break;
      case "SWITCH":
        drawLightSwitch(ctx, singleDevice);
        break;
      case "DIMMER":
        drawDimmerSwitch(ctx, singleDevice);
        break;
      case "MOTION":
        drawMotion(ctx, singleDevice);
        break;
      case "WASHINGMACHINE":
        drawWashingMachine(ctx, singleDevice);
        break;
      case "THERMOSTAT":
        drawThermostat(ctx, singleDevice);
        break;
      case "AIRPURIFIER":
        drawAirPurifier(ctx, singleDevice);
        break;
      case "PROJECTING_LIGHT":
        drawProjectingLight(ctx, singleDevice);
        break;
      case "LEAK_SENSOR":
        drawLeakSensor(ctx, singleDevice);
        break;
    }
  });
}
