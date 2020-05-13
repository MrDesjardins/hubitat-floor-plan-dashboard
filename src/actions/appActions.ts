import {
  createActionPayload,
  ActionsUnion,
} from "../infrastructure/ReducerActions";
import { DeviceDataKind } from "../Models/Devices";

export const ACTION_INIT_DEVICE = "ACTION_INIT_DEVICE";
export const ACTION_SAVE_DEVICE = "ACTION_SAVE_DEVICE";
export const ACTION_SET_TEMPERATURE_MODE = "ACTION_SET_TEMPERATURE_MODE";

export interface InitData {
  device: DeviceDataKind;
}
export const AppActions = {
  initDevice: createActionPayload<typeof ACTION_INIT_DEVICE, InitData>(
    ACTION_INIT_DEVICE
  ),
  saveDevice: createActionPayload<typeof ACTION_SAVE_DEVICE, DeviceDataKind>(
    ACTION_SAVE_DEVICE
  ),
  setTemperatureMode: createActionPayload<
    typeof ACTION_SET_TEMPERATURE_MODE,
    boolean
  >(ACTION_SET_TEMPERATURE_MODE),
};
export type AcceptedActions = ActionsUnion<typeof AppActions>;
