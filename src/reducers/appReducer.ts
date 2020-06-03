import { ApplicationState } from "models/applicationState";
import {
  AcceptedActions,
  ACTION_SAVE_DEVICE,
  ACTION_INIT_DEVICE,
  ACTION_SET_TEMPERATURE_MODE,
  ACTION_SET_OUTSIDE_WEATHER,
} from "actions/appActions";
import { getDeviceType } from "logics/attributeLogics";
import { Mode } from "../models/mode";

export const initialState: ApplicationState = {
  devices: {},
  dimmingDialogOpen: false,
  mode: Mode.DEVICES,
  weather: undefined

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
      newState.mode = action.payload;
      return newState;
    }
    case ACTION_SET_OUTSIDE_WEATHER: {
      const newState = { ...state };
      newState.weather = action.payload;
      return newState;
    }
    default:
      return assertActionInReducer(action);
  }
}

function assertActionInReducer(x: never): never {
  throw new Error("Action missing in the reducer");
}
