export enum TvDirection {
  East,
  West,
  North,
  South
}

export interface Coordinate {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type DeviceType =
  | "UNKNOWN"
  | "DIMMER"
  | "SWITCH"
  | "CONTACT"
  | "MOTION"
  | "TV"
  | "PROJECTING_LIGHT"
  | "AIRPURIFIER"
  | "WASHINGMACHINE"
  | "DEADBOLT"
  | "THERMOSTAT"
  | "VIRTUALKEYPAD";

export type DeviceDataKind =
  | UnknownDevice
  | DimmingLightDevice
  | LightSwitchDevice
  | ContactDevice
  | MotionDevice
  | TvDevice
  | ProjectingLightDevice
  | AirPurifierDevice
  | WashingMachineDevice
  | ThermostatDevice
  | DeadboltDevice
  | VirtualKeyPadDevice
export interface DeviceData {
  kind: DeviceType;
  id: string;
  name: string;
  label: string;
  attributes: { [key: string]: string };

  note: string; // For me
  textPosition: [number, number];
  clickingBox?: Coordinate;
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
export interface ThermostatDevice extends DeviceData {
  kind: "THERMOSTAT";
}

export interface VirtualKeyPadDevice extends DeviceData {
  kind: "VIRTUALKEYPAD";
}
export interface TemperatureDevice extends ThermostatDevice { }

export interface ContactDevice extends DeviceData {
  kind: "CONTACT";
  direction: ContactDirection;
}

export interface MotionDevice extends DeviceData {
  kind: "MOTION";
  path: number[][];
}
export interface AirPurifierDevice extends DeviceData {
  kind: "AIRPURIFIER";
}
export interface WashingMachineDevice extends DeviceData {
  kind: "WASHINGMACHINE";
  width: number;
}
export interface ProjectingLightDevice extends DeviceData {
  kind: "PROJECTING_LIGHT";
  box: [number, number, number, number];
  type: "stars";
  amount: number;
}

export interface TvDevice extends DeviceData {
  kind: "TV";
  direction: TvDirection;
  radius: [number, number];
  wattThreashold: number;
}

export interface DeadboltDevice extends DeviceData {
  kind: "DEADBOLT";
}

export interface DeviceAttributes {
  name: string;
  currentValue: number | string;
  dataType: string;
}

export interface DeviceWebsocket {
  name: string;
  value: string;
  displayName: string;
  deviceId: string;
  descriptionText: string;
  unit: string;
  data: {};
}

export enum ContactDirection {
  North,
  South,
  East,
  West,
  SlideDown,
  SlideUp,
  SlideRight,
  SlideLeft,
}
