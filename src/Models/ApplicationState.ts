import { DeviceDataKind } from "./Devices";

export interface ApplicationState {
    devices: { [id: string]: DeviceDataKind };
    dimmingDialogOpen: boolean;
    isTemperatureModeOn: boolean;
}
