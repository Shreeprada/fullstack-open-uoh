import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList';
import Country from './components/Country';


const App=()=> {
  const [search,setSearch]=useState("");
  const [countries,setCountries]=useState([]);

  const handleSearch=(value)=>{
    setSearch(value);
  }

  useEffect(()=>{
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((response)=>{
      setCountries(response.data);
    })

  },[])

  const showCountries=countries.filter((country)=>country.name.common.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div> Find countries <input type="text" value={search} onChange={(e)=>handleSearch(e.target.value)}/></div>
      {search && showCountries.length>10 && <p>Too many matches,specify another filter</p> }
      {search && (showCountries.length<=10 && showCountries.length >1) && <CountryList countries={showCountries}/>}
      {search && showCountries.length===1 && <Country country={showCountries[0]}/>}
    </>
  )
}

export default App
