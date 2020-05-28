import { Switch, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getLightOnOffAttribute,
  setLightOnOffAttribute,
} from "logics/attributeLogics";
import { AirPurifierDevice } from "models/devices";

export interface AirPurifierOptionsProps {
  isDialogOpen: boolean;
  switchName: string;
  deviceData: AirPurifierDevice;
  onClose: () => void;
  onSave: (deviceData: AirPurifierDevice) => void;
}
export const AirPurifierOptions = (props: AirPurifierOptionsProps) => {
  const [isLightOn, setIsLightOn] = useState(false);
  const stateLightOnOff = getLightOnOffAttribute(props.deviceData);
  useEffect(() => {
    setIsLightOn(stateLightOnOff);
  }, [stateLightOnOff]);
  return (
    <div>
      <div style={{ margin: 25 }}>
        <Typography gutterBottom>Off/On</Typography>
        <Switch
          color={"primary"}
          checked={isLightOn}
          onChange={(e) => {
            const newValue = e.target.checked;
            setIsLightOn(newValue);
            const copy = { ...props.deviceData };
            copy.attributes = { ...copy.attributes };
            setLightOnOffAttribute(copy, newValue);
            props.onSave(copy);
          }}
          name="lightOnComponent"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
    </div>
  );
};
