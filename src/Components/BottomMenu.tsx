import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import React  from "react";
import { MENU_TEXT_COLOR, TOP_MENU_HEIGHT } from "../constants";
import { Icon } from '@iconify/react';
import homeThermometer from '@iconify/icons-mdi/home-thermometer';
import homeThermometerOutline from '@iconify/icons-mdi/home-thermometer-outline';
export interface BottomMenuProps {
  temperatureMode: boolean;
  onChangeTemperature: (isTemperatureOn: boolean) => void;
}

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
export const BottomMenu = (props: BottomMenuProps) => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      className="BottomMenu"
      style={{ ...buttonStyles }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels={true}
    >
      <BottomNavigationAction
        label="Temperature"
        style={buttonStylesIndividual}
        icon={<Icon icon={props.temperatureMode ? homeThermometer : homeThermometerOutline} />}
        onClick={() => {
          props.onChangeTemperature(!props.temperatureMode);
        }}
      />
    </BottomNavigation>
  );
};

