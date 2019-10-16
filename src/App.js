import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    color: white;
`;

function App() {
  const [weather, setWeather] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      getData(position.coords.latitude, position.coords.longitude);
    })
  }

  useEffect(() => {
    setTimeout(getLocation,5000)
    
  }, [])

  const getData = async (latitude, longitude) => {
    const API_KEY = "1f38c79d918a202fc06dbd3406c2ba09";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data)
    setWeather(data)
    setLoading(false)
  }
  // getLocation()
  console.log(weather)
  return (
    isLoading ? (
      <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
      <PacmanLoader
        css={override}
        sizeUnit={"px"}
        size={30}
        color={'white'}
        loading={isLoading}
      />
      </div>
 
    ) :
      (<div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
          </h1>
            <h2 className="col-12">{weather && weather.name}</h2>
            <h3 className="col-12 text-danger">Temperature {weather && weather.main.temp}°C</h3>
            <img
              src={`http://openweathermap.org/img/w/${weather &&
                weather.weather[0].icon}.png`}
              alt=''
            />
            <h3 className="col-12">Weather description: {weather && weather.weather[0].description}</h3>
          </div>
        </div>
      </div>)
  );
}

export default App
