import { DeviceDataKind, ContactDevice, ContactDirection } from "../Models/Devices";
import { DictionaryOf } from "../Commons/DictionaryOf";
import { getContactOnOffAttribute } from "../Logics/AttributeLogics";
import { CONTACT_SIZE, CONTACT_WIDTH, OPEN_ANGLE, CLOSE_ANGLE, TEXT_SIZE, TEXT_COLOR, TEXT_PADDING, COLOR_MACHINE1 } from "../constants";

const delay = 20;
let lastFrame = 0;

export function drawDevicesLayer(ctx: CanvasRenderingContext2D, devices: (DeviceDataKind)[], openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void) {
  const currentFrame = Date.now();
  const diff = currentFrame - lastFrame;
  const update = diff >= delay;
  devices.forEach(singleDevice => {
    switch (singleDevice.kind) {
      case "CONTACT":
        drawContact(ctx, singleDevice, update, openConfiguration);
        break;
    }

  });
  if (update) {
    lastFrame = currentFrame;
  }
}

const contactsAngle: DictionaryOf<number> = {};
const contactsTranslation: DictionaryOf<[number, number]> = {};
export function drawContact(ctx: CanvasRenderingContext2D, device: ContactDevice, update: boolean, openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void) {
  drawRotativePhysicalContact(ctx, device, update);
  drawSlidingPhysicalContact(ctx, device, update);
}



function drawRotativePhysicalContact(
  ctx: CanvasRenderingContext2D,
  device: ContactDevice,
  update: boolean
): void {
  if (device.direction === ContactDirection.East || device.direction === ContactDirection.West || device.direction === ContactDirection.North || device.direction === ContactDirection.South) {
    const isContactOpen = getContactOnOffAttribute(device);
    const openAngle = getOpenAngle(device, true);
    const closeAngle = getOpenAngle(device, false);
    if (contactsAngle[device.id] === undefined) {
      contactsAngle[device.id] = getOpenAngle(device, !isContactOpen); // Reverse because of the animation to go to the desire position
    }
    if (update) {
      if (isContactOpen && contactsAngle[device.id] !== openAngle) {
        contactsAngle[device.id] += (contactsAngle[device.id] - openAngle) < 0 ? 1 : -1;
      }
      if (!isContactOpen && contactsAngle[device.id] !== closeAngle) {
        contactsAngle[device.id] += (contactsAngle[device.id] - openAngle) < 0 ? -1 : 1;
      }
    }

    switch (device.direction) {
      case ContactDirection.East:
      case ContactDirection.West:
      case ContactDirection.North:
      case ContactDirection.South:
        ctx.beginPath();
        ctx.font = `${TEXT_SIZE}px Arial`;
        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(getText(isContactOpen), device.textPosition[0], device.textPosition[1]);
        ctx.moveTo(device.textPosition[0] - TEXT_PADDING, device.textPosition[1] - TEXT_PADDING);
        const coord = getCoordinateWithAngle(device.textPosition[0] - TEXT_PADDING, device.textPosition[1] - TEXT_PADDING, CONTACT_SIZE, contactsAngle[device.id], device.direction);
        ctx.lineTo(coord[0], coord[1])
        ctx.lineWidth = CONTACT_WIDTH;
        ctx.strokeStyle = COLOR_MACHINE1;
        ctx.lineCap = "square";
        ctx.stroke();
        break;
    }
  }
}

function drawSlidingPhysicalContact(
  ctx: CanvasRenderingContext2D,
  device: ContactDevice,
  update: boolean
): void {
  if (device.direction === ContactDirection.SlideDown || device.direction === ContactDirection.SlideLeft || device.direction === ContactDirection.SlideRight || device.direction === ContactDirection.SlideUp) {
    const isContactOpen = getContactOnOffAttribute(device);
    const openCoordinate = getOpenCoordinate(device, true);
    const closeCoordinate = getOpenCoordinate(device, false);
    if (contactsTranslation[device.id] === undefined) {
      contactsTranslation[device.id] = getOpenCoordinate(device, !isContactOpen); // Reverse because of the animation to go to the desire position
    }
    let contactWidth = 0;
    let contactHeight = 0;
    if (update) {
      if (device.direction === ContactDirection.SlideDown || device.direction === ContactDirection.SlideUp) {
        contactHeight = CONTACT_SIZE;
        if (isContactOpen && contactsTranslation[device.id][1] !== openCoordinate[1]) {
          contactsTranslation[device.id][1] += contactsTranslation[device.id][1] - openCoordinate[1] < 0 ? 1 : -1;
        }
        if (!isContactOpen && contactsTranslation[device.id][1] !== closeCoordinate[1]) {
          contactsTranslation[device.id][1] += contactsTranslation[device.id][1] - closeCoordinate[1] > 0 ? -1 : 1;
        }
      } else {
        contactWidth = CONTACT_SIZE;
        if (isContactOpen && contactsTranslation[device.id][0] !== openCoordinate[0]) {
          contactsTranslation[device.id][0] += contactsTranslation[device.id][0] - openCoordinate[0] > 0 ? 1 : -1;
        }
        if (!isContactOpen && contactsTranslation[device.id][0] !== closeCoordinate[0]) {
          contactsTranslation[device.id][0] += contactsTranslation[device.id][0] - closeCoordinate[0] < 0 ? 1 : -1;
        }
      }
    }

    switch (device.direction) {
      case ContactDirection.SlideDown:
      case ContactDirection.SlideUp:
      case ContactDirection.SlideRight:
      case ContactDirection.SlideLeft:
        ctx.beginPath();
        ctx.font = `${TEXT_SIZE}px Arial`;
        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(getText(isContactOpen), device.textPosition[0], device.textPosition[1]);
        const x = device.textPosition[0] - TEXT_PADDING + contactsTranslation[device.id][0];
        const y = device.textPosition[1] - TEXT_PADDING + contactsTranslation[device.id][1];
        ctx.moveTo(x, y);
        ctx.lineTo(x + contactWidth, y + contactHeight);
        ctx.lineWidth = CONTACT_WIDTH;
        ctx.strokeStyle = COLOR_MACHINE1;
        ctx.lineCap = "square";
        ctx.stroke();
        break;
    }
  }
}

function getOpenCoordinate(device: ContactDevice, isContactOpen: boolean): [number, number] {
  const direction = device.direction;
  if (direction === ContactDirection.SlideRight) {
    return isContactOpen ? [-CONTACT_SIZE, 0] : [0, 0];
  } else if (direction === ContactDirection.SlideLeft) {
    return isContactOpen ? [+CONTACT_SIZE, 0] : [0, 0];
  } else if (direction === ContactDirection.SlideUp) {
    return isContactOpen ? [0, -CONTACT_SIZE] : [0, 0];
  } else if (direction === ContactDirection.SlideDown) {
    return isContactOpen ? [0, CONTACT_SIZE] : [0, 0];
  }
  return [0, 0];
}


function getText(isContactOpen: boolean): string {
  return `${isContactOpen ? "Open" : "Close"}`;
}

function getOpenAngle(device: ContactDevice, isContactOpen: boolean): number {
  const direction = device.direction;
  if (direction === ContactDirection.East) {
    return isContactOpen ? -OPEN_ANGLE : CLOSE_ANGLE
  } else if (direction === ContactDirection.West) {
    return isContactOpen ? -OPEN_ANGLE : CLOSE_ANGLE
  } else if (direction === ContactDirection.North) {
    return isContactOpen ? OPEN_ANGLE : CLOSE_ANGLE
  } else if (direction === ContactDirection.South) {
    return isContactOpen ? -OPEN_ANGLE : CLOSE_ANGLE;

  }
  return 0;
}

function getCoordinateWithAngle(x: number, y: number, contactSize: number, angle: number, direction: ContactDirection): [number, number] {
  let xEndContactWhenClosed = x;
  let yEndContactWhenClosed = y;

  if (direction === ContactDirection.East || direction === ContactDirection.West || direction === ContactDirection.SlideDown || direction === ContactDirection.SlideUp) {
    yEndContactWhenClosed = y + contactSize;
  } else if (direction === ContactDirection.North || direction === ContactDirection.South || direction === ContactDirection.SlideLeft || direction === ContactDirection.SlideRight) {
    xEndContactWhenClosed = x + contactSize;
  }
  const [newX, newY] = rotateFromCentralPoint(x, y, xEndContactWhenClosed, yEndContactWhenClosed, angle);
  return [newX, newY];
}

function rotateFromCentralPoint(cx: number, cy: number, x: number, y: number, angle: number): [number, number] {
  const radians = (Math.PI / 180) * angle;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
  const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}

