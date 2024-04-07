import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Favs = () => {
  const navigate = useNavigate();
  const [favs, setFavs] = useState([]);

  const handleRemoveFromFavs = (city) => {
    const updatedFavs = favs.filter((item) => item !== city);
    setFavs(updatedFavs);
    localStorage.setItem("favs", JSON.stringify(updatedFavs));
  };

  useEffect(() => {
    const storedFavs = localStorage.getItem("favs");
    if (storedFavs) {
      setFavs(JSON.parse(storedFavs));
    } else {
      localStorage.setItem("favs", JSON.stringify([]));
    }
  }, []);
  return (
    <>
      {favs.map((fav, index) => {
        return (
          <div
            className="my-5 bg-[#202B3B] rounded p-3 flex justify-between cursor-pointer"
            key={index}
          >
            <h3
              className="font-comforta text-white font-bold"
              onClick={() => {
                navigate("/", { state: { loc: fav } });
              }}
            >
              {fav}
            </h3>

            <Temp loc={fav} />

            <div
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={() => {
                handleRemoveFromFavs(fav);
              }}
            >
              <AiFillDelete color="white" className="w-full h-full" />
            </div>
          </div>
        );
      })}
    </>
  );
};

const Temp = ({ loc }) => {
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("0");
  const getTemp = async () => {
    try {
      const rawData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=f2bbfc201ba2f6979d76db50a79382f0&units=${localStorage.getItem(
          "temp"
        )}`
      );
      const data = rawData.data;
      setMin(data.main.temp_min);
      setMax(data.main.temp_max);
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {
    getTemp();
  }, []);
  return (
    <>
      <div className="flex">
        <h3 className="text-white text-xl">
          {max}°{localStorage.getItem("temp") === "metric" ? "C" : "F"}/
        </h3>
        <h3 className="text-gray-400 text-xl">
          {min}°{localStorage.getItem("temp") === "metric" ? "C" : "F"}
        </h3>
      </div>
    </>
  );
};

export default Favs;
