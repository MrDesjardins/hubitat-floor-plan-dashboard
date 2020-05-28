import { DeviceDataKind } from "./devices";
import { DictionaryOf } from "commons/dictionaryOf";

export interface ApplicationState {
  devices: DictionaryOf<DeviceDataKind>;
  dimmingDialogOpen: boolean;
  isTemperatureModeOn: boolean;
}
