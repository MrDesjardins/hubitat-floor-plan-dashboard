import { DeviceDataKind } from "./devices";
import { DictionaryOf } from "commons/dictionaryOf";
import { Weather } from "./weather";
import { Mode } from "./mode";
import { AlarmAction } from "./alarm";

export interface ApplicationState {
  devices: DictionaryOf<DeviceDataKind>;
  dimmingDialogOpen: boolean;
  mode: Mode;
  weather: Weather | undefined;
  alarmAction: AlarmAction;
  previousAlarmAction: AlarmAction;
}
