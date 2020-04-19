import { Switch, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getLightOnOffAttribute,
  setLightOnOffAttribute,
} from "../Logics/AttributeLogics";
import { LightSwitchDevice } from "../Models/Devices";

export interface LightSwitchOptionsProps {
  isDialogOpen: boolean;
  dimmerName: string;
  deviceData: LightSwitchDevice;
  onClose: () => void;
  onSave: (deviceData: LightSwitchDevice) => void;
}
export const LightSwitchOptions = (props: LightSwitchOptionsProps) => {
  const [isLightOn, setIsLightOn] = useState(false);
  useEffect(() => {
    setIsLightOn(getLightOnOffAttribute(props.deviceData));
  }, [props.deviceData]);
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
