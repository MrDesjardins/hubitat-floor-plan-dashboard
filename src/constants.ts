import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const TEXT_COLOR = "#b2ebf2";

export const TEXT_SIZE = 14;
export const LINE_COLOR = "#00bcd4";

export const WALL_COLOR = "#3B829C";

export const LIGHT_ON_COLOR = "rgba(255, 223, 90, 1)";
export const LIGHT_OFF_COLOR = "rgba(255, 223, 90, 0.1)";

export const FLOOR_COLOR = "rgb(40, 49, 77, 1)";

export const MENU_BACKGROUND_COLOR = "rgb(16, 92, 131)";
export const MENU_TEXT_COLOR = "rgb(255, 255, 255)";

export const TOP_MENU_HEIGHT = 60;

export const MOTION_COLOR = "rgba(215,230,210,0.5)";

// Nice blue (old menu: rgb(16, 92, 131))

export const COLOR_MACHINE1 = "#00bcd4";
export const COLOR_MACHINE2 = "#00bcd4";
export const COLOR_MACHINE3 = "#b2ebf2";

export const WARNING_COLOR = "#F2B705";
export const ERROR_COLOR = "#e53935";

export const NORTH_WALL = 23;
export const WEST_WALL = 41;

export const APP_HEIGHT = 600;
export const APP_WIDTH = 1024;
export const MAIN_MENU_WIDTH = 300;
export const TEMPERATURE_OUTSIDE_LEFT = 100;

export const DARK_THEME = createMuiTheme({
  palette: {
    type: "dark",
  },
});
export const FPS = 60;

export const CONTACT_SIZE = 35;
export const CONTACT_WIDTH = 4;

export const OPEN_ANGLE = 45;
export const CLOSE_ANGLE = 0;

export const TEXT_PADDING = 15;

export const WASHING_MACHINE_WIDTH = 3;

export const FETCHING_WEATHER_TIME_MS = 1000 * 60 * 5; // 5 minutes
export const FETCHING_ALL_DEVICES_TIME_MS = 1000 * 60 * 30; // 30 minutes

export const DAYS = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

export const BATTERY_HIGH = 90;
export const BATTERY_MEDIUM = 50;
export const BATTERY_LOW = 25;
