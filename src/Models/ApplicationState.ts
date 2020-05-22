import { DeviceDataKind } from "./devices";
import { DictionaryOf } from "../Commons/dictionaryOf";


export interface ApplicationState {
  devices: DictionaryOf<DeviceDataKind>;
  dimmingDialogOpen: boolean;
  isTemperatureModeOn: boolean;
}
