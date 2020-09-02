import { DictionaryOf } from "../commons/dictionaryOf";
import { rotateFromCentralPoint } from "../commons/mathematic";
import { getOpenCloseText } from "../commons/textbuilder";
import {
  CLOSE_ANGLE,
  COLOR_MACHINE1,
  CONTACT_SIZE,
  CONTACT_WIDTH,
  OPEN_ANGLE,
  TEXT_COLOR,
  TEXT_PADDING,
  TEXT_SIZE,
} from "../constants";
import { getContactOnOffAttribute } from "../logics/attributeLogics";
import { ContactDevice, ContactDirection } from "../models/devices";
import { delayedDeviceAnimation } from "../commons/animation";
import { clearRectangle } from "./commonDrawing";

export const contactsAngleLastValues: DictionaryOf<number> = {};
export const contactsTranslationLastValues: DictionaryOf<[number, number]> = {};

export let contactDrawingLastValues: DictionaryOf<boolean | undefined> = {};

export function drawContact(
  ctx: CanvasRenderingContext2D,
  device: ContactDevice,
  animationEnabled: boolean
) {
  delayedDeviceAnimation(
    device.id,
    (update: boolean) => {
      drawRotativePhysicalContact(ctx, device, update, animationEnabled);
      drawSlidingPhysicalContact(ctx, device, update, animationEnabled);
    },
    animationEnabled ? 20 : 5000
  );
}

function drawRotativePhysicalContact(
  ctx: CanvasRenderingContext2D,
  device: ContactDevice,
  update: boolean,
  animationEnabled: boolean
): void {
  if (
    device.direction === ContactDirection.East ||
    device.direction === ContactDirection.West ||
    device.direction === ContactDirection.North ||
    device.direction === ContactDirection.South
  ) {
    const isContactOpen = getContactOnOffAttribute(device);
    const openAngle = getOpenAngle(device, true);
    const closeAngle = getOpenAngle(device, false);

    // if (
    //   lastValue[device.id] === undefined ||
    //   lastValue[device.id] !== isContactOpen ||
    //   lastValue2[device.id] === undefined ||
    //   lastValue2[device.id] !== contactsAngle[device.id]
    // ) {
    // clearRectangle(
    //   ctx,
    //   device.textPosition[0],
    //   device.textPosition[1] - 16,
    //   35,
    //   20,
    //   false
    // );

    // // Old coordinate
    // const previousCoord = getCoordinateWithAngle(
    //   device.textPosition[0] - TEXT_PADDING,
    //   device.textPosition[1] - TEXT_PADDING,
    //   CONTACT_SIZE,
    //   contactsAngle[device.id],
    //   device.direction
    // );
    // clearRectangle(
    //   ctx,
    //   device.textPosition[0] - TEXT_PADDING,
    //   device.textPosition[1] - TEXT_PADDING,
    //   device.textPosition[0] - TEXT_PADDING - previousCoord[0],
    //   device.textPosition[1] - TEXT_PADDING - previousCoord[1],
    //   true
    // );

    if (contactsAngleLastValues[device.id] === undefined) {
      contactsAngleLastValues[device.id] = getOpenAngle(
        device,
        animationEnabled ? !isContactOpen : isContactOpen
      ); // Reverse because of the animation to go to the desire position
    }
    if (update) {
      if (isContactOpen && contactsAngleLastValues[device.id] !== openAngle) {
        contactsAngleLastValues[device.id] +=
          contactsAngleLastValues[device.id] - openAngle < 0 ? 1 : -1;
      }
      if (!isContactOpen && contactsAngleLastValues[device.id] !== closeAngle) {
        contactsAngleLastValues[device.id] +=
          contactsAngleLastValues[device.id] - openAngle < 0 ? -1 : 1;
      }
    }

    switch (device.direction) {
      case ContactDirection.East:
      case ContactDirection.West:
      case ContactDirection.North:
      case ContactDirection.South:
        clearRectangle(
          ctx,
          device.textPosition[0] - 43,
          device.textPosition[1] - 20,
          75,
          42,
          false
        );
        ctx.beginPath();
        ctx.font = `${TEXT_SIZE}px Arial`;
        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(
          getOpenCloseText(isContactOpen),
          device.textPosition[0],
          device.textPosition[1]
        );
        ctx.moveTo(
          device.textPosition[0] - TEXT_PADDING,
          device.textPosition[1] - TEXT_PADDING
        );
        const coord = getCoordinateWithAngle(
          device.textPosition[0] - TEXT_PADDING,
          device.textPosition[1] - TEXT_PADDING,
          CONTACT_SIZE,
          contactsAngleLastValues[device.id],
          device.direction
        );
        ctx.lineTo(coord[0], coord[1]);
        ctx.lineWidth = CONTACT_WIDTH;
        ctx.strokeStyle = COLOR_MACHINE1;
        ctx.lineCap = "square";
        ctx.stroke();
        break;
    }
    //   lastValue[device.id] = isContactOpen;
    //   lastValue2[device.id] = contactsAngle[device.id];
    // }
  }
}

function drawSlidingPhysicalContact(
  ctx: CanvasRenderingContext2D,
  device: ContactDevice,
  update: boolean,
  animationEnabled: boolean
): void {
  if (
    device.direction === ContactDirection.SlideDown ||
    device.direction === ContactDirection.SlideLeft ||
    device.direction === ContactDirection.SlideRight ||
    device.direction === ContactDirection.SlideUp
  ) {
    const isContactOpen = getContactOnOffAttribute(device);
    const openCoordinate = getOpenCoordinate(device, true);
    const closeCoordinate = getOpenCoordinate(device, false);

    if (contactsTranslationLastValues[device.id] === undefined) {
      contactsTranslationLastValues[device.id] = getOpenCoordinate(
        device,
        !isContactOpen
      ); // Reverse because of the animation to go to the desire position
    }
    let contactWidth =
      device.direction === ContactDirection.SlideDown ||
      device.direction === ContactDirection.SlideUp
        ? 0
        : CONTACT_SIZE;
    let contactHeight =
      device.direction === ContactDirection.SlideDown ||
      device.direction === ContactDirection.SlideUp
        ? CONTACT_SIZE
        : 0;
    if (update) {
      if (
        device.direction === ContactDirection.SlideDown ||
        device.direction === ContactDirection.SlideUp
      ) {
        if (
          isContactOpen &&
          contactsTranslationLastValues[device.id][1] !== openCoordinate[1]
        ) {
          contactsTranslationLastValues[device.id][1] +=
            contactsTranslationLastValues[device.id][1] - openCoordinate[1] < 0 ? 1 : -1;
        }
        if (
          !isContactOpen &&
          contactsTranslationLastValues[device.id][1] !== closeCoordinate[1]
        ) {
          contactsTranslationLastValues[device.id][1] +=
            contactsTranslationLastValues[device.id][1] - closeCoordinate[1] > 0 ? -1 : 1;
        }

        if (
          contactDrawingLastValues[device.id] === undefined ||
          (contactDrawingLastValues[device.id] !== isContactOpen &&
            contactsTranslationLastValues[device.id][1] === openCoordinate[0]) ||
          (!isContactOpen &&
            contactsTranslationLastValues[device.id][1] === closeCoordinate[1])
        ) {
          contactDrawingLastValues[device.id] = isContactOpen;
          return;
        }
      } else {
        if (
          isContactOpen &&
          contactsTranslationLastValues[device.id][0] !== openCoordinate[0]
        ) {
          contactsTranslationLastValues[device.id][0] +=
            contactsTranslationLastValues[device.id][0] - openCoordinate[0] > 0 ? 1 : -1;
        }
        if (
          !isContactOpen &&
          contactsTranslationLastValues[device.id][0] !== closeCoordinate[0]
        ) {
          contactsTranslationLastValues[device.id][0] +=
            contactsTranslationLastValues[device.id][0] - closeCoordinate[0] < 0 ? 1 : -1;
        }
        if (
          contactDrawingLastValues[device.id] === undefined ||
          (contactDrawingLastValues[device.id] !== isContactOpen &&
            contactsTranslationLastValues[device.id][0] === openCoordinate[0]) ||
          (!isContactOpen &&
            contactsTranslationLastValues[device.id][0] === closeCoordinate[0])
        ) {
          contactDrawingLastValues[device.id] = isContactOpen;
          return;
        }
      }
    }

    switch (device.direction) {
      case ContactDirection.SlideDown:
        // Erase Sliding Door
        clearRectangle(
          ctx,
          device.textPosition[0] - TEXT_PADDING - 2,
          device.textPosition[1] - TEXT_PADDING,
          4,
          CONTACT_SIZE * 2,
          false
        );
        break;
      case ContactDirection.SlideUp:
        // Erase Sliding Door
        clearRectangle(
          ctx,
          device.textPosition[0] - TEXT_PADDING,
          device.textPosition[1] - TEXT_PADDING,
          4,
          CONTACT_SIZE * 2,
          false
        );
        break;
      case ContactDirection.SlideRight:
        // Erase Sliding Door
        clearRectangle(
          ctx,
          device.textPosition[0] - CONTACT_SIZE - TEXT_PADDING,
          device.textPosition[1] - TEXT_PADDING - 2,
          CONTACT_SIZE * 2,
          4,
          false
        );
        break;
      case ContactDirection.SlideLeft:
        // Erase Sliding Door
        clearRectangle(
          ctx,
          device.textPosition[0] - TEXT_PADDING,
          device.textPosition[1] - TEXT_PADDING - 2,
          CONTACT_SIZE * 2,
          4,
          false
        );
        break;
    }

    switch (device.direction) {
      case ContactDirection.SlideDown:
      case ContactDirection.SlideUp:
      case ContactDirection.SlideRight:
      case ContactDirection.SlideLeft:
        // Erase Text
        clearRectangle(
          ctx,
          device.textPosition[0],
          device.textPosition[1] - TEXT_PADDING + 4,
          40,
          TEXT_PADDING,
          false
        );
        ctx.beginPath();
        ctx.font = `${TEXT_SIZE}px Arial`;
        ctx.fillStyle = TEXT_COLOR;
        ctx.fillText(
          getOpenCloseText(isContactOpen),
          device.textPosition[0],
          device.textPosition[1]
        );
        const x =
          device.textPosition[0] -
          TEXT_PADDING +
          contactsTranslationLastValues[device.id][0];
        const y =
          device.textPosition[1] -
          TEXT_PADDING +
          contactsTranslationLastValues[device.id][1];
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

function getOpenCoordinate(
  device: ContactDevice,
  isContactOpen: boolean
): [number, number] {
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

function getOpenAngle(device: ContactDevice, isContactOpen: boolean): number {
  const direction = device.direction;
  if (direction === ContactDirection.East) {
    return isContactOpen ? -OPEN_ANGLE : CLOSE_ANGLE;
  } else if (direction === ContactDirection.West) {
    return isContactOpen ? -OPEN_ANGLE : CLOSE_ANGLE;
  } else if (direction === ContactDirection.North) {
    return isContactOpen ? OPEN_ANGLE : CLOSE_ANGLE;
  } else if (direction === ContactDirection.South) {
    return isContactOpen ? -OPEN_ANGLE : CLOSE_ANGLE;
  }
  return 0;
}

function getCoordinateWithAngle(
  x: number,
  y: number,
  contactSize: number,
  angle: number,
  direction: ContactDirection
): [number, number] {
  let xEndContactWhenClosed = x;
  let yEndContactWhenClosed = y;

  if (
    direction === ContactDirection.East ||
    direction === ContactDirection.West ||
    direction === ContactDirection.SlideDown ||
    direction === ContactDirection.SlideUp
  ) {
    yEndContactWhenClosed = y + contactSize;
  } else if (
    direction === ContactDirection.North ||
    direction === ContactDirection.South ||
    direction === ContactDirection.SlideLeft ||
    direction === ContactDirection.SlideRight
  ) {
    xEndContactWhenClosed = x + contactSize;
  }
  const [newX, newY] = rotateFromCentralPoint(
    x,
    y,
    xEndContactWhenClosed,
    yEndContactWhenClosed,
    angle
  );
  return [newX, newY];
}
