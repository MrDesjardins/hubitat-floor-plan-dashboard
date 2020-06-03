import {
  createActionPayload,
  ActionsUnion,
} from "infrastructure/reducerActions";
import { DeviceDataKind } from "models/devices";
import { Weather } from "../models/weather";
import { Mode } from "../models/mode";

export const ACTION_INIT_DEVICE = "ACTION_INIT_DEVICE";
export const ACTION_SAVE_DEVICE = "ACTION_SAVE_DEVICE";
export const ACTION_SET_TEMPERATURE_MODE = "ACTION_SET_TEMPERATURE_MODE";
export const ACTION_SET_OUTSIDE_WEATHER = "ACTION_SET_OUTSIDE_WEATHER";

export interface InitData {
  devices: DeviceDataKind[];
}
export const AppActions = {
  initDevice: createActionPayload<typeof ACTION_INIT_DEVICE, InitData>(
    ACTION_INIT_DEVICE
  ),
  saveDevice: createActionPayload<typeof ACTION_SAVE_DEVICE, DeviceDataKind>(
    ACTION_SAVE_DEVICE
  ),
  setMode: createActionPayload<
    typeof ACTION_SET_TEMPERATURE_MODE,
    Mode
  >(ACTION_SET_TEMPERATURE_MODE),
  setOutsideWeather: createActionPayload<typeof ACTION_SET_OUTSIDE_WEATHER, Weather>(
    ACTION_SET_OUTSIDE_WEATHER
  ),
};
export type AcceptedActions = ActionsUnion<typeof AppActions>;
