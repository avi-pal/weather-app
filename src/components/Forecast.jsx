import axios from "axios";
import React, { useEffect, useState } from "react";

const Forecast = ({ location }) => {
  const [mintemp, setMintemp] = useState([]);
  const [maxtemp, setMaxtemp] = useState([]);
  const [icon, setIcon] = useState([]);
  const [day, setDay] = useState([]);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getForecast = async () => {
    try {
      const rawData = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=f2bbfc201ba2f6979d76db50a79382f0&units=${localStorage.getItem(
          "temp"
        )}`
      );
      const data = rawData.data.list;
      const minTemparatue = [];
      const maxTemparature = [];
      const icons = [];
      const dayNo = [];
      for (let i = 0; i <= 39; i += 8) {
        minTemparatue.push(data[i].main.temp_min);
        maxTemparature.push(data[i].main.temp_max);
        icons.push(data[i].weather[0].icon);
        dayNo.push(new Date(data[i].dt_txt.split(" ")[0]).getDay());
      }
      setMintemp(minTemparatue);
      setMaxtemp(maxTemparature);
      setIcon(icons);
      setDay(dayNo);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getForecast();
  }, [location]);

  return (
    <div className="grow lg:max-w-[500px] bg-[#202B3B] rounded lg:ms-5 mt-5">
      <div className="flex flex-col">
        {day.map((ele, index) => {
          return (
            <div
              className="flex items-center justify-between px-10 py-1"
              key={index}
            >
              <div className="text-white text-2xl font-bold font-comforta">
                {index === 0 ? "Today" : days[ele].slice(0, 3)}
              </div>
              <div className="w-[100px] hidden md:block">
                <img
                  className="w-full"
                  src={`https://openweathermap.org/img/wn/${icon[index]}@2x.png`}
                  alt=""
                />
              </div>
              <div className="flex">
                <h3 className="text-white text-xl font-bold font-comforta">
                  {maxtemp[index]}/
                </h3>
                <h2 className="text-gray-400 text-xl font-bold font-comforta">
                  {mintemp[index]}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
