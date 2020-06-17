import {
  DimmingLightDevice,
  DeviceType,
  LightSwitchDevice,
  ContactDevice,
  MotionDevice,
  TvDevice,
  WashingMachineDevice,
  ProjectingLightDevice,
  AirPurifierDevice,
  DeadboltDevice,
  ThermostatDevice,
  DeviceData,
  VirtualKeyPadDevice,
} from "models/devices";
import { allDevices } from "models/allDevices";

export const getDimmerLightLevelAttribute = (
  device: DimmingLightDevice
): number => {
  const levelAttribute = device.attributes["level"];
  if (levelAttribute === undefined) {
    return 0;
  }
  return Number(device.attributes["level"]);
};

export const setDimmerLightLevelAttribute = (
  device: DimmingLightDevice,
  level: number
): void => {
  device.attributes["level"] = level + "";
};

export const getLightOnOffAttribute = (
  device:
    | DimmingLightDevice
    | LightSwitchDevice
    | ProjectingLightDevice
    | AirPurifierDevice
): boolean => {
  return device.attributes["switch"] === "on";
};

export const setLightOnOffAttribute = (
  device: DimmingLightDevice | LightSwitchDevice | AirPurifierDevice,
  isOn: boolean
): void => {
  device.attributes["switch"] = isOn ? "on" : "off";
};

export const getContactOnOffAttribute = (device: ContactDevice): boolean => {
  return device.attributes["contact"] === "open";
};

export const setContactOnOffAttribute = (
  device: ContactDevice,
  isOpen: boolean
): void => {
  device.attributes["contact"] = isOpen ? "open" : "closed";
};

export const getDeviceType = (deviceId: string): DeviceType => {
  const c = allDevices[deviceId];
  if (c === undefined) {
    return "UNKNOWN";
  } else {
    return c.kind;
  }
};

export const getMotionOnOffAttribute = (device: MotionDevice): boolean => {
  return device.attributes["motion"] === "active";
};

export const getPowerOnAttribute = (
  device: TvDevice | WashingMachineDevice,
  minimumPowerEnergyThreshold: number
): boolean => {
  const attr = device.attributes["power"];
  if (attr === undefined) {
    return false;
  }
  return Number(attr) >= minimumPowerEnergyThreshold;
};

export const getPowerAttribute = (
  device: TvDevice | WashingMachineDevice
): number => {
  const attr = device.attributes["power"];
  if (attr === undefined) {
    return 0;
  }
  return Number(attr);
};
export const getDeadboltLockStatus = (device: DeadboltDevice): boolean => {
  const attr = device.attributes["lock"];
  return attr === "locked";
};

export const getTemperatureAtribute = (device: ThermostatDevice | MotionDevice): number => {
  return Number(device.attributes["temperature"]);
};

export const getHumidityAtribute = (device: MotionDevice): number => {
  return Number(device.attributes["humidity"]);
};

export const getThermostatMode = (device: ThermostatDevice): string => {
  return device.attributes["thermostatMode"];
};

export const setDeadboltAttribute = (
  device: DeadboltDevice,
  isLock: boolean
): void => {
  device.attributes["lock"] = isLock ? "lock" : "unlock";
};

export const getDeadboltAttribute = (device: DeadboltDevice): boolean => {
  return device.attributes["lock"] === "lock";
};

export const getBattery = (device: DeviceData): number => {
  return Number(device.attributes["battery"]);
};

export const getAlarmCodes = (device: VirtualKeyPadDevice): string[] => {
  if (device === undefined) {
    return ["no"];
  } else {
    const objLockCodes = JSON.parse(device.attributes["lockCodes"]) as { [id: number]: { code: string } };
    const arrLockCodes = Object.values(objLockCodes).map(d => d.code) ?? [];
    return arrLockCodes;
  }
};