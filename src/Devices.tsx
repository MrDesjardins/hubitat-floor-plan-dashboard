import {
  DeviceDataKind,
  ThermostatDevice,
  MotionDevice,
} from "./Models/devices";
import React, { FunctionComponent } from "react";
export interface DevicesProps {
  isTemperatureModeOn: boolean;
  devices: { [id: string]: DeviceDataKind };
  openConfiguration: (dev: DeviceDataKind, openDrawer: boolean) => void;
}

export const Devices: FunctionComponent<DevicesProps> = (
  props: DevicesProps
) => {
  if (props.isTemperatureModeOn) {
    const temperatureSensors = Object.values(props.devices).filter(
      (d) => d.kind === "THERMOSTAT" || d.kind === "MOTION"
    ) as (ThermostatDevice & MotionDevice)[];
    return (
      <>
        {temperatureSensors.map((dev) =>
          React.createElement(dev.temperatureComponent, {
            key: dev.id,
            componentId: dev.id,
            deviceData: dev,
            textPosition: dev.textPosition,
            openConfiguration: () => {
              props.openConfiguration(dev, true);
            },
          })
        )}
      </>
    );
  } else {
    return (
      <>
        {Object.values(props.devices).map((dev) =>
          React.createElement(dev.component, {
            key: dev.id,
            componentId: dev.id,
            deviceData: dev,
            textPosition: dev.textPosition,
            openConfiguration: () => {
              props.openConfiguration(dev, true);
            },
          })
        )}
      </>
    );
  }
};
