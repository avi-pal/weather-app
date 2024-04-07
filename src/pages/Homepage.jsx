import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CurrWeather from "../components/CurrWeather";
import axios from "axios";
import Forecast from "../components/Forecast";
import { AiOutlineEnter } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import loader from "../assets/loader.svg";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const location = useLocation();
  let data = "";
  let [needfetch, setNeedfetch] = useState(true);
  if (location.state) {
    const { loc } = location.state;
    data = loc;
    needfetch = false;
  }

  const [loading, setLoading] = useState(true);
  const [geo, setGeo] = useState("");

  const successHandler = async (position) => {
    try {
      const cityName = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );
      setGeo(cityName.data.display_name.split(",")[0]);
      setLoading(false);
    } catch (e) {
      alert(e.message);
    }
  };
  const errorHandler = (error) => {
    alert(error.message);
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    } else {
      alert("Allow Location!!");
    }
  };

  const search = (loc) => {
    data = null;
    setGeo(loc);
  };
  useEffect(() => {
    if (needfetch) {
      getLocation();
    }
    data = null;
  }, [needfetch]);

  return (
    <div className="bg-[#0B131E] min-h-screen p-5">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col grow">
          <Input search={search} />
          {data ? (
            <CurrWeather location={data} />
          ) : loading ? (
            <img src={loader} alt="" className="w-5/12 m-auto" />
          ) : (
            <CurrWeather location={geo} />
          )}
        </div>
        {data ? (
          <Forecast location={data} />
        ) : loading ? (
          <img src={loader} alt="" className="w-5/12 m-auto" />
        ) : (
          <Forecast location={geo} />
        )}
      </div>
    </div>
  );
};

const Input = ({ search }) => {
  const navigate = useNavigate();
  const [cities, sestCities] = useState([]);
  const handleCity = async (city) => {
    const rawData = await axios.get(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?where=suggest(name%2C"${city}")&limit=10`
    );
    const data = rawData.data.results;
    sestCities(data);
  };
  return (
    <div className="bg-[#202B3B] rounded mt-5 p-2 relative">
      <input
        type="text"
        className="bg-transparent focus:outline-none bg-[#202B3B] rounded text-white w-4/5"
        placeholder="Search..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            search(e.target.value);
          }
          sestCities([]);
        }}
        onChange={(e) => {
          handleCity(e.target.value);
        }}
      />
      <AiOutlineEnter className="absolute right-4 bottom-3" color="white" />
      <FaLocationCrosshairs
        className="absolute right-9 bottom-3 cursor-pointer"
        color="white"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="absolute top-full bg-gray-600">
        {cities.map((city, index) => {
          return (
            <>
              <h2 key={index} className="text-white font-comforta">
                {city.name}
              </h2>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
