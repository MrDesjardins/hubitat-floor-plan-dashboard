// https://openweathermap.org/api/one-call-api
export interface Weather {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: WeatherCurrentDataPoint;
  hourly: WeatherDataPoint[];
  daily: WeatherDaily[];
}

export interface WeatherDataPoint {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number; // %
  clouds: number; // %
  wind_speed: number;
  wind_deg: number;
  weather: WeatherImageData;
}

export interface WeatherCurrentDataPoint extends WeatherDataPoint {
  sunrise: number;
  sunset: number;
  dew_point: number;
  uvi: number;

}
export interface WeatherDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: WeatherDetailedTemperature;
  feels_like: WeatherDetailedFeelLikeTemperature;
  pressure: number;
  humidity: number; // %

  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherImageData;
  cloud: number;
  uvi: number;
}

export interface WeatherDetailedTemperature extends WeatherDetailedFeelLikeTemperature {
  min: number;
  max: number;
}

export interface WeatherDetailedFeelLikeTemperature {
  day: number;
  night: number;
  eve: number;
  morn: number;
}


export interface WeatherImageData {
  id: number;
  main: string;
  description: string;
  icon: string;
}