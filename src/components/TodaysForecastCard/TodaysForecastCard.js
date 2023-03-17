import React from "react";
import classes from "./TodaysForecastCard.module.css";
import useImage from "../../hooks/use-image";
import { BiError } from "react-icons/bi";
import { RotatingLines } from "react-loader-spinner";
const TodaysForecastCard = (props) => {
  const {loading, error, image } = useImage(props.image);
  const date = new Date(props.time * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  return (
    <div className={classes.container}>
      <p>
        {hours}:{minutes.substr(-2)}
        {hours < 12 ? "am" : "pm"}
      </p>
      {error && <BiError color={"red"} size={30} />}
      {!error && <img src={image} alt="" />}
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="30"
        visible={loading}
      />
      <h1>{props.temp.toFixed(1)}&deg;</h1>
    </div>
  );
};

export default TodaysForecastCard;
