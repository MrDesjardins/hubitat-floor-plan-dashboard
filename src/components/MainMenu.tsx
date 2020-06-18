import {
  makeStyles,
  Theme,
  createStyles,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import { Icon } from "@iconify/react";
import homeThermometer from "@iconify/icons-mdi/home-thermometer";
import homeThermometerOutline from "@iconify/icons-mdi/home-thermometer-outline";
import React from "react";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { MAIN_MENU_WIDTH } from "../constants";
import { Mode } from "../models/mode";
import { AlarmAction } from "../models/alarm";
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
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
    hidelittle: {
      opacity: 0.2,
      transition: "opacity 300ms linear"
    },
  })
);

export interface MainMenuProps {
  applicationMode: Mode;
  alarmState: AlarmAction;
  onChangeMode: (mode: Mode) => void;
  onAlarm: (action: AlarmAction) => void;
}
export const MainMenu = (props: MainMenuProps) => {
  const classes = useStyles();
  return (
    <Drawer
      className={clsx(classes.drawer, { [classes.hidelittle]: props.alarmState === AlarmAction.Disarming })}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className="arm-menu">
        <Button aria-label="Away" startIcon={<AccessAlarmIcon />} disabled={props.alarmState === AlarmAction.Away} onClick={(event) => {
          props.onAlarm(AlarmAction.Away);
        }}>
          Away
        </Button>
        <Button aria-label="Sleep" startIcon={<AccessAlarmIcon />} disabled={props.alarmState === AlarmAction.Sleep} onClick={(event) => {
          props.onAlarm(AlarmAction.Sleep);
        }}>
          Sleep
        </Button>
        <Button aria-label="Disarm" startIcon={<AccessAlarmIcon />} disabled={props.alarmState === AlarmAction.Disarmed || props.alarmState === AlarmAction.Disarming} onClick={(event) => {
          props.onAlarm(AlarmAction.Disarming);
        }}>
          Disarm
        </Button>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          key={"deviceMode"}
          onClick={() => {
            props.onChangeMode(Mode.DEVICES);
          }}
        >
          <ListItemIcon>
            <Icon
              className="MuiSvgIcon-root"
              icon={
                props.applicationMode === Mode.DEVICES ? homeThermometer : homeThermometerOutline
              }
            />
          </ListItemIcon>
          <ListItemText primary="Device Mode" />
        </ListItem>
        <ListItem
          button
          key={"temperatureMode"}
          onClick={() => {
            props.onChangeMode(Mode.TEMPERATURES);
          }}
        >
          <ListItemIcon>
            <Icon
              className="MuiSvgIcon-root"
              icon={
                props.applicationMode === Mode.TEMPERATURES ? homeThermometer : homeThermometerOutline
              }
            />
          </ListItemIcon>
          <ListItemText primary="Temperature Mode" />
        </ListItem>
        <ListItem
          button
          key={"batterieMode"}
          onClick={() => {
            props.onChangeMode(Mode.BATTERIES);
          }}
        >
          <ListItemIcon>
            <Icon
              className="MuiSvgIcon-root"
              icon={
                props.applicationMode === Mode.BATTERIES ? homeThermometer : homeThermometerOutline
              }
            />
          </ListItemIcon>
          <ListItemText primary="Battery Mode" />
        </ListItem>
      </List>
    </Drawer>
  );
};
