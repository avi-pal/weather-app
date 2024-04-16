import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiTempHigh } from "react-icons/ci";
import { FiWind } from "react-icons/fi";
import { MdWaterDrop } from "react-icons/md";
import { AiFillCloud } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const CurrWeather = ({ location }) => {
  if (!localStorage.getItem("temp")) localStorage.setItem("temp", "metric");

  const [favs, setFavs] = useState([]);

  const [name, setName] = useState("");
  const [temp, setTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [feelLike, setFeelLike] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [cloudiness, setCloudiness] = useState("");
  const [icon, setIcon] = useState("");

  const getData = async () => {
    try {
      const rawData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f2bbfc201ba2f6979d76db50a79382f0&units=${localStorage.getItem(
          "temp"
        )}`
      );
      const data = rawData.data;
      console.log(data);
      setName(location);
      setTemp(data.main.temp);
      setMinTemp(data.main.temp_min);
      setMaxTemp(data.main.temp_max);
      setFeelLike(data.main.feels_like);
      setWind(data.wind.speed);
      setHumidity(data.main.humidity);
      setCloudiness(data.clouds.all);
      setIcon(data.weather[0].icon);
    } catch (e) {
      console.log(e.message);
      alert("enter correct location");
    }
  };

  const handleAddToFavs = (newItem) => {
    if (!favs.includes(newItem)) {
      const updatedFavs = [...favs, newItem];
      setFavs(updatedFavs);
      localStorage.setItem("favs", JSON.stringify(updatedFavs));
      alert("Added to fav");
    } else {
      alert("Already in fav");
    }
  };

  useEffect(() => {
    const storedFavs = localStorage.getItem("favs");
    if (storedFavs) {
      setFavs(JSON.parse(storedFavs));
    } else {
      localStorage.setItem("favs", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    getData();
  }, [location]);
  return (
    <>
      <div className="flex flex-col grow">
        <div className="current-weather">
          <div className="flex flex-col md:flex-row items-center justify-between p-10">
            <div className="flex flex-col gap-5 justify-between relative">
              <div>
                <h2 className="text-white text-4xl font-bold font-comforta">
                  {name}
                </h2>
                <p className="text-gray-500 text-xl font-comforta">
                  Humidity: {humidity}%
                </p>
              </div>
              <div>
                <h2 className="text-white text-5xl font-extrabold font-comforta">
                  {temp}°{localStorage.getItem("temp") === "metric" ? "C" : "F"}
                </h2>
              </div>
              <div
                className="absolute end-[-40px] top-[5px] h-[30px] w-[30px] cursor-pointer"
                onClick={() => {
                  handleAddToFavs(location);
                }}
              >
                <AiFillStar color="white" className="w-full h-full" />
              </div>
            </div>
            <div className="icon w-full md:w-1/6 max-w-[300px]">
              <img
                className="w-full"
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="information bg-[#202B3B] rounded p-8">
          <h3 className="font-comforta text-2xl text-gray-400 mb-5">
            Conditions
          </h3>
          <div className="flex flex-col md:flex-row justify-center md:justify-between gap-5 mb-4">
            <div>
              <div className="flex items-center">
                <div className="icon w-[40px]">
                  <CiTempHigh color="grey" className="w-full h-full" />
                </div>
                <h3 className="text-gray-400 font-comforta text-2xl font-bold">
                  Min Temp
                </h3>
              </div>
              <div className="text-2xl text-white font-bold ps-10 font-comforta">
                {minTemp}°
                {localStorage.getItem("temp") === "metric" ? "C" : "F"}
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="icon w-[40px]">
                  <CiTempHigh color="grey" className="w-full h-full" />
                </div>
                <h3 className="text-gray-400 font-comforta text-2xl font-bold">
                  Max Temp
                </h3>
              </div>
              <div className="text-2xl text-white font-bold ps-10 font-comforta">
                {maxTemp}°
                {localStorage.getItem("temp") === "metric" ? "C" : "F"}
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="icon w-[40px]">
                  <CiTempHigh color="grey" className="w-full h-full" />
                </div>
                <h3 className="text-gray-400 font-comforta text-2xl font-bold">
                  Real feel
                </h3>
              </div>
              <div className="text-2xl text-white font-bold ps-10 font-comforta">
                {feelLike}°
                {localStorage.getItem("temp") === "metric" ? "C" : "F"}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:justify-between gap-5">
            <div>
              <div className="flex items-center">
                <div className="icon w-[40px]">
                  <FiWind color="grey" className="w-full h-full" />
                </div>
                <h3 className="text-gray-400 text-2xl font-extrabold font-comforta">
                  Wind
                </h3>
              </div>
              <div className="text-2xl text-white font-extrabold ps-10 font-comforta">
                {wind}km/hr
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="icon w-[40px]">
                  <MdWaterDrop color="grey" className="w-full h-full" />
                </div>
                <h3 className="text-gray-400 font-comforta text-2xl font-bold">
                  Humidity
                </h3>
              </div>
              <div className="text-2xl text-white font-bold ps-10 font-comforta">
                {humidity}%
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="icon w-[40px]">
                  <AiFillCloud color="grey" className="w-full h-full" />
                </div>
                <h3 className="text-gray-400 font-comforta text-2xl font-bold">
                  Cloudiness
                </h3>
              </div>
              <div className="text-2xl text-white font-bold ps-10 font-comforta">
                {cloudiness}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrWeather;
