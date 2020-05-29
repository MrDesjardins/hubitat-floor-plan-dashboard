import { Weather, WeatherDataPoint, WeatherDaily } from "../models/weather";
import React, { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { DAYS } from "../constants";

export interface WeatherPanelProps {
  data: Weather | undefined;
}

export const WeatherPanel = (props: WeatherPanelProps) => {
  console.log(props);
  useEffect(() => {

  }, [props]);


  if (props.data === undefined || props.data.current === undefined) {
    return <p>No data</p>;
  }
  else {
    const current = props.data.current;
    const weather = current.weather[0];
    const today = props.data.hourly;
    const todayNext3Hours = today[3];
    const todayNext6Hours = today[6];
    const todayNext9Hours = today[9];
    const tomorrow1 = props.data.daily[1];
    const tomorrow2 = props.data.daily[2];
    const tomorrow3 = props.data.daily[3];
    return <div id="outside-weather">
      <Card>
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            Now
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            <Grid container justify="flex-start" spacing={3}>
              <Grid item={true}>
                <img alt={weather.description} src={`http://openweathermap.org/img/wn/${weather.icon}.png`} />
              </Grid>
              <Grid item={true}>
                <p>{`${Math.round(current.temp)}°F`}</p>
              </Grid>
              <Grid item={true}>
                <p>{`${Math.round(current.uvi)} UV`}</p>
              </Grid>
            </Grid>
          </Typography>
          <Typography color="textPrimary" gutterBottom>
            Today Forecast
          </Typography>
          {printHourly("+3h", todayNext3Hours)}
          {printHourly("+6h", todayNext6Hours)}
          {printHourly("+9h", todayNext9Hours)}
          <Typography color="textPrimary" gutterBottom>
            Next Days Forecast
          </Typography>
          {printDaily("T1", tomorrow1)}
          {printDaily("T2", tomorrow2)}
          {printDaily("T3", tomorrow3)}
        </CardContent>
      </Card>

    </div>;
  }
};

function printHourly(title: string, data: WeatherDataPoint): JSX.Element {
  const fullDateTime = new Date(0);
  fullDateTime.setUTCSeconds(data.dt);
  return <Grid container justify="flex-start" spacing={4}>
    <Grid item={true}>
      <p title={fullDateTime.toLocaleDateString() + " " + fullDateTime.toLocaleTimeString()}>{title}</p>
    </Grid>
    <Grid item={true}>
      <img alt={data.weather[0].description} src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} />
    </Grid>
    <Grid item={true}>
      <p>{`${Math.round(data.temp)}°F`}</p>
    </Grid>
    <Grid item={true}>
      <p>{`${Math.round(data.humidity)} %`}</p>
    </Grid>
  </Grid>;
}

function printDaily(title: string, data: WeatherDaily): JSX.Element {
  const fullDateTime = new Date(0);
  fullDateTime.setUTCSeconds(data.dt);
  const dayOfWeek = DAYS[fullDateTime.getDay()];
  return <Grid container justify="flex-start" spacing={4}>
    <Grid item={true}>
      <p title={fullDateTime.toLocaleDateString() + " " + fullDateTime.toLocaleTimeString()}>{dayOfWeek}</p>
    </Grid>
    <Grid item={true}>
      <img alt={data.weather[0].description} src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} />
    </Grid>
    <Grid item={true}>
      <p>{`${Math.round(data.temp.day)}°F`}</p>
    </Grid>
    <Grid item={true}>
      <p>{`${Math.round(data.uvi)} UV`}</p>
    </Grid>
  </Grid>;
}