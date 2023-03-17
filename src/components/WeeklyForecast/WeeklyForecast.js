import React from "react";
import classes from "./WeeklyForecast.module.css";
import WeeklyForecastCard from "./WeeklyForecastCard";

const WeeklyForecast = (props) => {
  const weeklyWeatherData = [props.data[0]];
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  for (let i = 0; i < props.data.length; i++) {
    let dateTime = props.data[i].dt_txt;
    dateTime = dateTime.substring(dateTime.indexOf(" ") + 1, dateTime.length);

    if (dateTime === "00:00:00") {
      weeklyWeatherData.push(props.data[i]);
    }
  }

  function convertDt(dt) {
    let dayNum = new Date(dt * 1000).getDay();
    return days[dayNum];
  }

  
  return (
    <div className={classes.container}>
      {weeklyWeatherData.map((data, index) => (
        <WeeklyForecastCard
          key={index}
          day={convertDt(data.dt)}
          icon={data.weather[0].icon}
          minTemp={props.unit === 'imperial' ? data.main.temp_min * 1.8 + 32 : data.main.temp_min}
          maxTemp={props.unit === 'imperial' ? data.main.temp_max * 1.8 + 32 : data.main.temp_max}
          description={data.weather[0].description}
        />
      ))}
    </div>
  );
};

export default WeeklyForecast;
