import { DeviceDataKind } from "./Devices";
import { Dimmer } from "../DeviceComponents/Dimmer";
import { LightSwitch } from "../DeviceComponents/LightSwitch";
import { Contact, ContactDirection } from "../DeviceComponents/Contact";
import { Motion } from "../DeviceComponents/Motion";

export const allDevices: DeviceDataKind[] = [
    // {
    //     id: "1",
    //     kind: "DIMMER",
    //     component: Dimmer,
    //     note: "Dinning Room Light",
    //     position: [520, 320],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "2",
    //     kind: "DIMMER",
    //     component: Dimmer,
    //     note: "Living Room Light",
    //     position: [565, 440],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "4",
    //     kind: "DIMMER",
    //     component: Dimmer,
    //     note: "Kitchen Room Light",
    //     position: [585, 175],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "73",
    //     kind: "DIMMER",
    //     component: Dimmer,
    //     note: "Corridor",
    //     position: [220, 210],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "11",
    //     kind: "SWITCH",
    //     component: LightSwitch,
    //     note: "Alicia",
    //     position: [130, 135],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "129",
    //     kind: "DIMMER",
    //     component: Dimmer,
    //     note: "Bathroom",
    //     position: [310, 300],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "7",
    //     kind: "SWITCH",
    //     component: LightSwitch,
    //     note: "Garage",
    //     position: [220, 600],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "3",
    //     kind: "SWITCH",
    //     component: LightSwitch,
    //     note: "Entry",
    //     position: [390, 450],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "9",
    //     kind: "SWITCH",
    //     component: LightSwitch,
    //     note: "Jacob",
    //     position: [295, 135],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "8",
    //     kind: "SWITCH",
    //     component: LightSwitch,
    //     note: "Playroom",
    //     position: [450, 135],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "130",
    //     kind: "DIMMER",
    //     component: Dimmer,
    //     note: "Master Bathroom",
    //     position: [100, 280],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "131",
    //     kind: "DIMMER",
    //     component: Dimmer,
    //     note: "Master Bedroom",
    //     position: [160, 375],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "13",
    //     kind: "DIMMER",
    //     component: Dimmer,
    //     note: "Master Walkin Closet",
    //     position: [310, 375],
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "67",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Outside Garage Door",
    //     position: [65, 500],
    //     direction: ContactDirection.East,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "197",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Indoor Garage Door",
    //     position: [367, 475],
    //     direction: ContactDirection.East,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "31",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Front Door",
    //     position: [375, 522],
    //     direction: ContactDirection.South,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "27",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Master Closet Door",
    //     position: [263, 388],
    //     direction: ContactDirection.East,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "38",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Alicia Bedroom Window",
    //     position: [115, 64],
    //     direction: ContactDirection.SlideRight,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "227",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Living Room Left Window",
    //     position: [468, 562],
    //     direction: ContactDirection.SlideRight,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "226",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Living Room Right Window",
    //     position: [572, 562],
    //     direction: ContactDirection.SlideLeft,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "227",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Living Room Left Window",
    //     position: [468, 562],
    //     direction: ContactDirection.SlideRight,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "226",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Living Room Right Window",
    //     position: [572, 562],
    //     direction: ContactDirection.SlideLeft,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "18",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Kitchen Door",
    //     position: [665, 100],
    //     direction: ContactDirection.SlideDown,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    // {
    //     id: "68",
    //     kind: "CONTACT",
    //     component: Contact,
    //     note: "Master Bedroom Left Window",
    //     position: [65, 399],
    //     direction: ContactDirection.SlideUp,
    //     attributes: [],
    //     label: "",
    //     name: ""
    // },
    {
        id: "30",
        kind: "MOTION",
        component: Motion,
        note: "Bathroom Motion",
        position: [286, 263],
        path: [
            [322, 249],
            [302, 292],
            [318, 328],
            [344, 297],
        ],
        attributes: [],
        label: "",
        name: "",
    },
];
