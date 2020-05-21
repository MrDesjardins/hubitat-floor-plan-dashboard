import { DeviceDataKind } from "./Devices";
import { DictionaryOf } from "../Commons/DictionaryOf";


export interface ApplicationState {
  devices: DictionaryOf<DeviceDataKind>;
  dimmingDialogOpen: boolean;
  isTemperatureModeOn: boolean;
}
