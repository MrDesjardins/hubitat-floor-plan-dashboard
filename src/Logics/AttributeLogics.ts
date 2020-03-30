import { ApplicationState } from "../Models/ApplicationState";
import {
    DimmingLightDevice,
    DeviceType,
    DeviceDataKind,
    LightSwitchDevice,
    ContactDevice
} from "../Models/DeviceData";
import { allDevices } from "../Models/DeviceIds";

export const getDevice = (
    state: ApplicationState,
    deviceId: string,
    deviceType: DeviceType
): DeviceDataKind => {
    let specificdevice = state.devices[deviceId];
    if (specificdevice === undefined) {
        specificdevice = {
            kind: "UNKNOWN",
            id: "",
            name: "",
            label: "",
            attributes: []
        };
    }
    return specificdevice;
};

export const getDimmerLightLevel = (device: DimmingLightDevice): number => {
    const levelAttribute = device.attributes.find(p => p.name === "level");
    if (levelAttribute === undefined) {
        return 0;
    }
    const level = Number(levelAttribute?.currentValue);
    return level;
};

export const setDimmerLightLevel = (
    device: DimmingLightDevice,
    level: number
): void => {
    const levelAttr = device.attributes.find(p => p.name === "level");
    if (levelAttr !== undefined) {
        levelAttr.currentValue = level;
    }
};

export const getDimmerOnOff = (
    device: DimmingLightDevice | LightSwitchDevice
): boolean => {
    const attr = device.attributes.find(p => p.name === "switch");
    if (attr === undefined) {
        return false;
    }
    return attr?.currentValue === "on";
};

export const setLightOnOff = (
    device: DimmingLightDevice | LightSwitchDevice,
    isOn: boolean
): void => {
    const levelAttr = device.attributes.find(p => p.name === "switch");
    if (levelAttr !== undefined) {
        levelAttr.currentValue = isOn ? "on" : "off";
    }
};

export const getContactOnOff = (device: ContactDevice): boolean => {
    const attr = device.attributes.find(p => p.name === "contact");
    if (attr === undefined) {
        return false;
    }
    return attr?.currentValue === "open";
};

export const setContactOnOff = (
    device: ContactDevice,
    isOpen: boolean
): void => {
    const levelAttr = device.attributes.find(p => p.name === "contact");
    if (levelAttr !== undefined) {
        levelAttr.currentValue = isOpen ? "open" : "closed";
    }
};

export const getDeviceType = (deviceId: string): DeviceType => {
    const c = allDevices.find(d => d.deviceId === deviceId);
    if (c === undefined) {
        return "UNKNOWN";
    } else {
        return c.deviceType;
    }
};
