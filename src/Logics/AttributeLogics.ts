import { ApplicationState } from "../Models/ApplicationState";
import {
    DimmingLightDevice,
    DeviceType,
    DeviceDataKind,
    LightSwitchDevice,
    ContactDevice,
    MotionDevice,
    TvDevice,
} from "../Models/Devices";
import { allDevices } from "../Models/AllDevices";
import { ContactDirection } from "../DeviceComponents/Contact";

export const getDevice = (
    state: ApplicationState,
    device: DeviceDataKind
): DeviceDataKind => {
    let specificdevice = state.devices[device.id];
    if (specificdevice === undefined) {
        if (device.kind === "CONTACT") {
            const unk: ContactDevice = {
                kind: device.kind,
                id: device.id,
                name: device.name,
                label: device.label,
                attributes: [],
                component: device.component,
                note: device.note,
                position: device.position,
                direction: ContactDirection.East,
            };
            return unk;
        } else if (device.kind === "MOTION") {
            const unk: MotionDevice = {
                kind: device.kind,
                id: device.id,
                name: device.name,
                label: device.label,
                attributes: [],
                component: device.component,
                note: device.note,
                position: device.position,
                path: [],
            };
            return unk;
        } else if (device.kind === "TV") {
            const unk: TvDevice = {
                kind: device.kind,
                id: device.id,
                name: device.name,
                label: device.label,
                attributes: [],
                component: device.component,
                note: device.note,
                position: device.position,
                direction: device.direction,
                radius: device.radius,
            };
            return unk;
        } else {
            const unk: DeviceDataKind = {
                kind: device.kind,
                id: device.id,
                name: device.name,
                label: device.label,
                attributes: [],
                component: device.component,
                note: device.note,
                position: device.position,
            };
            return unk;
        }
    }
    return specificdevice;
};

export const getDimmerLightLevel = (device: DimmingLightDevice): number => {
    const levelAttribute = device.attributes.find((p) => p.name === "level");
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
    const levelAttr = device.attributes.find((p) => p.name === "level");
    if (levelAttr !== undefined) {
        levelAttr.currentValue = level;
    }
};

export const getDimmerOnOff = (
    device: DimmingLightDevice | LightSwitchDevice
): boolean => {
    const attr = device.attributes.find((p) => p.name === "switch");
    if (attr === undefined) {
        return false;
    }
    return attr?.currentValue === "on";
};

export const setLightOnOff = (
    device: DimmingLightDevice | LightSwitchDevice,
    isOn: boolean
): void => {
    const levelAttr = device.attributes.find((p) => p.name === "switch");
    if (levelAttr !== undefined) {
        levelAttr.currentValue = isOn ? "on" : "off";
    }
};

export const getContactOnOff = (device: ContactDevice): boolean => {
    const attr = device.attributes.find((p) => p.name === "contact");
    if (attr === undefined) {
        return false;
    }
    return attr?.currentValue === "open";
};

export const setContactOnOff = (
    device: ContactDevice,
    isOpen: boolean
): void => {
    const levelAttr = device.attributes.find((p) => p.name === "contact");
    if (levelAttr !== undefined) {
        levelAttr.currentValue = isOpen ? "open" : "closed";
    }
};

export const getDeviceType = (deviceId: string): DeviceType => {
    const c = allDevices.find((d) => d.id === deviceId);
    if (c === undefined) {
        return "UNKNOWN";
    } else {
        return c.kind;
    }
};

export const getMotionOnOff = (device: MotionDevice): boolean => {
    const attr = device.attributes.find((p) => p.name === "motion");
    if (attr === undefined) {
        return false;
    }
    return attr?.currentValue === "active";
};

export const getPowerOn = (
    device: TvDevice,
    minimumPowerEnergyThreshold: number
): boolean => {
    const attr = device.attributes.find((p) => p.name === "power");
    if (attr === undefined) {
        return false;
    }
    return Number(attr?.currentValue) >= minimumPowerEnergyThreshold;
};
