import { ApplicationState } from "../Models/ApplicationState";
import {
    AcceptedActions,
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
            if (newState.devices[action.payload.id] !== undefined) {
                newState.devices[action.payload.id] = {
                    ...newState.devices[action.payload.id],
                };
                newState.devices[action.payload.id].kind = getDeviceType(
                    action.payload.id
                );
                newState.devices[action.payload.id].attributes = {
                    ...state.devices[action.payload.id].attributes,
                    ...action.payload.attributes,
                };

                return { ...newState };
            }
            return state;
        }
        default:
            return assertActionInReducer(action);
    }
}

function assertActionInReducer(x: never): never {
    throw new Error("Action missing in the reducer");
}
