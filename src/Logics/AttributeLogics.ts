import { ApplicationState } from "../Models/ApplicationState";
import { DimmingLightData } from "../Models/DimmingLight";

export const getDevice = (
    state: ApplicationState,
    deviceId: number
): DimmingLightData => {
    let level = state.dimmers[deviceId];
    if (level === undefined) {
        level = {
            kind:"DimmingLightData",
            id: "",
            name: "",
            label: "",
            attributes: []
        };
    }
    return level;
};

export const getDimmerLightLevel = (device: DimmingLightData): number => {
    const levelAttribute = device.attributes.find(p => p.name === "level");
    if (levelAttribute === undefined) {
        return 0;
    }
    const level = Number(levelAttribute?.currentValue);
    return level;
};

export const setDimmerLightLevel = (
    device: DimmingLightData,
    level: number
): void => {
    const levelAttr = device.attributes.find(p => p.name === "level");
    if (levelAttr !== undefined) {
        levelAttr.currentValue = level;
    }
};

export const getDimmerOnOff = (device: DimmingLightData): boolean => {
    const attr = device.attributes.find(p => p.name === "switch");
    if (attr === undefined) {
        return false;
    }
    return attr?.currentValue === "on";
};

export const setDimmerOnOff = (
    device: DimmingLightData,
    isOn: boolean
): void => {
    const levelAttr = device.attributes.find(p => p.name === "switch");
    if (levelAttr !== undefined) {
        levelAttr.currentValue = isOn ? "on" : "off";
    }
};

export const getDeviceType = (deviceName: string) => {
    if (deviceName.indexOf("Zooz Central Scene Dimmer") === 0) {
        return "DIMMER";
    }

    throw Error("device name cannot extract a type");
};
