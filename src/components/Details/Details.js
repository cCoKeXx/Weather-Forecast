import React from "react";
import DetailCard from "./DetailCard";
import classes from "./Details.module.css";
import { CiTempHigh } from "react-icons/ci";
import { BiWind } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";
const Details = (props) => {
  const { minTemp,maxTemp,humidity,windSpeed} = props.data;
  return (
    <div className={classes.container}>
      <p>More Details</p>
      <div className={classes.info}>
        <div>
          <DetailCard
            icon={<CiTempHigh size={30} />}
            text={"Minimum temp"}
            value={minTemp.toFixed(1) + "°"}
          />
          <DetailCard
            icon={<CiTempHigh size={30} />}
            text={"Maximum temp"}
            value={maxTemp.toFixed(1) + "°"}
          />
        </div>
        <div>
          <DetailCard
            icon={<BiWind size={30} />}
            text={"Wind speed"}
            value={`${windSpeed.toFixed(1)} ${props.unit === 'metric' ? 'km/h' : 'mph'}`}
          />
          <DetailCard
            icon={<WiHumidity size={30} />}
            text={"Humidity"}
            value={humidity + " %"}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
