import { DeviceDataKind } from "../Models/devices";
import { drawContact } from "./contactDrawing";
import { drawDeadbolt } from "./deadboltDrawing";
import { drawTV } from "./tvDrawing";


export function drawDevicesLayer(
  ctx: CanvasRenderingContext2D,
  devices: DeviceDataKind[],
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void
) {

  devices.forEach((singleDevice) => {
    switch (singleDevice.kind) {
      case "CONTACT":
        drawContact(ctx, singleDevice, openConfiguration);
        break;
      case "DEADBOLT":
        drawDeadbolt(ctx, singleDevice, openConfiguration);
        break;
      case "TV":
        drawTV(ctx, singleDevice, openConfiguration);
    }
  });

}
