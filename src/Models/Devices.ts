import { ContactDirection } from "../DeviceComponents/Contact";
import { TvDirection } from "../DeviceComponents/Tv";

export type DeviceType =
    | "UNKNOWN"
    | "DIMMER"
    | "SWITCH"
    | "CONTACT"
    | "MOTION"
    | "TV"
    | "WASHINGMACHINE";

export type DeviceDataKind =
    | UnknownDevice
    | DimmingLightDevice
    | LightSwitchDevice
    | ContactDevice
    | MotionDevice
    | TvDevice
    | WashingMachineDevice;
export interface DeviceData {
    kind: DeviceType;
    id: string;
    name: string;
    label: string;
    attributes: DeviceAttributes[];

    note: string; // For me
    position: [number, number];
    component: (props: any) => JSX.Element;
}
export interface UnknownDevice extends DeviceData {
    kind: "UNKNOWN";
}
export interface DimmingLightDevice extends DeviceData {
    kind: "DIMMER";
}
export interface LightSwitchDevice extends DeviceData {
    kind: "SWITCH";
}

export interface ContactDevice extends DeviceData {
    kind: "CONTACT";
    direction: ContactDirection;
}

export interface MotionDevice extends DeviceData {
    kind: "MOTION";
    path: number[][];
}
export interface WashingMachineDevice extends DeviceData {
    kind: "WASHINGMACHINE";
    width: number;
}

export interface TvDevice extends DeviceData {
    kind: "TV";
    direction: TvDirection;
    radius: [number, number];
}

export interface DeviceAttributes {
    name: string;
    currentValue: number | string;
    dataType: string;
}
