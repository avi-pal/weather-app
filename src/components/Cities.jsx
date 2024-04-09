import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Cities = () => {
  const navigate = useNavigate();

  localStorage.setItem("offset", 0);
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNearEnd, setIsNearEnd] = useState(false);
  const getCities = async () => {
    try {
      const rawData = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${localStorage.getItem(
          "offset"
        )}`
      );
      localStorage.setItem(
        "offset",
        JSON.stringify(JSON.parse(localStorage.getItem("offset")) + 20)
      );
      const data = rawData.data.results;
      console.log(data);
      setCity([...city, ...data]);
      setLoading(false);
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {
    getCities();
  }, [loading, isNearEnd]);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const distanceToBottom = scrollHeight - (scrollTop + clientHeight);
      const threshold = 200;
      setIsNearEnd(distanceToBottom < threshold);
      console.log(distanceToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {loading
        ? ""
        : city.map((city, index) => {
            return (
              <div
                className="my-5 bg-[#202B3B] rounded p-3 flex justify-between cursor-pointer"
                key={index}
                onClick={() => {
                  navigate("/", { state: { loc: city.name } });
                }}
              >
                <h3 className="font-comforta text-white font-bold">
                  {city.name}
                </h3>
              </div>
            );
          })}
      {/* <div className="flex justify-center gap-5">
        <div
          className={`${
            localStorage.getItem("offset") >= 20
              ? "bg-[#202B3B]"
              : "bg-[#111b29]"
          } rounded p-4 px-12 cursor-pointer`}
          onClick={() => {
            if (localStorage.getItem("offset") >= 20) {
              localStorage.setItem(
                "offset",
                JSON.stringify(JSON.parse(localStorage.getItem("offset")) - 20)
              );
              setLoading(true);
            }
          }}
        >
          <FaArrowLeftLong color="white" />
        </div>
        <div
          className="bg-[#202B3B] rounded p-4 px-12 cursor-pointer"
          onClick={() => {
            localStorage.setItem(
              "offset",
              JSON.stringify(JSON.parse(localStorage.getItem("offset")) + 20)
            );
            setLoading(true);
          }}
        >
          <FaArrowRightLong color="white" />
        </div>
      </div> */}
    </>
  );
};

export default Cities;
