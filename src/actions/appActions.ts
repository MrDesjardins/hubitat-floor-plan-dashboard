import {
    createActionPayload,
    ActionsUnion
} from "../infrastructure/ReducerActions";
import { DeviceDataKind } from "../Models/Devices";

export const ACTION_INIT_DEVICE = "ACTION_INIT_DEVICE";
export const ACTION_SAVE_DEVICE = "ACTION_SAVE_DEVICE";
export const ACTION_OPENCLOSE_DIMMING_DIALOG =
    "ACTION_OPENCLOSE_DIMMING_DIALOG";
export interface InitData {
    device: DeviceDataKind;
    data: DeviceDataKind;
}
export const AppActions = {
    initDevice: createActionPayload<typeof ACTION_INIT_DEVICE, InitData>(
        ACTION_INIT_DEVICE
    ),
    saveDevice: createActionPayload<
        typeof ACTION_SAVE_DEVICE,
        {
            level: number;
            isLightOn: boolean;
            deviceId: string;
        }
    >(ACTION_SAVE_DEVICE),
    openCloseDimmingDialog: createActionPayload<
        typeof ACTION_OPENCLOSE_DIMMING_DIALOG,
        {
            isOpen: boolean;
            deviceId: number;
        }
    >(ACTION_OPENCLOSE_DIMMING_DIALOG)
};
export type AcceptedActions = ActionsUnion<typeof AppActions>;
