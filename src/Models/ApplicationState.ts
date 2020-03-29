import { DimmingLightData } from "./DimmingLight";

export interface ApplicationState {
    dimmers: { [id: number]: DimmingLightData };
    dimmingDialogOpen: boolean;
}
