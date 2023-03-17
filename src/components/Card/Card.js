import React, { useState, useEffect } from "react";
//Components
import Details from "../Details/Details";
import ErrorModal from "../Modal/Modal";
import Search from "../Search/Search";
import Temperature from "../Temperature/Temperature";
import TodaysForecast from "../TodaysForecast/TodaysForecast";
import WeeklyForecast from "../WeeklyForecast/WeeklyForecast";
import { RotatingLines } from "react-loader-spinner";
//Styles
import classes from "./Card.module.css";
//Hooks
import useHttp from "../../hooks/use-http";
const Card = () => {
  const { isLoading, error, sendRequest , setError} = useHttp();
  const [coordinates, setCoordinates] = useState({lat:44,lon:20});
  const [unit, setUnit] = useState("metric");
  const [weatherData, setWeatherData] = useState();

  const todaysWeatherData = weatherData && {
    temp:
      unit === "imperial"
        ? weatherData.list[0].main.temp * 1.8 + 32
        : weatherData.list[0].main.temp,
    minTemp:
      unit === "imperial"
        ? weatherData.list[0].main.temp_min * 1.8 + 32
        : weatherData.list[0].main.temp_min,
    maxTemp:
      unit === "imperial"
        ? weatherData.list[0].main.temp_max * 1.8 + 32
        : weatherData.list[0].main.temp_max,
    windSpeed:
      unit === "imperial"
        ? weatherData.list[0].wind.speed / 1.609344
        : weatherData.list[0].wind.speed,
    description: weatherData.list[0].weather[0].description,
    weatherIcon: weatherData.list[0].weather[0].icon,
    humidity: weatherData.list[0].main.humidity,
  };

  let background = weatherData && weatherData.list[0].sys.pod;
  const url =
    coordinates &&
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
  //Location Handler

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
      } else {
        window.alert("Geolocation is not supported by this browser.");
      }
    }

    function setPosition(position) {
      const obj = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setCoordinates(obj);
    }
    getLocation();
  }, []);

  //Fething weather data
  useEffect(() => {
    if (coordinates) {
      sendRequest({ url }, (data) => {
        setWeatherData(data);

      });
    }
  }, [sendRequest, url, coordinates]);

  const unitHanlder = (value) => {
    setUnit(value);
  };

  const errorHandler = () => {
    setError(false);
  };

  const searchHandler = (obj) => {
    setCoordinates(obj);
  };

  return (
    <>
      <div
        className={`${classes.background} ${
          background === "n" ? classes.nightBackground : classes.dayBackground
        }`}
        ></div>
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={isLoading}
      />
      {error && <ErrorModal title={'Error'} message={'Loding data from api failed'} onClick={errorHandler}/>}
      {weatherData && !isLoading && (
        <>
          <div className={classes.card}>
            <Search onSearch={searchHandler} />
            <div className={classes.infoContainer}>
              <div className={classes.leftSide}>
                <Temperature
                  temp={todaysWeatherData.temp}
                  cityName={weatherData.city.name}
                  description={todaysWeatherData.description}
                  weatherIcon={todaysWeatherData.weatherIcon}
                  setTemp={unitHanlder}
                  currentUnit={unit}
                />
                <TodaysForecast list={weatherData.list} unit={unit} />
                <Details data={todaysWeatherData} unit={unit} />
              </div>
              <WeeklyForecast data={weatherData.list} unit={unit} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Card;
