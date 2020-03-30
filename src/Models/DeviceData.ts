export type DeviceType = "UNKNOWN" | "DIMMER" | "SWITCH" | "CONTACT";

export type DeviceDataKind =
    | UnknownDevice
    | DimmingLightDevice
    | LightSwitchDevice
    | ContactDevice;
export interface DeviceData {
    kind: DeviceType;
    id: string;
    name: string;
    label: string;
    attributes: DeviceAttributes[];
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
}

export interface DeviceAttributes {
    name: string;
    currentValue: number | string;
    dataType: string;
}
