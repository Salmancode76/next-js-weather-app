"use client";
import CountrySelector from "./CountrySelector";
import { useEffect, useState } from "react";

export default function Home() {
  const [icon, setIcon] = useState("");
  const [data, setData] = useState();
  const [place, setPlace] = useState("bahrain");

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        place +
        "&appid=1f84752ac78a53830b09fe89a2082194&units=metric",
      { next: { revalidate: 1 } }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        if (data && data.weather && data.weather[0] && data.weather[0].icon) {
          setIcon(
            "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
          );
        } else {
          setIcon(""); 
        }
      });
  }, [place]);

  const handleChange = (selectedOption) => {
    setPlace(selectedOption.label);
  };

  return (
    <main className="main_content">
      <header className="header_main">
        <CountrySelector onChange={handleChange} className="countryCombo" />
      </header>
      <div className="result">
      {icon && (
          <img
            src={icon}
            alt="weather icon"
            className="state_img"
          />
        )}
        <span className="temp">
          {data ? (data.main ? data.main.temp : "No data") : "Loading"}
        </span>
        <span className="desc">
          Country: {data ? (data.main ? data.name : "No data") : "Loading"}
        </span>
        <span className="desc">
          Humidity: {data ? (data.main ? data.main.humidity : "No data") : "Loading"}
        </span>
        <span className="desc">
          Weather: {data ? (data.main ? data.weather[0].description : "No data") : "Loading"}
        </span>
       
      </div>
 
    </main>
  );
}