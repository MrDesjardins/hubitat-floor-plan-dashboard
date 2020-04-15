import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React from "react";
import {
    MENU_TEXT_COLOR,
    MENU_BACKGROUND_COLOR,
    TOP_MENU_HEIGHT,
} from "../constants";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
export interface TopMenuProps {}

const buttonStyles = {
    height: TOP_MENU_HEIGHT,
    width: "100%",
    backgroundColor: MENU_BACKGROUND_COLOR,
    color: MENU_TEXT_COLOR,
};
export const TopMenu = (props: TopMenuProps) => {
    const [value, setValue] = React.useState(0);
    return (
        <BottomNavigation
            style={{ ...buttonStyles }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels={true}
        >
            <BottomNavigationAction
                label="Arm Away"
                style={buttonStyles}
                icon={<AccessAlarmIcon />}
            />
            <BottomNavigationAction
                label="Arm Sleep"
                style={buttonStyles}
                icon={<AccessAlarmIcon />}
            />
            <BottomNavigationAction
                label="Disarm"
                style={buttonStyles}
                icon={<AccessAlarmIcon />}
            />
        </BottomNavigation>
    );
};
