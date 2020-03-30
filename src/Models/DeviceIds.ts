import { Dimmer } from "../DeviceComponents/Dimmer";
import { DeviceType } from "./DeviceData";
import { LightSwitch } from "../DeviceComponents/LightSwitch";
import { Contact } from "../DeviceComponents/Contact";

export const APP_ID = 98;
export const API_TOKEN = "8b8daecf-02ee-4f3d-8d80-ba4eec2d3ff5";

export interface Device {
    deviceId: string;
    deviceType: DeviceType;
    note: string; // For me
    position: [number, number];
    component: (props: any) => JSX.Element;
}

export const allDevices: Device[] = [
    {
        deviceId: "1",
        deviceType: "DIMMER",
        component: Dimmer,
        note: "Dinning Room Light",
        position: [520, 320]
    },
    {
        deviceId: "2",
        deviceType: "DIMMER",
        component: Dimmer,
        note: "Living Room Light",
        position: [565, 440]
    },
    {
        deviceId: "4",
        deviceType: "DIMMER",
        component: Dimmer,
        note: "Kitchen Room Light",
        position: [585, 175]
    },
    {
        deviceId: "73",
        deviceType: "DIMMER",
        component: Dimmer,
        note: "Corridor",
        position: [220, 210]
    },
    {
        deviceId: "11",
        deviceType: "SWITCH",
        component: LightSwitch,
        note: "Alicia",
        position: [130, 135]
    },
    {
        deviceId: "129",
        deviceType: "DIMMER",
        component: Dimmer,
        note: "Bathroom",
        position: [310, 300]
    },
    {
        deviceId: "7",
        deviceType: "SWITCH",
        component: LightSwitch,
        note: "Garage",
        position: [220, 600]
    },
    {
        deviceId: "3",
        deviceType: "SWITCH",
        component: LightSwitch,
        note: "Entry",
        position: [390, 450]
    },
    {
        deviceId: "9",
        deviceType: "SWITCH",
        component: LightSwitch,
        note: "Jacob",
        position: [295, 135]
    },
    {
        deviceId: "8",
        deviceType: "SWITCH",
        component: LightSwitch,
        note: "Playroom",
        position: [450, 135]
    },
    {
        deviceId: "130",
        deviceType: "DIMMER",
        component: Dimmer,
        note: "Master Bathroom",
        position: [100, 280]
    },
    {
        deviceId: "131",
        deviceType: "DIMMER",
        component: Dimmer,
        note: "Master Bedroom",
        position: [160, 375]
    },
    {
        deviceId: "13",
        deviceType: "DIMMER",
        component: Dimmer,
        note: "Master Walkin Closet",
        position: [310, 375]
    },
    {
        deviceId: "31",
        deviceType: "CONTACT",
        component: Contact,
        note: "Front Door",
        position: [375, 522]
    }
];
