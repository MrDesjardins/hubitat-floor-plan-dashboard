import {
    createActionPayload,
    ActionsUnion,
} from "../infrastructure/ReducerActions";
import { DeviceDataKind, DeviceData } from "../Models/Devices";

export const ACTION_INIT_DEVICE = "ACTION_INIT_DEVICE";
export const ACTION_SAVE_DEVICE = "ACTION_SAVE_DEVICE";

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
};
export type AcceptedActions = ActionsUnion<typeof AppActions>;
