import { DeviceDataKind } from "./devices";
import { Weather } from "./weather";
import { Mode } from "./mode";
import { AlarmAction } from "./alarm";
import { Feedback } from "./feedback";
import { DictionaryOf } from "../commons/dictionaryOf";

export interface ApplicationState {
  devices: DictionaryOf<DeviceDataKind>;
  dimmingDialogOpen: boolean;
  mode: Mode;
  weather: Weather | undefined;
  alarmAction: AlarmAction;
  previousAlarmAction: AlarmAction;
  feedback: Feedback | undefined;
  redrawCounter: number;
}
