import {
    Dialog,
    DialogTitle,
    Typography,
    Switch,
    Button,
    Grid
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { LightSwitchDevice } from "../Models/Devices";
import { getDimmerOnOff } from "../Logics/AttributeLogics";

export interface LightSwitchOptionsProps {
    isDialogOpen: boolean;
    dimmerName: string;
    deviceData: LightSwitchDevice;
    openClose: (isOpen: boolean, isLightOn?: boolean) => void;
}
export const LightSwitchOptions = (props: LightSwitchOptionsProps) => {
    const [isLightOn, setIsLightOn] = useState(false);
    useEffect(() => {
        setIsLightOn(getDimmerOnOff(props.deviceData));
    }, [props.deviceData]);
    return (
        <Dialog
            onClose={() => props.openClose(false)}
            aria-labelledby="simple-dialog-title"
            open={props.isDialogOpen}
        >
            <DialogTitle id="simple-dialog-title" style={{ maxWidth: 300 }}>
                Set {props.dimmerName} Dimmer Values
            </DialogTitle>
            <div style={{ margin: 25 }}>
                <Typography gutterBottom>Off/On</Typography>
                <Switch
                    color={"primary"}
                    checked={isLightOn}
                    onChange={e => {
                        setIsLightOn(e.target.checked);
                    }}
                    name="lightOnComponent"
                    inputProps={{ "aria-label": "primary checkbox" }}
                />
                <Grid
                    container={true}
                    spacing={3}
                    alignContent={"flex-end"}
                    alignItems={"flex-end"}
                    direction={"column-reverse"}
                >
                    <Grid item={true} xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={e => {
                                props.openClose(false);
                            }}
                            style={{ marginLeft: 10 }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={e => {
                                props.openClose(false, isLightOn);
                            }}
                            style={{ marginLeft: 10 }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    );
};
