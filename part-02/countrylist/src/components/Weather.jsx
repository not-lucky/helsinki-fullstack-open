import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { WEATHER_BASE_URL, KEY } from "../App";

export const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(`${WEATHER_BASE_URL}?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${KEY}`)
      .then(res => {
        setWeatherData(res.data);
      })
      .catch(err => console.log('err', err));
  }, []);

  if (!weatherData) return null;
  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      temperature {weatherData.main.temp - 273.5} celsius <br />
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} /> <br />
      wind {weatherData.wind.speed} m/s
    </div>
  );
};
