export type DeviceDataKind = DimmingLightData | SwitchLightData;
export interface DeviceData {
    id: string;
    name: string;
    label: string;
}
export interface DimmingLightData extends DeviceData {
    kind: "DimmingLightData";
    attributes: DeviceAttributes[];
}
export interface SwitchLightData extends DeviceData {
    kind: "SwitchLightData";
    attributes: DeviceAttributes[];
}

export interface DeviceAttributes {
    name: string;
    currentValue: number | string;
    dataType: string;
}