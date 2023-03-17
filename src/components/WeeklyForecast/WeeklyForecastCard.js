import React from "react";
import classes from "./WeeklyForecastCard.module.css";
import { RotatingLines } from "react-loader-spinner";
import { BiError } from "react-icons/bi";
import useImage from "../../hooks/use-image";
const WeeklyForecastCard = (props) => {
  const { loading, error, image } = useImage(props.icon);
  return (
    <div className={classes.container}>
      <p>{props.day}</p>
      <div className={classes.description}>
        {error && <BiError color={"red"} size={30} />}
        {!error && !loading && <img src={image} alt="" />}
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={loading}
        />
        <p>{props.description}</p>
      </div>
      <div className={classes.temp}>
        <h2>{props.minTemp.toFixed(0)}</h2>
        <h2>/</h2>
        <h2>{props.maxTemp.toFixed(0)}</h2>
      </div>
    </div>
  );
};

export default WeeklyForecastCard;
