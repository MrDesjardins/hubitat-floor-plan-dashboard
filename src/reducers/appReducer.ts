import { ApplicationState } from "../Models/ApplicationState";
import {
    AcceptedActions,
    ACTION_OPENCLOSE_DIMMING_DIALOG,
    ACTION_SAVE_DIMMING,
    ACTION_INIT_DEVICE
} from "../actions/appActions";

export const initialState: ApplicationState = {
    dimmers: {},
    dimmingDialogOpen: false
};
export function appReducer(
    state: ApplicationState,
    action: AcceptedActions
): ApplicationState {
    switch (action.type) {
        case ACTION_INIT_DEVICE: {
            const newState = { ...state };
            newState.dimmers = { ...state.dimmers };
            newState.dimmers[action.payload.id] = action.payload.jsonPayload;
            return newState;
        }
        case ACTION_SAVE_DIMMING: {
            const newState = { ...state };
            newState.dimmers = { ...state.dimmers };
            if (newState.dimmers[action.payload.deviceId] !== undefined) {
                newState.dimmers[action.payload.deviceId] = {
                    ...newState.dimmers[action.payload.deviceId]
                };
                newState.dimmers[
                    action.payload.deviceId
                ].attributes = state.dimmers[
                    action.payload.deviceId
                ].attributes.slice();
            } else {
                newState.dimmers[action.payload.deviceId] = {
                    kind: "DimmingLightData",
                    id: action.payload.deviceId + "",
                    name: "",
                    attributes: [],
                    label: ""
                };
            }

            const att1 = newState.dimmers[
                action.payload.deviceId
            ].attributes.find(p => p.name === "level");
            if (att1) {
                att1.currentValue = action.payload.level;
            }

            const att2 = newState.dimmers[
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
