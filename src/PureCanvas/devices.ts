import { DictionaryOf } from "../Commons/dictionaryOf";
import { DeviceDataKind, ThermostatDevice, MotionDevice } from "../Models/devices";
import { drawTemperatureLayer } from "./temperatureLayer";
import { drawDevicesLayer } from "./devicesLayer";


export function drawDevices(ctx: CanvasRenderingContext2D, devices: DictionaryOf<DeviceDataKind>, isTemperatureModeOn: boolean, openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void): void {

  if (isTemperatureModeOn) {
    const temperatureSensors = Object.values(devices).filter(
      (d) => d.kind === "THERMOSTAT" || d.kind === "MOTION"
    ) as (ThermostatDevice & MotionDevice)[];
    drawTemperatureLayer(ctx, temperatureSensors, openConfiguration);

  } else {
    drawDevicesLayer(ctx, Object.values(devices), openConfiguration);
  }
}