import React from "react";
import TodaysForecastCard from "../TodaysForecastCard/TodaysForecastCard";
import classes from "./TodaysForecast.module.css";
const TodaysForecast = (props) => {
  const list = props.list.slice(0, 8);

  const content = list.map((timestamp) => (
    <li className={classes.listItem} key={timestamp.dt}>
      <TodaysForecastCard
        temp={props.unit === 'imperial' ? timestamp.main.temp * 1.8 + 32 : timestamp.main.temp}
        time={timestamp.dt}
        image={timestamp.weather[0].icon}
      />
    </li>
  ));
  return (
    <div className={classes.container}>
      <p>Today's Forecast</p>
      <ul className={classes.listContainer}>{content}</ul>
    </div>
  );
};

export default TodaysForecast;
