import { DictionaryOf } from "../commons/dictionaryOf";
import { DeviceDataKind, ThermostatDevice, MotionDevice } from "../models/devices";
import { drawTemperatureLayer } from "./temperatureLayer";
import { drawDevicesLayer } from "./devicesLayer";
import { Mode } from "../models/mode";
import { drawBatteriesLayer } from "./drawBatteriesLayer";

export function drawDevices(
  ctx: CanvasRenderingContext2D,
  devices: DictionaryOf<DeviceDataKind>,
  mode: Mode,
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void,
  animationEnabled: boolean
): void {
  if (mode === Mode.TEMPERATURES) {
    const temperatureSensors = Object.values(devices).filter(
      (d) => d.kind === "THERMOSTAT" || d.kind === "MOTION"
    ) as (ThermostatDevice & MotionDevice)[];
    drawTemperatureLayer(ctx, temperatureSensors, animationEnabled);
  } else if (mode === Mode.DEVICES) {
    drawDevicesLayer(ctx, Object.values(devices), animationEnabled);
  } else if (mode === Mode.BATTERIES) {
    drawBatteriesLayer(ctx, Object.values(devices), animationEnabled);
  }
}
