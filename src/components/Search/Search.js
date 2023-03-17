import React, { useState } from "react";
//Styles
import classes from './Search.module.css';
//Hooks
import useHttp from '../../hooks/use-http';
const Search = (props) => {
  const {error,sendRequest,isLoading} = useHttp()
  const [city, setCity] = useState("");
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

  const submitHandler = (event) => {
    event.preventDefault();
    sendRequest({url},(data)=>{ props.onSearch({ lat: data[0].lat, lon: data[0].lon })})
    setCity('');
  };

  return (
    <form onSubmit={submitHandler} className={`${classes.form} ${error && classes.error}`}>
      <input
        onChange={(e) => {
          setCity(e.target.value);
        }}
        value={city}
        type="text"
        name=""
        id=""
        placeholder={error ? 'Please enter valid location!' : 'Search location'}
      />
    </form>
  );
};

export default Search;
