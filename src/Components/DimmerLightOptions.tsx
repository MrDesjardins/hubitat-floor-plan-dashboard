import {
    Dialog,
    DialogTitle,
    Typography,
    Switch,
    Button,
    Grid
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import { DimmingLightData } from "../Models/DimmingLight";
import { getDimmerOnOff, getDimmerLightLevel } from "../Logics/AttributeLogics";
export interface DimmerLightOptionsProps {
    isDialogOpen: boolean;
    dimmerName: string;
    deviceData: DimmingLightData;
    openClose: (
        isOpen: boolean,
        isLightOn?: boolean,
        dimmingValue?: number
    ) => void;
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
                    onChange={e => {
                        setIsLightOn(e.target.checked);
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
                        setDimmingValue(newValue as number);
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
                                props.openClose(false, isLightOn, dimmingValue);
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
