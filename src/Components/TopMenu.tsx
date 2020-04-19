import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React from "react";
import { MENU_TEXT_COLOR, TOP_MENU_HEIGHT } from "../constants";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
export interface TopMenuProps {}

const buttonStyles = {
  height: TOP_MENU_HEIGHT,
  width: "100%",
  color: MENU_TEXT_COLOR,
};
const buttonStylesIndividual = {
  height: TOP_MENU_HEIGHT,
  width: "100%",
  color: MENU_TEXT_COLOR,
};
export const TopMenu = (props: TopMenuProps) => {
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      className="TopMenu"
      style={{ ...buttonStyles }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels={true}
    >
      <BottomNavigationAction
        label="Arm Away"
        style={buttonStylesIndividual}
        icon={<AccessAlarmIcon />}
      />
      <BottomNavigationAction
        label="Arm Sleep"
        style={buttonStylesIndividual}
        icon={<AccessAlarmIcon />}
      />
      <BottomNavigationAction
        label="Disarm"
        style={buttonStylesIndividual}
        icon={<AccessAlarmIcon />}
      />
    </BottomNavigation>
  );
};
