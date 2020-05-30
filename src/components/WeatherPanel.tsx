import { Weather, WeatherDataPoint, WeatherDaily } from "../models/weather";
import React, { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { DAYS } from "../constants";

export interface WeatherPanelProps {
  data: Weather | undefined;
}

export const WeatherPanel = (props: WeatherPanelProps) => {
  console.log(props);
  useEffect(() => { }, [props]);

  if (props.data === undefined || props.data.current === undefined) {
    return <p>No data</p>;
  } else {
    const current = props.data.current;
    const weather = current.weather[0];
    const today = props.data.hourly;
    const todays = [today[3],
    today[6],
    today[9],
    today[12]];
    const tomorrows = [
      props.data.daily[1],
      props.data.daily[2],
      props.data.daily[3],
      props.data.daily[4],
      props.data.daily[5]];

    return (
      <div id="outside-weather">
        <Card>
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              <span className="now">Now</span>
              <span className="temporaryinfo">{printDateTime(current.dt)}</span>
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              <Grid container justify="flex-start" spacing={3}>
                <Grid item={true}>
                  <img
                    alt={weather.description}
                    src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                  />
                </Grid>
                <Grid item={true}>
                  <span>{`${Math.round(current.temp)}°F`}</span>
                </Grid>
                <Grid item={true}>
                  <span>{`${Math.round(current.uvi)} UV`}</span>
                </Grid>
              </Grid>
            </Typography>
            <div className="rotatedInfo rotated1">
              <Typography color="textPrimary" gutterBottom>
                Today Forecast
              </Typography>
              {todays.map(t => printHourly(t))}
            </div>
            <div className="rotatedInfo rotated2">
              <Typography color="textPrimary" gutterBottom>
                Next Days Forecast
              </Typography>
              {tomorrows.map(t => printDaily(t))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
};

function printHourly(data: WeatherDataPoint): JSX.Element {
  const timespan = data.dt - Date.now() / 1000
  const title = "+" + Math.round(timespan / 6000) + "h";
  return (
    <Grid container justify="flex-start" spacing={4} className="row-data">
      <Grid item={true}>
        <span title={printDateTime(data.dt)}>{title}</span>
      </Grid>
      <Grid item={true}>
        <img
          alt={data.weather[0].description}
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        />
      </Grid>
      <Grid item={true}>
        <span>{`${Math.round(data.temp)}°F`}</span>
      </Grid>
      <Grid item={true}>
        <span>{`${Math.round(data.humidity)} %`}</span>
      </Grid>
    </Grid>
  );
}

function printDaily(data: WeatherDaily): JSX.Element {
  const fullDateTime = new Date(0);
  fullDateTime.setUTCSeconds(data.dt);
  const dayOfWeek = DAYS[fullDateTime.getDay()];
  return (
    <Grid container justify="flex-start" spacing={5} className="row-data">
      <Grid item={true}>
        <span title={printDateTime(data.dt)}>{dayOfWeek}</span>
      </Grid>
      <Grid item={true}>
        <img
          alt={data.weather[0].description}
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        />
      </Grid>
      <Grid item={true}>
        <div>
          <span className="minmaxtemp">{`${Math.round(data.temp.min)}°F`}</span>
          <span>{`${Math.round(data.temp.day)}°F`}</span>
          <span className="minmaxtemp">{`${Math.round(data.temp.max)}°F`}</span>
        </div>
      </Grid>
      <Grid item={true}>
        <span>{`${Math.round(data.uvi)} UV`}</span>
      </Grid>
      <Grid item={true}>
        <span>{`${Math.round(data.rain ?? 0)} mm`}</span>
      </Grid>
    </Grid>
  );
}

function printDateTime(d: Date | number): string {
  let fullDateTime: Date;
  if (typeof d === "number") {
    const c = new Date(0);
    c.setUTCSeconds(d);
    fullDateTime = c;
  } else {
    fullDateTime = d;
  }
  return (
    fullDateTime.toLocaleDateString() + " " + fullDateTime.toLocaleTimeString()
  );
}
