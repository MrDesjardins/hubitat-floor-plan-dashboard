import { ApplicationState } from "../Models/ApplicationState";
import {
    DimmingLightDevice,
    DeviceType,
    DeviceDataKind,
    LightSwitchDevice,
    ContactDevice,
    MotionDevice,
    TvDevice,
    WashingMachineDevice,
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
                attributes: {},
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
                attributes: {},
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
                attributes: {},
                component: device.component,
                note: device.note,
                position: device.position,
                direction: device.direction,
                radius: device.radius,
                wattThreashold: device.wattThreashold,
            };
            return unk;
        } else if (device.kind === "WASHINGMACHINE") {
            const unk: WashingMachineDevice = {
                kind: device.kind,
                id: device.id,
                name: device.name,
                label: device.label,
                attributes: {},
                component: device.component,
                note: device.note,
                position: device.position,

                width: device.width,
            };
            return unk;
        } else {
            const unk: DeviceDataKind = {
                kind: device.kind,
                id: device.id,
                name: device.name,
                label: device.label,
                attributes: {},
                component: device.component,
                note: device.note,
                position: device.position,
            };
            return unk;
        }
    }
    return specificdevice;
};

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
    device: DimmingLightDevice | LightSwitchDevice
): boolean => {
    return device.attributes["switch"] === "on";
};

export const setLightOnOffAttribute = (
    device: DimmingLightDevice | LightSwitchDevice,
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
