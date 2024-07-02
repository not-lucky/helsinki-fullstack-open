import { Weather } from "./Weather";

export const ShowCountry = ({ country }) => {


  return (
    <>
      <h1>{country.name.common}</h1>
      capital {country.capital[0]} <br />
      area {country.area}

      <h1>languages:</h1>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <br />

      <img width="300" src={country.flags.svg} />

      <Weather country={country} />
    </>
  );
};
