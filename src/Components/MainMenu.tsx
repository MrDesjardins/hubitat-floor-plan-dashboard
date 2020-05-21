import { makeStyles, Theme, createStyles, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Icon } from "@iconify/react";
import homeThermometer from "@iconify/icons-mdi/home-thermometer";
import homeThermometerOutline from "@iconify/icons-mdi/home-thermometer-outline";
import React from "react";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { MAIN_MENU_WIDTH } from "../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${MAIN_MENU_WIDTH}px)`,
      marginLeft: MAIN_MENU_WIDTH,
    },
    drawer: {
      width: MAIN_MENU_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: MAIN_MENU_WIDTH,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);



export interface MainMenuProps {
  temperatureMode: boolean;
  onChangeTemperature: (isTemperatureOn: boolean) => void;
}
export const MainMenu = (props: MainMenuProps) => {
  const classes = useStyles();
  return <Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
    anchor="left"
  >
    <div className={classes.toolbar} />
    <Divider />
    <List>
      <ListItem button key={"ArmAway"}>
        <ListItemIcon><AccessAlarmIcon /></ListItemIcon>
        <ListItemText primary="Arm Away" />
      </ListItem>
      <ListItem button key={"ArmSleep"}>
        <ListItemIcon><AccessAlarmIcon /></ListItemIcon>
        <ListItemText primary="Arm Sleep" />
      </ListItem>
      <ListItem button key={"Disarm"}>
        <ListItemIcon><AccessAlarmIcon /></ListItemIcon>
        <ListItemText primary="Disarm" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button key={"temperatureMode"} onClick={() => {
        props.onChangeTemperature(!props.temperatureMode);
      }}>
        <ListItemIcon>
          <Icon
            className="MuiSvgIcon-root"
            icon={
              props.temperatureMode ? homeThermometer : homeThermometerOutline
            }
          />
        </ListItemIcon>
        <ListItemText primary="Temperature Mode" />
      </ListItem>
    </List>
  </Drawer>;
};
