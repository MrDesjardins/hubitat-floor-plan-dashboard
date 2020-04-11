import { ApplicationState } from "../Models/ApplicationState";
import {
    AcceptedActions,
    ACTION_OPENCLOSE_DIMMING_DIALOG,
    ACTION_SAVE_DEVICE,
    ACTION_INIT_DEVICE,
} from "../actions/appActions";
import { getDeviceType } from "../Logics/AttributeLogics";

export const initialState: ApplicationState = {
    devices: {},
    dimmingDialogOpen: false,
};
export function appReducer(
    state: ApplicationState,
    action: AcceptedActions
): ApplicationState {
    switch (action.type) {
        case ACTION_INIT_DEVICE: {
            const newState = { ...state };
            newState.devices = { ...newState.devices };
            newState.devices[action.payload.device.id + ""] =
                action.payload.device;
            return newState;
        }
        case ACTION_SAVE_DEVICE: {
            const newState = { ...state };
            newState.devices = { ...state.devices };
            if (newState.devices[action.payload.deviceId] !== undefined) {
                newState.devices[action.payload.deviceId] = {
                    ...newState.devices[action.payload.deviceId],
                };
                newState.devices[action.payload.deviceId].kind = getDeviceType(
                    action.payload.deviceId
                );
                newState.devices[action.payload.deviceId].attributes = {
                    ...state.devices[action.payload.deviceId].attributes,
                };

                newState.devices[action.payload.deviceId].attributes["level"] =
                    action.payload.level + "";

                newState.devices[action.payload.deviceId].attributes[
                    "switch"
                ] = action.payload.isLightOn ? "on" : "false";

                return { ...newState };
            }
            return state;
        }
        case ACTION_OPENCLOSE_DIMMING_DIALOG: {
            const newState = { ...state };
            newState.dimmingDialogOpen = action.payload.isOpen;
            return newState;
        }
        default:
            return assertActionInReducer(action);
    }
}

function assertActionInReducer(x: never): never {
    throw new Error("Action missing in the reducer");
}
