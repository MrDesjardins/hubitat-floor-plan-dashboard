export type DeviceType = "UNKNOWN" | "DIMMER" | "SWITCH";

export type DeviceDataKind =
    | UnknownDevice
    | DimmingLightDevice
    | LightSwitchDevice;
export interface DeviceData {
    kind: DeviceType;
    id: string;
    name: string;
    label: string;
}
export interface UnknownDevice extends DeviceData {
    kind: "UNKNOWN";
    attributes: DeviceAttributes[];
}
export interface DimmingLightDevice extends DeviceData {
    kind: "DIMMER";
    attributes: DeviceAttributes[];
}
export interface LightSwitchDevice extends DeviceData {
    kind: "SWITCH";
    attributes: DeviceAttributes[];
}

export interface DeviceAttributes {
    name: string;
    currentValue: number | string;
    dataType: string;
}
