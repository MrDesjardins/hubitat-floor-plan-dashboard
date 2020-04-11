import {
    Dialog,
    DialogTitle,
    Typography,
    Switch,
    Button,
    Grid,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import {
    getDimmerOnOff,
    getDimmerLightLevel,
    setDimmerLightLevel,
    setLightOnOff,
} from "../Logics/AttributeLogics";
import { DimmingLightDevice } from "../Models/Devices";
export interface DimmerLightOptionsProps {
    isDialogOpen: boolean;
    dimmerName: string;
    deviceData: DimmingLightDevice;
    openClose: (isOpen: boolean) => void;

    onSave: (deviceData: DimmingLightDevice) => void;
}
export const DimmerLightOptions = (props: DimmerLightOptionsProps) => {
    const [isLightOn, setIsLightOn] = useState(false);
    const [dimmingValue, setDimmingValue] = useState(0);
    useEffect(() => {
        setIsLightOn(getDimmerOnOff(props.deviceData));
        setDimmingValue(getDimmerLightLevel(props.deviceData));
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
                    onChange={(e) => {
                        const newValue = e.target.checked;
                        setIsLightOn(newValue);
                        const copy = { ...props.deviceData };
                        copy.attributes = { ...copy.attributes };
                        setLightOnOff(copy, newValue);
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
                        setDimmingValue(newValueCasted);
                    }}
                    onChangeCommitted={(event, newValue) => {
                        const newValueCasted = newValue as number;
                        setDimmingValue(newValueCasted);
                        const copy = { ...props.deviceData };
                        copy.attributes = { ...copy.attributes };
                        setDimmerLightLevel(copy, newValueCasted);
                        props.onSave(copy);
                    }}
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
                            onClick={(e) => {
                                props.openClose(false);
                            }}
                            style={{ marginLeft: 10 }}
                        >
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    );
};
