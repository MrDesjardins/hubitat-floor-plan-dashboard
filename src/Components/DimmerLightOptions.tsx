import { Switch, Typography } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import React, { useEffect, useState } from "react";
import {
  getDimmerLightLevelAttribute,
  getLightOnOffAttribute,
  setDimmerLightLevelAttribute,
  setLightOnOffAttribute,
} from "../Logics/AttributeLogics";
import { DimmingLightDevice } from "../Models/Devices";
export interface DimmerLightOptionsProps {
  isDialogOpen: boolean;
  dimmerName: string;
  deviceData: DimmingLightDevice;
  onClose: () => void;

  onSave: (deviceData: DimmingLightDevice) => void;
}
export const DimmerLightOptions = (props: DimmerLightOptionsProps) => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [dimmingValue, setDimmingValue] = useState(0);
  useEffect(() => {
    setIsLightOn(getLightOnOffAttribute(props.deviceData));
    setDimmingValue(getDimmerLightLevelAttribute(props.deviceData));
  }, []);

  return (
    <div style={{ margin: 25 }}>
      <Typography gutterBottom>Off/On</Typography>
      <Switch
        color={"primary"}
        checked={isLightOn}
        onChange={(e) => {
          const newValue = e.target.checked;
          const copy = { ...props.deviceData };
          copy.attributes = { ...copy.attributes };
          setLightOnOffAttribute(copy, newValue);
          props.onSave(copy);
        }}
        name="lightOnComponent"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      <Typography gutterBottom>Dimmer</Typography>
      <Slider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        value={dimmingValue}
        onChange={(event, newValue) => {
          const newValueCasted = newValue as number;
          const copy = { ...props.deviceData };
          copy.attributes = { ...copy.attributes };
          setDimmerLightLevelAttribute(copy, newValueCasted);
        }}
        onChangeCommitted={(event, newValue) => {
          const newValueCasted = newValue as number;
          const copy = { ...props.deviceData };
          copy.attributes = { ...copy.attributes };
          setDimmerLightLevelAttribute(copy, newValueCasted);
          props.onSave(copy);
        }}
      />
    </div>
  );
};
