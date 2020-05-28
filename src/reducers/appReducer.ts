import { ApplicationState } from "models/applicationState";
import {
  AcceptedActions,
  ACTION_SAVE_DEVICE,
  ACTION_INIT_DEVICE,
  ACTION_SET_TEMPERATURE_MODE,
} from "actions/appActions";
import { getDeviceType } from "logics/attributeLogics";

export const initialState: ApplicationState = {
  devices: {},
  dimmingDialogOpen: false,
  isTemperatureModeOn: false,
};
export function appReducer(
  state: ApplicationState,
  action: AcceptedActions
): ApplicationState {
  switch (action.type) {
    case ACTION_INIT_DEVICE: {
      const newState = { ...state };
      newState.devices = { ...newState.devices };
      action.payload.devices.forEach((dev) => {
        newState.devices[dev.id] = dev;
      });
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
    case ACTION_SET_TEMPERATURE_MODE: {
      const newState = { ...state };
      newState.isTemperatureModeOn = action.payload;
      return newState;
    }
    default:
      return assertActionInReducer(action);
  }
}

function assertActionInReducer(x: never): never {
  throw new Error("Action missing in the reducer");
}
