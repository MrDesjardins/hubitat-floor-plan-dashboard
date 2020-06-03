import { Switch, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getDeadboltAttribute,
  setDeadboltAttribute
} from "logics/attributeLogics";
import { DeadboltDevice } from "models/devices";

export interface DeadboltOptionsProps {
  isDialogOpen: boolean;
  name: string;
  deviceData: DeadboltDevice;
  onClose: () => void;
  onSave: (deviceData: DeadboltDevice) => void;
}
export const DeadboltOptions = (props: DeadboltOptionsProps) => {
  const [isDeadboltLock, setDeadboltLock] = useState(false);
  const stateDeadboltLock = getDeadboltAttribute(props.deviceData);
  useEffect(() => {
    setDeadboltLock(stateDeadboltLock);
  }, [stateDeadboltLock]);
  return (
    <div>
      <div style={{ margin: 25 }}>
        <Typography gutterBottom>Unlock/Lock</Typography>
        <Switch
          color={"primary"}
          checked={isDeadboltLock}
          onChange={(e) => {
            const newValue = e.target.checked;
            setDeadboltLock(newValue);
            const copy = { ...props.deviceData };
            copy.attributes = { ...copy.attributes };
            setDeadboltAttribute(copy, newValue);
            props.onSave(copy);
          }}
          name="lightOnComponent"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </div>
    </div>
  );
};
