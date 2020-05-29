import { DeviceDataKind } from "./devices";
import { DictionaryOf } from "commons/dictionaryOf";
import { Weather } from "./weather";

export interface ApplicationState {
  devices: DictionaryOf<DeviceDataKind>;
  dimmingDialogOpen: boolean;
  isTemperatureModeOn: boolean;
  weather: Weather | undefined;
}
