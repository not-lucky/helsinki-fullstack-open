import axios from "axios"
import { useEffect } from "react";
import { useState } from "react"
import { ShowCountryList } from "./components/ShowCountryList";

const URL = "https://studies.cs.helsinki.fi/restcountries/api/all"
export const KEY = import.meta.env.VITE_WEATHER_KEY
export const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(null)
  const [countryExpanded, setCountryExpanded] = useState(null)

  // 2 useeffects, so data fetched only once. then just filtered when searched
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setCountries(res.data)
      })
      .catch(err => console.log('err', err))
  }, [])


  useEffect(() => {
    setFilteredCountries(countries
      ? countries.filter(country =>
        country.name.common.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      : null)
  }, [search, countries])

  const handleChange = (e) => {
    // console.log(countries.filter(country => country.name.common.toLocaleLowerCase().includes(search)));
    setSearch(e.target.value)
  }

  return (
    <>
      find countries <input value={search} onChange={e => handleChange(e)} />
      <br />

      <ShowCountryList filteredCountries={filteredCountries} countryExpanded={countryExpanded} setCountryExpanded={setCountryExpanded} />


    </>
  )
}

export default App
