import { ApplicationState } from "../Models/ApplicationState";
import {
    AcceptedActions,
    ACTION_OPENCLOSE_DIMMING_DIALOG,
    ACTION_SAVE_DEVICE,
    ACTION_INIT_DEVICE
} from "../actions/appActions";
import { getDeviceType } from "../Logics/AttributeLogics";

export const initialState: ApplicationState = {
    devices: {},
    dimmingDialogOpen: false
};
export function appReducer(
    state: ApplicationState,
    action: AcceptedActions
): ApplicationState {
    switch (action.type) {
        case ACTION_INIT_DEVICE: {
            const newState = { ...state };
            newState.devices = { ...state.devices };
            newState.devices[action.payload.id] = action.payload.data;
            return newState;
        }
        case ACTION_SAVE_DEVICE: {
            const newState = { ...state };
            newState.devices = { ...state.devices };
            if (newState.devices[action.payload.deviceId] !== undefined) {
                newState.devices[action.payload.deviceId] = {
                    ...newState.devices[action.payload.deviceId],
                    kind: getDeviceType(action.payload.deviceId)
                };
                newState.devices[
                    action.payload.deviceId
                ].attributes = state.devices[
                    action.payload.deviceId
                ].attributes.slice();
            } else {
                newState.devices[action.payload.deviceId] = {
                    kind: "UNKNOWN",
                    id: action.payload.deviceId + "",
                    name: "",
                    attributes: [],
                    label: ""
                };
            }

            const att1 = newState.devices[
                action.payload.deviceId
            ].attributes.find(p => p.name === "level");
            if (att1) {
                att1.currentValue = action.payload.level;
            }

            const att2 = newState.devices[
                action.payload.deviceId
            ].attributes.find(p => p.name === "switch");
            if (att2) {
                att2.currentValue = action.payload.isLightOn ? "on" : "false";
            }
            return { ...newState };
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
