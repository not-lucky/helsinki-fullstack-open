import { ShowCountry } from "./ShowCountry";

export const ShowCountryList = ({ filteredCountries, countryExpanded, setCountryExpanded }) => {
  return (
    <>
      {filteredCountries === null
        ? null
        : (filteredCountries.length > 10)
          ? <>Too many matches, specify another filter.</>
          : filteredCountries.length === 1
            ? <ShowCountry country={filteredCountries[0]} />
            : filteredCountries.map(ctr => {
              // console.log('ctr', ctr)
              return (
                <div key={ctr.name.common}>
                  <div>
                    {ctr.name.common} <button onClick={() => setCountryExpanded(ctr.name.common)}>show</button>
                  </div>
                  {countryExpanded === ctr.name.common
                    ? (
                      <ShowCountry country={ctr} />
                    )
                    : ""}
                </div>);
            })}


    </>
  );
};
