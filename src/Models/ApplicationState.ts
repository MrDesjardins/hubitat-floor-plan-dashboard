import {  DeviceDataKind } from "./DeviceData";

export interface ApplicationState {
    devices: { [id: string]: DeviceDataKind };
    dimmingDialogOpen: boolean;
}
