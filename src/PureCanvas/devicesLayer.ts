import { DeviceDataKind } from "../Models/devices";
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


export function drawDevicesLayer(
  ctx: CanvasRenderingContext2D,
  devices: DeviceDataKind[],
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void
) {

  devices.forEach((singleDevice) => {
    switch (singleDevice.kind) {
      case "CONTACT":
        drawContact(ctx, singleDevice, openConfiguration);
        break;
      case "DEADBOLT":
        drawDeadbolt(ctx, singleDevice, openConfiguration);
        break;
      case "TV":
        drawTV(ctx, singleDevice, openConfiguration);
        break;
      case "SWITCH":
        drawLightSwitch(ctx, singleDevice, openConfiguration);
        break;
      case "DIMMER":
        drawDimmerSwitch(ctx, singleDevice, openConfiguration);
        break;
      case "MOTION":
        drawMotion(ctx, singleDevice, openConfiguration);
        break;
      case "WASHINGMACHINE":
        drawWashingMachine(ctx, singleDevice, openConfiguration);
        break;
      case "THERMOSTAT":
        drawThermostat(ctx, singleDevice, openConfiguration);
        break;
      case "AIRPURIFIER":
        drawAirPurifier(ctx, singleDevice, openConfiguration);
        break;
      case "PROJECTING_LIGHT":
        drawProjectingLight(ctx, singleDevice, openConfiguration);
        break;
    }
  });
}