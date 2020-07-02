import {
  createActionPayload,
  ActionsUnion,
} from "infrastructure/reducerActions";
import { DeviceDataKind } from "models/devices";
import { Weather } from "../models/weather";
import { Mode } from "../models/mode";
import { AlarmAction } from "../models/alarm";
import { Feedback } from "../models/feedback";

export const ACTION_INIT_DEVICE = "ACTION_INIT_DEVICE";
export const ACTION_SAVE_DEVICE = "ACTION_SAVE_DEVICE";
export const ACTION_SET_TEMPERATURE_MODE = "ACTION_SET_TEMPERATURE_MODE";
export const ACTION_SET_OUTSIDE_WEATHER = "ACTION_SET_OUTSIDE_WEATHER";
export const ACTION_SET_ALARM_ACTION = "ACTION_SET_ALARM_ACTION";
export const ACTION_NOTIFY = "ACTION_NOTIFY";

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
  setMode: createActionPayload<typeof ACTION_SET_TEMPERATURE_MODE, Mode>(
    ACTION_SET_TEMPERATURE_MODE
  ),
  setOutsideWeather: createActionPayload<
    typeof ACTION_SET_OUTSIDE_WEATHER,
    Weather
  >(ACTION_SET_OUTSIDE_WEATHER),
  setAlarmAction: createActionPayload<
    typeof ACTION_SET_ALARM_ACTION,
    AlarmAction
  >(ACTION_SET_ALARM_ACTION),
  notify: createActionPayload<typeof ACTION_NOTIFY, Feedback | undefined>(
    ACTION_NOTIFY)

};
export type AcceptedActions = ActionsUnion<typeof AppActions>;
