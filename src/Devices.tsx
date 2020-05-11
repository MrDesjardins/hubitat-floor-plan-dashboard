import { DeviceDataKind } from "./Models/Devices";
import React, { FunctionComponent} from "react";
export interface DevicesProps {
  isTemperatureModeOn: boolean;
  devices: { [id: string]: DeviceDataKind };
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void;
}

export const Devices: FunctionComponent<DevicesProps> = (props: DevicesProps) => {
 
  if (props.isTemperatureModeOn) {
    return <></>;
  } else {
    return <>{Object.values(props.devices).map((dev) =>
      React.createElement(dev.component, {
        key: dev.id,
        componentId: dev.id,
        deviceData: dev,
        textPosition: dev.textPosition,
        openConfiguration: () => {
          props.openConfiguration(dev, true);
        },
      })
    )}</>
  }
};