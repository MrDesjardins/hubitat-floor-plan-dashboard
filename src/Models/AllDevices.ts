import { DeviceDataKind } from "./Devices";
import { Dimmer } from "../DeviceComponents/Dimmer";
import { LightSwitch } from "../DeviceComponents/LightSwitch";
import { Contact, ContactDirection } from "../DeviceComponents/Contact";
import { Motion } from "../DeviceComponents/Motion";
import { TvDirection, Tv } from "../DeviceComponents/Tv";
import { WashingMachine } from "../DeviceComponents/WashingMachine";

const NORTH_WALL = 36;
export const allDevices: { [deviceId: string]: DeviceDataKind } = {
  "1": {
    id: "1",
    kind: "DIMMER",
    component: Dimmer,
    note: "Dinning Room Light",
    textPosition: [470, NORTH_WALL + 200],
    attributes: {},
    label: "",
    name: "",
  },
  "2": {
    id: "2",
    kind: "DIMMER",
    component: Dimmer,
    note: "Living Room Light",
    textPosition: [502, NORTH_WALL + 350],
    attributes: {},
    label: "",
    name: "",
  },
  "4": {
    id: "4",
    kind: "DIMMER",
    component: Dimmer,
    note: "Kitchen Room Light",
    textPosition: [522, NORTH_WALL + 80],
    attributes: {},
    label: "",
    name: "",
  },
  "73": {
    id: "73",
    kind: "DIMMER",
    component: Dimmer,
    note: "Corridor",
    textPosition: [157, NORTH_WALL + 150],
    attributes: {},
    label: "",
    name: "",
  },
  "11": {
    id: "11",
    kind: "SWITCH",
    component: LightSwitch,
    note: "Alicia",
    textPosition: [67, NORTH_WALL + 60],
    attributes: {},
    label: "",
    name: "",
  },
  "129": {
    id: "129",
    kind: "DIMMER",
    component: Dimmer,
    note: "Bathroom",
    textPosition: [245, NORTH_WALL + 200],
    attributes: {},
    label: "",
    name: "",
  },
  "7": {
    id: "7",
    kind: "SWITCH",
    component: LightSwitch,
    note: "Garage",
    textPosition: [157, NORTH_WALL + 600],
    attributes: {},
    label: "",
    name: "",
  },
  "3": {
    id: "3",
    kind: "SWITCH",
    component: LightSwitch,
    note: "Entry",
    textPosition: [327, NORTH_WALL + 370],
    attributes: {},
    label: "",
    name: "",
  },
  "9": {
    id: "9",
    kind: "SWITCH",
    component: LightSwitch,
    note: "Jacob",
    textPosition: [232, NORTH_WALL + 60],
    attributes: {},
    label: "",
    name: "",
  },
  "8": {
    id: "8",
    kind: "SWITCH",
    component: LightSwitch,
    note: "Playroom",
    textPosition: [387, NORTH_WALL + 60],
    attributes: {},
    label: "",
    name: "",
  },
  "290": {
    id: "290",
    kind: "DIMMER",
    component: Dimmer,
    note: "Master Bathroom",
    textPosition: [37, NORTH_WALL + 210],
    attributes: {},
    label: "",
    name: "",
  },
  "131": {
    id: "131",
    kind: "DIMMER",
    component: Dimmer,
    note: "Master Bedroom",
    textPosition: [97, NORTH_WALL + 260],
    attributes: {},
    label: "",
    name: "",
  },
  "13": {
    id: "13",
    kind: "DIMMER",
    component: Dimmer,
    note: "Master Walkin Closet",
    textPosition: [245, NORTH_WALL + 335],
    attributes: {},
    label: "",
    name: "",
  },
  "67": {
    id: "67",
    kind: "CONTACT",
    component: Contact,
    note: "Outside Garage Door",
    textPosition: [2, NORTH_WALL + 430],
    direction: ContactDirection.East,
    attributes: {},
    label: "",
    name: "",
  },
  "32": {
    id: "32",
    kind: "CONTACT",
    component: Contact,
    note: "Indoor Garage Door",
    textPosition: [302, NORTH_WALL + 400],
    direction: ContactDirection.East,
    attributes: {},
    label: "",
    name: "",
  },
  "31": {
    id: "31",
    kind: "CONTACT",
    component: Contact,
    note: "Front Door",
    textPosition: [310, NORTH_WALL + 455],
    direction: ContactDirection.South,
    attributes: {},
    label: "",
    name: "",
  },
  "27": {
    id: "27",
    kind: "CONTACT",
    component: Contact,
    note: "Master Closet Door",
    textPosition: [198, NORTH_WALL + 317],
    direction: ContactDirection.East,
    attributes: {},
    label: "",
    name: "",
  },
  "38": {
    id: "38",
    kind: "CONTACT",
    component: Contact,
    note: "Alicia Bedroom Window",
    textPosition: [52, NORTH_WALL],
    direction: ContactDirection.SlideRight,
    attributes: {},
    label: "",
    name: "",
  },
  "227": {
    id: "227",
    kind: "CONTACT",
    component: Contact,
    note: "Living Room Left Window",
    textPosition: [402, NORTH_WALL + 494],
    direction: ContactDirection.SlideRight,
    attributes: {},
    label: "",
    name: "",
  },
  "226": {
    id: "226",
    kind: "CONTACT",
    component: Contact,
    note: "Living Room Right Window",
    textPosition: [507, NORTH_WALL + 494],
    direction: ContactDirection.SlideLeft,
    attributes: {},
    label: "",
    name: "",
  },
  "18": {
    id: "18",
    kind: "CONTACT",
    component: Contact,
    note: "Kitchen Door",
    textPosition: [598, NORTH_WALL + 25],
    direction: ContactDirection.SlideDown,
    attributes: {},
    label: "",
    name: "",
  },
  "68": {
    id: "68",
    kind: "CONTACT",
    component: Contact,
    note: "Master Bedroom Left Window",
    textPosition: [2, NORTH_WALL + 330],
    direction: ContactDirection.SlideUp,
    attributes: {},
    label: "",
    name: "",
  },
  "28": {
    id: "28",
    kind: "MOTION",
    component: Motion,
    note: "Master Bathroom",
    textPosition: [62, NORTH_WALL + 210],
    path: [
      [13, NORTH_WALL + 235],
      [100, NORTH_WALL + 235],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "16": {
    id: "16",
    kind: "MOTION",
    component: Motion,
    note: "Garage Motion",
    textPosition: [281, NORTH_WALL + 490],
    path: [
      [280, NORTH_WALL + 490],
      [230, NORTH_WALL + 505],
      [145, NORTH_WALL + 515],
      [50, NORTH_WALL + 525],
      [170, NORTH_WALL + 510],
      [220, NORTH_WALL + 640],
      [80, NORTH_WALL + 640],
      [175, NORTH_WALL + 505],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "29": {
    id: "29",
    kind: "MOTION",
    component: Motion,
    note: "Corridor Motion",
    textPosition: [220, NORTH_WALL + 165],
    path: [
      [330, NORTH_WALL + 165],
      [255, NORTH_WALL + 165],
      [115, NORTH_WALL + 165],
      [255, NORTH_WALL + 165],
      [330, NORTH_WALL + 165],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "30": {
    id: "30",
    kind: "MOTION",
    component: Motion,
    note: "Bathroom Motion",
    textPosition: [250, NORTH_WALL + 270],
    path: [
      [235, NORTH_WALL + 275],
      [265, NORTH_WALL + 220],
      [220, NORTH_WALL + 225],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "24": {
    id: "24",
    kind: "MOTION",
    component: Motion,
    note: "Dinner Motion",
    textPosition: [412, NORTH_WALL + 200],
    path: [
      [500, NORTH_WALL + 200],
      [545, NORTH_WALL + 265],
      [510, NORTH_WALL + 360],
      [370, NORTH_WALL + 325],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "46": {
    id: "46",
    kind: "TV",
    component: Tv,
    note: "Living Room TV",
    textPosition: [597, NORTH_WALL + 380],
    direction: TvDirection.West,
    radius: [25, 40],
    attributes: {},
    label: "",
    name: "",
    wattThreashold: 10,
  },
  "44": {
    id: "44",
    kind: "TV",
    component: Tv,
    note: "Computer Monitor",
    textPosition: [402, NORTH_WALL + 450],
    direction: TvDirection.West,
    radius: [15, 20],
    attributes: {},
    label: "",
    name: "",
    wattThreashold: 50,
  },
  "25": {
    id: "25",
    kind: "WASHINGMACHINE",
    component: WashingMachine,
    note: "WashingMachine",
    textPosition: [112, NORTH_WALL + 420],
    width: 30,
    attributes: {},
    label: "",
    name: "",
  },
};
