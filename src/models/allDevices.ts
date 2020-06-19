import { DeviceDataKind, ContactDirection, TvDirection } from "./devices";
import { WEST_WALL, NORTH_WALL, TEXT_PADDING } from "../constants";

export const allDevices: { [deviceId: string]: DeviceDataKind } = {
  "27": {
    id: "27",
    kind: "CONTACT",
    note: "Master Closet Door",
    textPosition: [
      WEST_WALL + 171 + TEXT_PADDING,
      NORTH_WALL + 250 + TEXT_PADDING,
    ],
    direction: ContactDirection.West,
    attributes: {},
    label: "",
    name: "",
  },
  "67": {
    id: "67",
    kind: "CONTACT",
    note: "Outside Garage Door",
    textPosition: [
      WEST_WALL + 2 + TEXT_PADDING,
      NORTH_WALL + 335 + TEXT_PADDING,
    ],
    direction: ContactDirection.West,
    attributes: {},
    label: "",
    name: "",
  },
  "32": {
    id: "32",
    kind: "CONTACT",
    note: "Indoor Garage Door",
    textPosition: [
      WEST_WALL + 260 + TEXT_PADDING,
      NORTH_WALL + 320 + TEXT_PADDING,
    ],
    direction: ContactDirection.East,
    attributes: {},
    label: "",
    name: "",
  },
  "31": {
    id: "31",
    kind: "CONTACT",
    note: "Front Door",
    textPosition: [
      WEST_WALL + 270 + TEXT_PADDING,
      NORTH_WALL + 353 + TEXT_PADDING,
    ],
    direction: ContactDirection.South,
    attributes: {},
    label: "",
    name: "",
  },
  "38": {
    id: "38",
    kind: "CONTACT",
    note: "Alicia Bedroom Window",
    textPosition: [WEST_WALL + 44 + TEXT_PADDING, NORTH_WALL + TEXT_PADDING],
    direction: ContactDirection.SlideRight,
    attributes: {},
    label: "",
    name: "",
  },
  "40": {
    id: "41",
    kind: "CONTACT",
    note: "Playroom Bedroom Window",
    textPosition: [WEST_WALL + 298 + TEXT_PADDING, NORTH_WALL + TEXT_PADDING],
    direction: ContactDirection.SlideRight,
    attributes: {},
    label: "",
    name: "",
  },
  "41": {
    id: "41",
    kind: "CONTACT",
    note: "Jacob Bedroom Window",
    textPosition: [WEST_WALL + 168 + TEXT_PADDING, NORTH_WALL + TEXT_PADDING],
    direction: ContactDirection.SlideRight,
    attributes: {},
    label: "",
    name: "",
  },
  "227": {
    id: "227",
    kind: "CONTACT",
    note: "Living Room Left Window",
    textPosition: [
      WEST_WALL + 348 + TEXT_PADDING,
      NORTH_WALL + 384 + TEXT_PADDING,
    ],
    direction: ContactDirection.SlideRight,
    attributes: {},
    label: "",
    name: "",
  },
  "226": {
    id: "226",
    kind: "CONTACT",
    note: "Living Room Right Window",
    textPosition: [
      WEST_WALL + 438 + TEXT_PADDING,
      NORTH_WALL + 384 + TEXT_PADDING,
    ],
    direction: ContactDirection.SlideLeft,
    attributes: {},
    label: "",
    name: "",
  },
  "68": {
    id: "68",
    kind: "CONTACT",
    note: "Master Bedroom Left Window",
    textPosition: [
      WEST_WALL + 2 + TEXT_PADDING,
      NORTH_WALL + 255 + TEXT_PADDING,
    ],
    direction: ContactDirection.SlideDown,
    attributes: {},
    label: "",
    name: "",
  },
  "18": {
    id: "18",
    kind: "CONTACT",
    note: "Kitchen Door",
    textPosition: [
      WEST_WALL + 516 + TEXT_PADDING,
      NORTH_WALL + 28 + TEXT_PADDING,
    ],
    direction: ContactDirection.SlideDown,
    attributes: {},
    label: "",
    name: "",
  },
  "321": {
    id: "321",
    kind: "DEADBOLT",
    note: "Front Door Deadbolt",
    textPosition: [WEST_WALL + 272, NORTH_WALL + 400],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 226,
      y1: NORTH_WALL + 375,
      x2: WEST_WALL + 270,
      y2: NORTH_WALL + 410,
    },
  },
  "322": {
    id: "322",
    kind: "DEADBOLT",
    note: "Garage Indoor Deadbolt",
    textPosition: [WEST_WALL + 225, NORTH_WALL + 320],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 180,
      y1: NORTH_WALL + 298,
      x2: WEST_WALL + 223,
      y2: NORTH_WALL + 350,
    },
  },
  "46": {
    id: "46",
    kind: "TV",
    note: "Living Room TV",
    textPosition: [WEST_WALL + 510, NORTH_WALL + 300],
    direction: TvDirection.West,
    radius: [15, 28],
    attributes: {},
    label: "",
    name: "",
    wattThreashold: 10,
  },
  "44": {
    id: "44",
    kind: "TV",
    note: "Computer Monitor",
    textPosition: [WEST_WALL + 370, NORTH_WALL + 350],
    direction: TvDirection.West,
    radius: [10, 15],
    attributes: {},
    label: "",
    name: "",
    wattThreashold: 50,
  },
  "11": {
    id: "11",
    kind: "SWITCH",
    note: "Alicia Ligth",
    textPosition: [WEST_WALL + 75, NORTH_WALL + 86],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 25,
      y1: NORTH_WALL + 40,
      x2: WEST_WALL + 60,
      y2: NORTH_WALL + 90,
    },
  },
  "129": {
    id: "129",
    kind: "DIMMER",
    note: "Bathroom Light",
    textPosition: [WEST_WALL + 210, NORTH_WALL + 190],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 155,
      y1: NORTH_WALL + 150,
      x2: WEST_WALL + 210,
      y2: NORTH_WALL + 200,
    },
  },
  "7": {
    id: "7",
    kind: "SWITCH",
    note: "Garage Light",
    textPosition: [WEST_WALL + 165, NORTH_WALL + 450],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 115,
      y1: NORTH_WALL + 500,
      x2: WEST_WALL + 150,
      y2: NORTH_WALL + 540,
    },
  },
  "3": {
    id: "3",
    kind: "SWITCH",
    note: "Entry",
    textPosition: [WEST_WALL + 288, NORTH_WALL + 305],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 225,
      y1: NORTH_WALL + 250,
      x2: WEST_WALL + 275,
      y2: NORTH_WALL + 332,
    },
  },
  "9": {
    id: "9",
    kind: "SWITCH",
    note: "Jacob",
    textPosition: [WEST_WALL + 178, NORTH_WALL + 80],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 265,
      y1: NORTH_WALL + 30,
      x2: WEST_WALL + 310,
      y2: NORTH_WALL + 75,
    },
  },
  "8": {
    id: "8",
    kind: "SWITCH",
    note: "Playroom Light",
    textPosition: [WEST_WALL + 320, NORTH_WALL + 80],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 470,
      y1: NORTH_WALL - 45,
      x2: WEST_WALL + 500,
      y2: NORTH_WALL + 3,
    },
  },
  "196": {
    id: "196",
    kind: "SWITCH",
    note: "Outside Backyard Light",
    textPosition: [WEST_WALL + 520, NORTH_WALL - 8],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 470,
      y1: NORTH_WALL - 45,
      x2: WEST_WALL + 500,
      y2: NORTH_WALL + 3,
    },
  },
  "194": {
    id: "194",
    kind: "SWITCH",
    note: "OutSide Left Garage Light",
    textPosition: [WEST_WALL - 30, NORTH_WALL + 320],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL - 75,
      y1: NORTH_WALL + 260,
      x2: WEST_WALL - 40,
      y2: NORTH_WALL + 330,
    },
  },
  "1": {
    id: "1",
    kind: "DIMMER",
    note: "Dinning Room Light",
    textPosition: [WEST_WALL + 405, NORTH_WALL + 170],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 350,
      y1: NORTH_WALL + 125,
      x2: WEST_WALL + 410,
      y2: NORTH_WALL + 160,
    },
  },
  "2": {
    id: "2",
    kind: "DIMMER",
    note: "Living Room Light",
    textPosition: [WEST_WALL + 430, NORTH_WALL + 300],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 380,
      y1: NORTH_WALL + 260,
      x2: WEST_WALL + 425,
      y2: NORTH_WALL + 305,
    },
  },
  "4": {
    id: "4",
    kind: "DIMMER",
    note: "Kitchen Light",
    textPosition: [WEST_WALL + 445, NORTH_WALL + 95],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 400,
      y1: NORTH_WALL + 55,
      x2: WEST_WALL + 440,
      y2: NORTH_WALL + 95,
    },
  },
  "73": {
    id: "73",
    kind: "DIMMER",
    note: "Corridor",
    textPosition: [WEST_WALL + 123, NORTH_WALL + 155],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 75,
      y1: NORTH_WALL + 110,
      x2: WEST_WALL + 125,
      y2: NORTH_WALL + 165,
    },
  },
  "385": {
    id: "385",
    kind: "DIMMER",
    note: "Master Bathroom Light",
    textPosition: [WEST_WALL + 12, NORTH_WALL + 200],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL - 40,
      y1: NORTH_WALL + 150,
      x2: WEST_WALL + 14,
      y2: NORTH_WALL + 200,
    },
  },
  "290": {
    id: "290",
    kind: "DIMMER",
    note: "Master Bedroom Light",
    textPosition: [WEST_WALL + 80, NORTH_WALL + 260],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 30,
      y1: NORTH_WALL + 220,
      x2: WEST_WALL + 90,
      y2: NORTH_WALL + 270,
    },
  },
  "13": {
    id: "13",
    kind: "DIMMER",
    note: "Master Walkin Closet",
    textPosition: [WEST_WALL + 210, NORTH_WALL + 280],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 155,
      y1: NORTH_WALL + 220,
      x2: WEST_WALL + 210,
      y2: NORTH_WALL + 265,
    },
  },
  "28": {
    id: "28",
    kind: "MOTION",
    note: "Master Bathroom",
    textPosition: [WEST_WALL + 62, NORTH_WALL + 170],
    path: [
      [WEST_WALL + 10, NORTH_WALL + 170],
      [WEST_WALL + 90, NORTH_WALL + 170],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "16": {
    id: "16",
    kind: "MOTION",
    note: "Garage Motion",
    textPosition: [WEST_WALL + 170, NORTH_WALL + 390],
    path: [
      [WEST_WALL + 190, NORTH_WALL + 477],
      [WEST_WALL + 133, NORTH_WALL + 496],
      [WEST_WALL + 59, NORTH_WALL + 494],
      [WEST_WALL + 167, NORTH_WALL + 490],
      [WEST_WALL + 116, NORTH_WALL + 494],
      [WEST_WALL + 56, NORTH_WALL + 495],
      [WEST_WALL + 174, NORTH_WALL + 555],
      [WEST_WALL + 229, NORTH_WALL + 507],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "29": {
    id: "29",
    kind: "MOTION",
    note: "Corridor Motion",
    textPosition: [WEST_WALL + 250, NORTH_WALL + 120],
    path: [
      [WEST_WALL + 290, NORTH_WALL + 125],
      [WEST_WALL + 205, NORTH_WALL + 125],
      [WEST_WALL + 80, NORTH_WALL + 125],
      [WEST_WALL + 205, NORTH_WALL + 125],
      [WEST_WALL + 290, NORTH_WALL + 125],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "30": {
    id: "30",
    kind: "MOTION",
    note: "Bathroom Motion",
    textPosition: [WEST_WALL + 180, NORTH_WALL + 200],
    path: [
      [WEST_WALL + 221, NORTH_WALL + 140],
      [WEST_WALL + 200, NORTH_WALL + 215],
      [WEST_WALL + 240, NORTH_WALL + 200],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "24": {
    id: "24",
    kind: "MOTION",
    note: "Living Room Motion",
    textPosition: [WEST_WALL + 325, NORTH_WALL + 270],
    path: [
      [WEST_WALL + 295, NORTH_WALL + 180],
      [WEST_WALL + 320, NORTH_WALL + 235],
      [WEST_WALL + 345, NORTH_WALL + 200],
      [WEST_WALL + 375, NORTH_WALL + 215],
      [WEST_WALL + 440, NORTH_WALL + 215],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "451": {
    id: "451",
    kind: "MOTION",
    note: "Master Closet Motion",
    textPosition: [WEST_WALL + 180, NORTH_WALL + 295],
    path: [
      [WEST_WALL + 195, NORTH_WALL + 285],
      [WEST_WALL + 220, NORTH_WALL + 245],
      [WEST_WALL + 240, NORTH_WALL + 265],
      [WEST_WALL + 210, NORTH_WALL + 280],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "449": {
    id: "449",
    kind: "MOTION",
    note: "Kitchen Motion",
    textPosition: [WEST_WALL + 460, NORTH_WALL + 130],
    path: [
      [WEST_WALL + 425, NORTH_WALL + 40],
      [WEST_WALL + 495, NORTH_WALL + 40],
      [WEST_WALL + 495, NORTH_WALL + 125],
      [WEST_WALL + 425, NORTH_WALL + 125],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "450": {
    id: "450",
    kind: "MOTION",
    note: "Outside Left Garage",
    textPosition: [WEST_WALL - 30, NORTH_WALL + 550],
    path: [
      [WEST_WALL - 24, NORTH_WALL + 400],
      [WEST_WALL - 24, NORTH_WALL + 550],
    ],
    attributes: {},
    label: "",
    name: "",
  },
  "25": {
    id: "25",
    kind: "WASHINGMACHINE",
    note: "WashingMachine",
    textPosition: [WEST_WALL + 112, NORTH_WALL + 360],
    width: 30,
    attributes: {},
    label: "",
    name: "",
  },
  "17": {
    id: "17",
    kind: "THERMOSTAT",
    note: "Corridor Thermostat",
    textPosition: [WEST_WALL + 180, NORTH_WALL + 120],
    attributes: {},
    label: "",
    name: "",
  },
  "483": {
    id: "483",
    kind: "AIRPURIFIER",
    note: "Alicia Air Purifier",
    textPosition: [WEST_WALL + 93, NORTH_WALL + 60],
    attributes: {},
    label: "",
    name: "",
    clickingBox: {
      x1: WEST_WALL + 45,
      y1: NORTH_WALL - 22,
      x2: WEST_WALL + 95,
      y2: NORTH_WALL + 40,
    },
  },
  "482": {
    id: "482",
    kind: "PROJECTING_LIGHT",
    note: "Alicia Star Machine",
    textPosition: [WEST_WALL + 10, NORTH_WALL + 100],
    attributes: {},
    label: "",
    name: "",
    box: [WEST_WALL + 10, NORTH_WALL + 20, WEST_WALL + 80, NORTH_WALL + 80],
    type: "stars",
    amount: 12,
    clickingBox: {
      x1: WEST_WALL - 40,
      y1: NORTH_WALL + 60,
      x2: WEST_WALL + 30,
      y2: NORTH_WALL + 90,
    },
  },
  "513": {
    id: "513",
    kind: "VIRTUALKEYPAD",
    note: "Alarm System",
    textPosition: [-100, -100],
    label: "",
    name: "",
    attributes: {},
  },
  "165": {
    id: "165",
    kind: "LEAK_SENSOR",
    note: "Dishwasher Leak Sensor",
    textPosition: [500, 35],
    label: "",
    name: "",
    attributes: {},
  },
  "163": {
    id: "163",
    kind: "LEAK_SENSOR",
    note: "Garage Leak Sensor",
    textPosition: [90, 350],
    label: "",
    name: "",
    attributes: {},
  },
  "164": {
    id: "164",
    kind: "LEAK_SENSOR",
    note: "Kitchen Sink Leak Sensor",
    textPosition: [430, 35],
    label: "",
    name: "",
    attributes: {},
  },
  "166": {
    id: "166",
    kind: "LEAK_SENSOR",
    note: "Master Bathroom Leak Sensor",
    textPosition: [50, 180],
    label: "",
    name: "",
    attributes: {},
  },
};
