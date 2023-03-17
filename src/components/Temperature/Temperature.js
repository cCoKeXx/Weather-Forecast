import React from "react";
import classes from "./Temperature.module.css";
import {BiError} from 'react-icons/bi';
import { RotatingLines } from "react-loader-spinner";
import useImage from "../../hooks/use-image";
const Temperature = (props) => {
  const {loading,error, image } = useImage(props.weatherIcon);

  const formatTemperatureHandler = (value) => {
    props.setTemp(value)
  };

  return (
    <div className={classes.temperature}>
      <div>
        <div className={classes.text}>
          <h1>{props.cityName}</h1>
          <h3>{props.description}</h3>
        </div>
        <div className={classes.number}>
          <h1>{props.temp.toFixed(1)}&deg; </h1>
          <div className={classes.format}>
            <button onClick={()=>formatTemperatureHandler('imperial')} className={props.currentUnit === 'imperial' ? classes.active : ''}>F</button>
            <button onClick={()=>formatTemperatureHandler('metric')} className={props.currentUnit === 'metric' ? classes.active : ''}>C</button>
          </div>
        </div>
      </div>
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={loading}
      />
      {error && !loading && <BiError className={classes.error}/>}
      {!error && !loading && <img src={image} alt="" />}
    </div>
  );
};

export default Temperature;
