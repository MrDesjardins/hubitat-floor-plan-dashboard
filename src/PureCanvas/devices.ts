import { DictionaryOf } from "../Commons/DictionaryOf";
import { DeviceDataKind, ThermostatDevice, MotionDevice } from "../Models/Devices";
import { drawTemperatureLayer } from "./temperatureLayer";

export function drawDevices(ctx: CanvasRenderingContext2D, devices: DictionaryOf<DeviceDataKind>, isTemperatureModeOn: boolean, openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void): void {

  if (isTemperatureModeOn) {
    const temperatureSensors = Object.values(devices).filter(
      (d) => d.kind === "THERMOSTAT" || d.kind === "MOTION"
    ) as (ThermostatDevice & MotionDevice)[];
    drawTemperatureLayer(ctx, temperatureSensors, openConfiguration);

  } else {
    console.log("not temperature devices");
  }
}