import axios from "axios";
import { useEffect,useState } from "react";

const Country=({country})=>{
    const api_key = import.meta.env.VITE_API_KEY;
    const [weatherdata,setWeatherdata]=useState(null);
    
    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`)
            .then((response)=>{
                setWeatherdata(response.data);
            })

    },[api_key, country.capital]);

    return(<>
    <h2>{country.name.common}</h2>
    <p>Capital {country.capital[0]}</p>
    <p>Area {country.area}</p>
    <h4>languages</h4>
    <ul>{Object.values(country.languages).map((lang,idx)=><li key={idx}>{lang}</li>)}</ul>
    <img src={country.flags.png} alt={country.flags.alt} style={{height:'100px',width:'150px'}}/>
    {weatherdata && <div>
        <h4>Weather in {country.capital[0]}</h4>
        <p>Temperature {(weatherdata.main.temp-273.15).toFixed(1)}<sup>o</sup> celcius</p>
        <img src={`https://openweathermap.org/payload/api/media/file/${weatherdata.weather[0].icon}.png`} alt="weather icon" style={{width:'100px',height:'100px'}}/>
        <p>{weatherdata.weather[0].description}</p>
        <p>Wind {weatherdata.wind.speed} m/s</p>
        </div>}
    
    </>)
}

export default Country