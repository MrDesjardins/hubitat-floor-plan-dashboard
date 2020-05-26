import { DeviceDataKind } from "./devices";
import { Dimmer } from "../DeviceComponents/Dimmer";
import { LightSwitch } from "../DeviceComponents/LightSwitch";
import { Contact, ContactDirection } from "../DeviceComponents/Contact";
import { Motion } from "../DeviceComponents/Motion";
import { TvDirection, Tv } from "../DeviceComponents/Tv";
import { WashingMachine } from "../DeviceComponents/WashingMachine";
import { ProjectingLight } from "../DeviceComponents/ProjectingLight";
import { AirPurifier } from "../DeviceComponents/AirPurifier";
import { Deadbolt } from "../DeviceComponents/Deadbolt";
import { Thermostat } from "../DeviceComponents/Thermostat";
import { Temperature } from "../DeviceComponents/Temperature";
import { WEST_WALL, NORTH_WALL, TEXT_PADDING } from "../constants";

// export const allDevices: { [deviceId: string]: DeviceDataKind } = {
//   "1": {
//     id: "1",
//     kind: "DIMMER",
//     component: Dimmer,
//     note: "Dinning Room Light",
//     textPosition: [WEST_WALL + 405, NORTH_WALL + 170],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "2": {
//     id: "2",
//     kind: "DIMMER",
//     component: Dimmer,
//     note: "Living Room Light",
//     textPosition: [WEST_WALL + 430, NORTH_WALL + 300],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "4": {
//     id: "4",
//     kind: "DIMMER",
//     component: Dimmer,
//     note: "Kitchen Light",
//     textPosition: [WEST_WALL + 445, NORTH_WALL + 95],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "73": {
//     id: "73",
//     kind: "DIMMER",
//     component: Dimmer,
//     note: "Corridor",
//     textPosition: [WEST_WALL + 123, NORTH_WALL + 155],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "11": {
//     id: "11",
//     kind: "SWITCH",
//     component: LightSwitch,
//     note: "Alicia Ligth",
//     textPosition: [WEST_WALL + 75, NORTH_WALL + 86],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "129": {
//     id: "129",
//     kind: "DIMMER",
//     component: Dimmer,
//     note: "Bathroom Light",
//     textPosition: [WEST_WALL + 210, NORTH_WALL + 190],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "7": {
//     id: "7",
//     kind: "SWITCH",
//     component: LightSwitch,
//     note: "Garage Light",
//     textPosition: [WEST_WALL + 165, NORTH_WALL + 540],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "3": {
//     id: "3",
//     kind: "SWITCH",
//     component: LightSwitch,
//     note: "Entry",
//     textPosition: [WEST_WALL + 288, NORTH_WALL + 305],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "9": {
//     id: "9",
//     kind: "SWITCH",
//     component: LightSwitch,
//     note: "Jacob",
//     textPosition: [WEST_WALL + 178, NORTH_WALL + 80],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "8": {
//     id: "8",
//     kind: "SWITCH",
//     component: LightSwitch,
//     note: "Playroom Light",
//     textPosition: [WEST_WALL + 320, NORTH_WALL + 80],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "385": {
//     id: "385",
//     kind: "DIMMER",
//     component: Dimmer,
//     note: "Master Bathroom Light",
//     textPosition: [WEST_WALL + 12, NORTH_WALL + 200],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "290": {
//     id: "290",
//     kind: "DIMMER",
//     component: Dimmer,
//     note: "Master Bedroom Light",
//     textPosition: [WEST_WALL + 80, NORTH_WALL + 260],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "13": {
//     id: "13",
//     kind: "DIMMER",
//     component: Dimmer,
//     note: "Master Walkin Closet",
//     textPosition: [WEST_WALL + 210, NORTH_WALL + 280],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "483": {
//     id: "483",
//     kind: "AIRPURIFIER",
//     component: AirPurifier,
//     note: "Alicia Air Purifier",
//     textPosition: [WEST_WALL + 93, NORTH_WALL + 38],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "28": {
//     id: "28",
//     kind: "MOTION",
//     component: Motion,
//     temperatureComponent: Temperature,
//     note: "Master Bathroom",
//     textPosition: [WEST_WALL + 62, NORTH_WALL + 170],
//     path: [
//       [WEST_WALL + 10, NORTH_WALL + 170],
//       [WEST_WALL + 90, NORTH_WALL + 170],
//     ],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "16": {
//     id: "16",
//     kind: "MOTION",
//     component: Motion,
//     temperatureComponent: Temperature,
//     note: "Garage Motion",
//     textPosition: [WEST_WALL + 170, NORTH_WALL + 390],
//     path: [
//       [WEST_WALL + 190, NORTH_WALL + 477],
//       [WEST_WALL + 133, NORTH_WALL + 496],
//       [WEST_WALL + 59, NORTH_WALL + 494],
//       [WEST_WALL + 167, NORTH_WALL + 490],
//       [WEST_WALL + 116, NORTH_WALL + 494],
//       [WEST_WALL + 56, NORTH_WALL + 495],
//       [WEST_WALL + 174, NORTH_WALL + 555],
//       [WEST_WALL + 229, NORTH_WALL + 507],
//     ],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "29": {
//     id: "29",
//     kind: "MOTION",
//     component: Motion,
//     temperatureComponent: Temperature,
//     note: "Corridor Motion",
//     textPosition: [WEST_WALL + 250, NORTH_WALL + 120],
//     path: [
//       [WEST_WALL + 290, NORTH_WALL + 125],
//       [WEST_WALL + 255, NORTH_WALL + 125],
//       [WEST_WALL + 80, NORTH_WALL + 125],
//       [WEST_WALL + 255, NORTH_WALL + 125],
//       [WEST_WALL + 290, NORTH_WALL + 125],
//     ],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "30": {
//     id: "30",
//     kind: "MOTION",
//     component: Motion,
//     temperatureComponent: Temperature,
//     note: "Bathroom Motion",
//     textPosition: [WEST_WALL + 180, NORTH_WALL + 200],
//     path: [
//       [WEST_WALL + 221, NORTH_WALL + 140],
//       [WEST_WALL + 200, NORTH_WALL + 215],
//       [WEST_WALL + 240, NORTH_WALL + 200],
//     ],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "24": {
//     id: "24",
//     kind: "MOTION",
//     component: Motion,
//     temperatureComponent: Temperature,
//     note: "Living Room Motion",
//     textPosition: [WEST_WALL + 325, NORTH_WALL + 270],
//     path: [
//       [WEST_WALL + 295, NORTH_WALL + 180],
//       [WEST_WALL + 320, NORTH_WALL + 235],
//       [WEST_WALL + 345, NORTH_WALL + 200],
//       [WEST_WALL + 375, NORTH_WALL + 215],
//       [WEST_WALL + 440, NORTH_WALL + 215],
//     ],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "451": {
//     id: "451",
//     kind: "MOTION",
//     component: Motion,
//     temperatureComponent: Temperature,
//     note: "Master Closet Motion",
//     textPosition: [WEST_WALL + 180, NORTH_WALL + 295],
//     path: [
//       [WEST_WALL + 195, NORTH_WALL + 285],
//       [WEST_WALL + 220, NORTH_WALL + 245],
//       [WEST_WALL + 240, NORTH_WALL + 265],
//       [WEST_WALL + 210, NORTH_WALL + 280],
//     ],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "449": {
//     id: "449",
//     kind: "MOTION",
//     component: Motion,
//     temperatureComponent: Temperature,
//     note: "Kitchen Motion",
//     textPosition: [WEST_WALL + 460, NORTH_WALL + 130],
//     path: [
//       [WEST_WALL + 425, NORTH_WALL + 40],
//       [WEST_WALL + 495, NORTH_WALL + 40],
//       [WEST_WALL + 495, NORTH_WALL + 125],
//       [WEST_WALL + 425, NORTH_WALL + 125],
//     ],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "46": {
//     id: "46",
//     kind: "TV",
//     component: Tv,
//     note: "Living Room TV",
//     textPosition: [WEST_WALL + 510, NORTH_WALL + 300],
//     direction: TvDirection.West,
//     radius: [15, 28],
//     attributes: {},
//     label: "",
//     name: "",
//     wattThreashold: 10,
//   },
//   "44": {
//     id: "44",
//     kind: "TV",
//     component: Tv,
//     note: "Computer Monitor",
//     textPosition: [WEST_WALL + 370, NORTH_WALL + 350],
//     direction: TvDirection.West,
//     radius: [10, 15],
//     attributes: {},
//     label: "",
//     name: "",
//     wattThreashold: 50,
//   },
//   "25": {
//     id: "25",
//     kind: "WASHINGMACHINE",
//     component: WashingMachine,
//     note: "WashingMachine",
//     textPosition: [WEST_WALL + 112, NORTH_WALL + 330],
//     width: 30,
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "482": {
//     id: "482",
//     kind: "PROJECTING_LIGHT",
//     component: ProjectingLight,
//     note: "Alicia Star Machine",
//     textPosition: [WEST_WALL + 15, NORTH_WALL + 90],
//     attributes: {},
//     label: "",
//     name: "",
//     box: [WEST_WALL + 10, NORTH_WALL + 20, WEST_WALL + 80, NORTH_WALL + 80],
//     type: "stars",
//     amount: 12,
//   },
//   "292": {
//     id: "292",
//     kind: "TV",
//     component: Tv,
//     note: "Garage TV",
//     textPosition: [WEST_WALL + 10, NORTH_WALL + 475],
//     direction: TvDirection.East,
//     radius: [18, 25],
//     attributes: {},
//     label: "",
//     name: "",
//     wattThreashold: 50,
//   },
//   "196": {
//     id: "196",
//     kind: "SWITCH",
//     component: LightSwitch,
//     note: "Outside Backyard Light",
//     textPosition: [WEST_WALL + 520, NORTH_WALL - 8],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "194": {
//     id: "194",
//     kind: "SWITCH",
//     component: LightSwitch,
//     note: "OutSide Left Garage Light",
//     textPosition: [WEST_WALL - 30, NORTH_WALL + 320],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "17": {
//     id: "17",
//     kind: "THERMOSTAT",
//     component: Thermostat,
//     temperatureComponent: Temperature,
//     note: "Corridor Thermostat",
//     textPosition: [WEST_WALL + 180, NORTH_WALL + 120],
//     attributes: {},
//     label: "",
//     name: "",
//   },
//   "450": {
//     id: "450",
//     kind: "MOTION",
//     component: Motion,
//     temperatureComponent: Temperature,
//     note: "Outside Left Garage",
//     textPosition: [WEST_WALL - 20, NORTH_WALL + 570],
//     path: [
//       [WEST_WALL - 24, NORTH_WALL + 400],
//       [WEST_WALL - 24, NORTH_WALL + 600],
//     ],
//     attributes: {},
//     label: "",
//     name: "",
//   },
// };

export const allDevices: { [deviceId: string]: DeviceDataKind } = {
  // "27": {
  //   id: "27",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Master Closet Door",
  //   textPosition: [
  //     WEST_WALL + 171 + TEXT_PADDING,
  //     NORTH_WALL + 250 + TEXT_PADDING,
  //   ],
  //   direction: ContactDirection.West,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "67": {
  //   id: "67",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Outside Garage Door",
  //   textPosition: [
  //     WEST_WALL + 2 + TEXT_PADDING,
  //     NORTH_WALL + 335 + TEXT_PADDING,
  //   ],
  //   direction: ContactDirection.West,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "32": {
  //   id: "32",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Indoor Garage Door",
  //   textPosition: [
  //     WEST_WALL + 260 + TEXT_PADDING,
  //     NORTH_WALL + 320 + TEXT_PADDING,
  //   ],
  //   direction: ContactDirection.East,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "31": {
  //   id: "31",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Front Door",
  //   textPosition: [
  //     WEST_WALL + 270 + TEXT_PADDING,
  //     NORTH_WALL + 353 + TEXT_PADDING,
  //   ],
  //   direction: ContactDirection.South,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "38": {
  //   id: "38",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Alicia Bedroom Window",
  //   textPosition: [WEST_WALL + 44 + TEXT_PADDING, NORTH_WALL + TEXT_PADDING],
  //   direction: ContactDirection.SlideRight,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "40": {
  //   id: "41",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Playroom Bedroom Window",
  //   textPosition: [WEST_WALL + 298 + TEXT_PADDING, NORTH_WALL + TEXT_PADDING],
  //   direction: ContactDirection.SlideRight,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "41": {
  //   id: "41",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Jacob Bedroom Window",
  //   textPosition: [WEST_WALL + 168 + TEXT_PADDING, NORTH_WALL + TEXT_PADDING],
  //   direction: ContactDirection.SlideRight,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "227": {
  //   id: "227",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Living Room Left Window",
  //   textPosition: [
  //     WEST_WALL + 348 + TEXT_PADDING,
  //     NORTH_WALL + 384 + TEXT_PADDING,
  //   ],
  //   direction: ContactDirection.SlideRight,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "226": {
  //   id: "226",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Living Room Right Window",
  //   textPosition: [
  //     WEST_WALL + 438 + TEXT_PADDING,
  //     NORTH_WALL + 384 + TEXT_PADDING,
  //   ],
  //   direction: ContactDirection.SlideLeft,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "68": {
  //   id: "68",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Master Bedroom Left Window",
  //   textPosition: [
  //     WEST_WALL + 2 + TEXT_PADDING,
  //     NORTH_WALL + 255 + TEXT_PADDING,
  //   ],
  //   direction: ContactDirection.SlideDown,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "18": {
  //   id: "18",
  //   kind: "CONTACT",
  //   component: Contact,
  //   note: "Kitchen Door",
  //   textPosition: [
  //     WEST_WALL + 516 + TEXT_PADDING,
  //     NORTH_WALL + 28 + TEXT_PADDING,
  //   ],
  //   direction: ContactDirection.SlideDown,
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "321": {
  //   id: "321",
  //   kind: "DEADBOLT",
  //   component: Deadbolt,
  //   note: "Front Door Deadbolt",
  //   textPosition: [WEST_WALL + 272, NORTH_WALL + 400],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "322": {
  //   id: "322",
  //   kind: "DEADBOLT",
  //   component: Deadbolt,
  //   note: "Garage Indoor Deadbolt",
  //   textPosition: [WEST_WALL + 225, NORTH_WALL + 335],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "46": {
  //   id: "46",
  //   kind: "TV",
  //   component: Tv,
  //   note: "Living Room TV",
  //   textPosition: [WEST_WALL + 510, NORTH_WALL + 300],
  //   direction: TvDirection.West,
  //   radius: [15, 28],
  //   attributes: {},
  //   label: "",
  //   name: "",
  //   wattThreashold: 10,
  // },
  // "44": {
  //   id: "44",
  //   kind: "TV",
  //   component: Tv,
  //   note: "Computer Monitor",
  //   textPosition: [WEST_WALL + 370, NORTH_WALL + 350],
  //   direction: TvDirection.West,
  //   radius: [10, 15],
  //   attributes: {},
  //   label: "",
  //   name: "",
  //   wattThreashold: 50,
  // }, "11": {
  //   id: "11",
  //   kind: "SWITCH",
  //   component: LightSwitch,
  //   note: "Alicia Ligth",
  //   textPosition: [WEST_WALL + 75, NORTH_WALL + 86],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "129": {
  //   id: "129",
  //   kind: "DIMMER",
  //   component: Dimmer,
  //   note: "Bathroom Light",
  //   textPosition: [WEST_WALL + 210, NORTH_WALL + 190],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "7": {
  //   id: "7",
  //   kind: "SWITCH",
  //   component: LightSwitch,
  //   note: "Garage Light",
  //   textPosition: [WEST_WALL + 165, NORTH_WALL + 540],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "3": {
  //   id: "3",
  //   kind: "SWITCH",
  //   component: LightSwitch,
  //   note: "Entry",
  //   textPosition: [WEST_WALL + 288, NORTH_WALL + 305],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "9": {
  //   id: "9",
  //   kind: "SWITCH",
  //   component: LightSwitch,
  //   note: "Jacob",
  //   textPosition: [WEST_WALL + 178, NORTH_WALL + 80],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "8": {
  //   id: "8",
  //   kind: "SWITCH",
  //   component: LightSwitch,
  //   note: "Playroom Light",
  //   textPosition: [WEST_WALL + 320, NORTH_WALL + 80],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "196": {
  //   id: "196",
  //   kind: "SWITCH",
  //   component: LightSwitch,
  //   note: "Outside Backyard Light",
  //   textPosition: [WEST_WALL + 520, NORTH_WALL - 8],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "194": {
  //   id: "194",
  //   kind: "SWITCH",
  //   component: LightSwitch,
  //   note: "OutSide Left Garage Light",
  //   textPosition: [WEST_WALL - 30, NORTH_WALL + 320],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "1": {
  //   id: "1",
  //   kind: "DIMMER",
  //   component: Dimmer,
  //   note: "Dinning Room Light",
  //   textPosition: [WEST_WALL + 405, NORTH_WALL + 170],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "2": {
  //   id: "2",
  //   kind: "DIMMER",
  //   component: Dimmer,
  //   note: "Living Room Light",
  //   textPosition: [WEST_WALL + 430, NORTH_WALL + 300],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "4": {
  //   id: "4",
  //   kind: "DIMMER",
  //   component: Dimmer,
  //   note: "Kitchen Light",
  //   textPosition: [WEST_WALL + 445, NORTH_WALL + 95],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "73": {
  //   id: "73",
  //   kind: "DIMMER",
  //   component: Dimmer,
  //   note: "Corridor",
  //   textPosition: [WEST_WALL + 123, NORTH_WALL + 155],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "385": {
  //   id: "385",
  //   kind: "DIMMER",
  //   component: Dimmer,
  //   note: "Master Bathroom Light",
  //   textPosition: [WEST_WALL + 12, NORTH_WALL + 200],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "290": {
  //   id: "290",
  //   kind: "DIMMER",
  //   component: Dimmer,
  //   note: "Master Bedroom Light",
  //   textPosition: [WEST_WALL + 80, NORTH_WALL + 260],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "13": {
  //   id: "13",
  //   kind: "DIMMER",
  //   component: Dimmer,
  //   note: "Master Walkin Closet",
  //   textPosition: [WEST_WALL + 210, NORTH_WALL + 280],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "28": {
  //   id: "28",
  //   kind: "MOTION",
  //   component: Motion,
  //   temperatureComponent: Temperature,
  //   note: "Master Bathroom",
  //   textPosition: [WEST_WALL + 62, NORTH_WALL + 170],
  //   path: [
  //     [WEST_WALL + 10, NORTH_WALL + 170],
  //     [WEST_WALL + 90, NORTH_WALL + 170],
  //   ],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "16": {
  //   id: "16",
  //   kind: "MOTION",
  //   component: Motion,
  //   temperatureComponent: Temperature,
  //   note: "Garage Motion",
  //   textPosition: [WEST_WALL + 170, NORTH_WALL + 390],
  //   path: [
  //     [WEST_WALL + 190, NORTH_WALL + 477],
  //     [WEST_WALL + 133, NORTH_WALL + 496],
  //     [WEST_WALL + 59, NORTH_WALL + 494],
  //     [WEST_WALL + 167, NORTH_WALL + 490],
  //     [WEST_WALL + 116, NORTH_WALL + 494],
  //     [WEST_WALL + 56, NORTH_WALL + 495],
  //     [WEST_WALL + 174, NORTH_WALL + 555],
  //     [WEST_WALL + 229, NORTH_WALL + 507],
  //   ],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "29": {
  //   id: "29",
  //   kind: "MOTION",
  //   component: Motion,
  //   temperatureComponent: Temperature,
  //   note: "Corridor Motion",
  //   textPosition: [WEST_WALL + 250, NORTH_WALL + 120],
  //   path: [
  //     [WEST_WALL + 290, NORTH_WALL + 125],
  //     [WEST_WALL + 205, NORTH_WALL + 125],
  //     [WEST_WALL + 80, NORTH_WALL + 125],
  //     [WEST_WALL + 205, NORTH_WALL + 125],
  //     [WEST_WALL + 290, NORTH_WALL + 125],
  //   ],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "30": {
  //   id: "30",
  //   kind: "MOTION",
  //   component: Motion,
  //   temperatureComponent: Temperature,
  //   note: "Bathroom Motion",
  //   textPosition: [WEST_WALL + 180, NORTH_WALL + 200],
  //   path: [
  //     [WEST_WALL + 221, NORTH_WALL + 140],
  //     [WEST_WALL + 200, NORTH_WALL + 215],
  //     [WEST_WALL + 240, NORTH_WALL + 200],
  //   ],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "24": {
  //   id: "24",
  //   kind: "MOTION",
  //   component: Motion,
  //   temperatureComponent: Temperature,
  //   note: "Living Room Motion",
  //   textPosition: [WEST_WALL + 325, NORTH_WALL + 270],
  //   path: [
  //     [WEST_WALL + 295, NORTH_WALL + 180],
  //     [WEST_WALL + 320, NORTH_WALL + 235],
  //     [WEST_WALL + 345, NORTH_WALL + 200],
  //     [WEST_WALL + 375, NORTH_WALL + 215],
  //     [WEST_WALL + 440, NORTH_WALL + 215],
  //   ],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "451": {
  //   id: "451",
  //   kind: "MOTION",
  //   component: Motion,
  //   temperatureComponent: Temperature,
  //   note: "Master Closet Motion",
  //   textPosition: [WEST_WALL + 180, NORTH_WALL + 295],
  //   path: [
  //     [WEST_WALL + 195, NORTH_WALL + 285],
  //     [WEST_WALL + 220, NORTH_WALL + 245],
  //     [WEST_WALL + 240, NORTH_WALL + 265],
  //     [WEST_WALL + 210, NORTH_WALL + 280],
  //   ],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "449": {
  //   id: "449",
  //   kind: "MOTION",
  //   component: Motion,
  //   temperatureComponent: Temperature,
  //   note: "Kitchen Motion",
  //   textPosition: [WEST_WALL + 460, NORTH_WALL + 130],
  //   path: [
  //     [WEST_WALL + 425, NORTH_WALL + 40],
  //     [WEST_WALL + 495, NORTH_WALL + 40],
  //     [WEST_WALL + 495, NORTH_WALL + 125],
  //     [WEST_WALL + 425, NORTH_WALL + 125],
  //   ],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  // "450": {
  //   id: "450",
  //   kind: "MOTION",
  //   component: Motion,
  //   temperatureComponent: Temperature,
  //   note: "Outside Left Garage",
  //   textPosition: [WEST_WALL - 20, NORTH_WALL + 570],
  //   path: [
  //     [WEST_WALL - 24, NORTH_WALL + 400],
  //     [WEST_WALL - 24, NORTH_WALL + 550],
  //   ],
  //   attributes: {},
  //   label: "",
  //   name: "",
  // },
  "25": {
    id: "25",
    kind: "WASHINGMACHINE",
    component: WashingMachine,
    note: "WashingMachine",
    textPosition: [WEST_WALL + 112, NORTH_WALL + 360],
    width: 30,
    attributes: {},
    label: "",
    name: "",
  },
};
