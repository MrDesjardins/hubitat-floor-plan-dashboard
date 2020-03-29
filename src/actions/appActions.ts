import {
    createActionPayload,
    ActionsUnion
} from "../infrastructure/ReducerActions";
import { DimmingLightData } from "../Models/DimmingLight";

export const ACTION_INIT_DEVICE = "ACTION_INIT_DEVICE";
export const ACTION_SAVE_DIMMING = "ACTION_SAVE_DIMMING";
export const ACTION_OPENCLOSE_DIMMING_DIALOG =
    "ACTION_OPENCLOSE_DIMMING_DIALOG";
export const AppActions = {
    initDevice: createActionPayload<
        typeof ACTION_INIT_DEVICE,
        {
            id: number;
            jsonPayload: DimmingLightData;
        }
    >(ACTION_INIT_DEVICE),
    setDimmingValues: createActionPayload<
        typeof ACTION_SAVE_DIMMING,
        {
            level: number;
            isLightOn: boolean;
            deviceId: number;
        }
    >(ACTION_SAVE_DIMMING),
    openCloseDimmingDialog: createActionPayload<
        typeof ACTION_OPENCLOSE_DIMMING_DIALOG,
        {
            isOpen: boolean;
            deviceId: number;
        }
    >(ACTION_OPENCLOSE_DIMMING_DIALOG)
};
export type AcceptedActions = ActionsUnion<typeof AppActions>;
