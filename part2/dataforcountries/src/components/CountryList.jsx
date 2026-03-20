import { useState } from "react";
import Country from "./Country";

const CountryList = ({ countries }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {countries.map((country) => (
        <div key={country.ccn3} style={{ marginBottom: "1rem" }}>
          <span>{country.name.common}</span>{" "}
          <button onClick={() => setSelected(country.ccn3)}>
            Show
          </button>

          {selected === country.ccn3 && <Country country={country} />}
        </div>
      ))}
    </div>
  );
};

export default CountryList;
