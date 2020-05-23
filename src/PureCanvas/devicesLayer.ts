import { DeviceDataKind } from "../Models/devices";
import { drawContact } from "./contactDrawing";
import { drawDeadbolt } from "./deadboltDrawing";
import { drawTV } from "./tvDrawing";

const delay = 20;
let lastFrame = 0;

export function drawDevicesLayer(
  ctx: CanvasRenderingContext2D,
  devices: DeviceDataKind[],
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void
) {
  const currentFrame = Date.now();
  const diff = currentFrame - lastFrame;
  const update = diff >= delay;
  devices.forEach((singleDevice) => {
    switch (singleDevice.kind) {
      case "CONTACT":
        drawContact(ctx, singleDevice, update, openConfiguration);
        break;
      case "DEADBOLT":
        drawDeadbolt(ctx, singleDevice, update, openConfiguration);
        break;
      case "TV":
        drawTV(ctx, singleDevice, update, openConfiguration);
    }
  });
  if (update) {
    lastFrame = currentFrame;
  }
}
