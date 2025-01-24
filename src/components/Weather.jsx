import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/images/search.png'
import ashes_icon from '../assets/images/ashes.png'
import clear_icon from '../assets/images/clear.png'
import clouds_icon from '../assets/images/clouds.png'
import drizzle_icon from '../assets/images/drizzle.png'
import dust_icon from '../assets/images/dust.png'
import fog_icon from '../assets/images/fog.png'
import haze_icon from '../assets/images/haze.png'
import humidity_icon from '../assets/images/humidity.png'
import mist_icon from '../assets/images/mist.png'
import rain_icon from '../assets/images/rain.png'
import sand_icon from '../assets/images/sand.png'
import smoke_icon from '../assets/images/smoke.png'
import snow_icon from '../assets/images/snow.png'
import squall_icon from '../assets/images/squall.png'
import thunderstorm_icon from '../assets/images/thunderstorm.png'
import tornodo_icon from '../assets/images/tornodo.png'
import wind_icon from '../assets/images/wind.png'


const Weather = () => {

  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcons ={
    "01d" : clear_icon,
    "01n" : clear_icon,
    "02d" : clouds_icon,
    "02n" : clouds_icon,
    "03d" : clouds_icon,
    "03n" : clouds_icon,
    "04d" : drizzle_icon,
    "04n" : drizzle_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "13d" : snow_icon,
    "13n" : snow_icon,
  };

const search = async (cityName)=>{

   if(cityName===""){
    alert("Enter a City Name!");
    return;
   }
   try{
    const url = ` https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
   

    const response = await fetch(url);
   
      const data = await response.json();
if(!response.ok){
  alert(data.message);
  setWeatherData(false);
  return;
}

      console.log(data);
      const icon = allIcons[data.weather[0].icon];
      setWeatherData({
        humidity : data.main.humidity,
        windSpeed : data.wind.speed,
        temperature : Math.floor(data.main.temp),
        location: data.name,
        icon : icon,
        desc : data.weather[0].main
      })
  
  

   }catch (error){
      setWeatherData(false);
      console.log("Error in fetching weather data");
   }
}

useEffect(()=>{
  search('Paris');
},[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" placeholder='Search' ref={inputRef}/>
            <img src={search_icon} alt="search" onClick={()=>{search(inputRef.current.value)}}/>
        </div>
        
        {weatherData ? <>
          <img src={weatherData.icon} alt="weather_icon" className='weather-icon'/>
        <p className='description'>{weatherData.desc}</p>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon} alt="" />
               <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
               </div>
            </div>
            <div className='col'>
                <img src={wind_icon} alt="" />
               <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
               </div>
            </div>

        </div>
        </> : <></>}
      
      
    </div>
  )
}

export default Weather
