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
import fireAlarm from '@iconify/icons-si-glyph/fire-alarm';
import homeThermometer from "@iconify/icons-mdi/home-thermometer";
import shieldHomeOutline from '@iconify/icons-mdi/shield-home-outline';
import homeLock from '@iconify/icons-mdi/home-lock';
import homeExportOutline from '@iconify/icons-mdi/home-export-outline';
import bxsHomeHeart from '@iconify/icons-bx/bxs-home-heart';
import bxHomeHeart from '@iconify/icons-bx/bx-home-heart';
import homeLightbulb from '@iconify/icons-mdi/home-lightbulb';
import homeLightbulbOutline from '@iconify/icons-mdi/home-lightbulb-outline';
import homeThermometerOutline from "@iconify/icons-mdi/home-thermometer-outline";
import React, { useState } from "react";
// import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { Cancel } from "@material-ui/icons";
import { MAIN_MENU_WIDTH, ERROR_COLOR } from "../constants";
import { Mode } from "../models/mode";
import { AlarmAction } from "../models/alarm";
import clsx from "clsx";
import { useInterval } from "../hooks/useInterval";

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
      transition: "opacity 300ms linear",
    },
    numberDown: {
      color: ERROR_COLOR
    }
  })
);


export interface MainMenuProps {
  applicationMode: Mode;
  alarmState: AlarmAction;
  onChangeMode: (mode: Mode) => void;
  onAlarm: (action: AlarmAction) => void;
}
export const MainMenu = (props: MainMenuProps) => {
  const [countDown, setCountdown] = useState(0);
  useInterval(() => {
    if (countDown > 0) {
      setCountdown(countDown - 1);
    }
  }, 1000, false);
  const classes = useStyles();
  return (
    <Drawer
      className={clsx(classes.drawer, {
        [classes.hidelittle]: props.alarmState === AlarmAction.Disarming,
      })}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className="arm-menu">
        <Button
          size="large"
          aria-label="Home"
          startIcon={<Icon icon={shieldHomeOutline} />}
          disabled={props.alarmState === AlarmAction.Home}
          onClick={(event) => {
            props.onAlarm(AlarmAction.Home);
            setCountdown(10);
          }}
        >
          Home
        </Button>
        <Button
          size="large"
          aria-label="Away"
          startIcon={<Icon icon={homeExportOutline} />}
          disabled={props.alarmState === AlarmAction.Away}
          onClick={(event) => {
            props.onAlarm(AlarmAction.Away);
            setCountdown(60);
          }}
        >
          Away
        </Button>
        <Button
          size="large"
          aria-label="Sleep"
          startIcon={<Icon icon={homeLock} />}
          disabled={props.alarmState === AlarmAction.Sleep}
          onClick={(event) => {
            props.onAlarm(AlarmAction.Sleep);
            setCountdown(10);
          }}
        >
          Sleep
        </Button>
        <Button
          size="large"
          aria-label="Disarm"
          startIcon={<Icon icon={fireAlarm} />}
          disabled={
            props.alarmState === AlarmAction.Disarmed ||
            props.alarmState === AlarmAction.Disarming
          }
          onClick={(event) => {
            props.onAlarm(AlarmAction.Disarming);
          }}
        >
          Disarm
        </Button>
        {countDown > 0 ? <div className="count-down"><span className={classes.numberDown}>{`${countDown} sec`}</span>
          <Button
            size="large"
            aria-label="Cancel"
            startIcon={<Cancel />}
            onClick={(event) => {
              setCountdown(0);
              props.onAlarm(AlarmAction.Disarmed);
            }}
          >
            Cancel
        </Button></div> : undefined}
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
                props.applicationMode === Mode.DEVICES
                  ? homeLightbulb
                  : homeLightbulbOutline
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
                props.applicationMode === Mode.TEMPERATURES
                  ? homeThermometer
                  : homeThermometerOutline
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
                props.applicationMode === Mode.BATTERIES
                  ? bxsHomeHeart
                  : bxHomeHeart
              }
            />
          </ListItemIcon>
          <ListItemText primary="Battery Mode" />
        </ListItem>
      </List>
    </Drawer>
  );
};
