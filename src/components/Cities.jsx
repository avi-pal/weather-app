import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { LiaSortSolid } from "react-icons/lia";

const Cities = () => {
  const navigate = useNavigate();

  localStorage.setItem("offset", 0);
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNearEnd, setIsNearEnd] = useState(true);
  const [query, setQuery] = useState("");
  let [citySort, setCitySort] = useState("desc");
  let [countrySort, setCountrySort] = useState("desc");
  let [timeZoneSort, setTimeZoneSort] = useState("desc");
  const getCities = async () => {
    try {
      const rawData = await axios.get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20${query}&offset=${localStorage.getItem(
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
      console.log("here");
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {
    getCities();
  }, [loading, isNearEnd, query]);
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
      <div className="grid grid-cols-3 justify-between bg-[#202B3B] rounded p-3 my-5">
        <span
          className="text-white text-sm font-comforta flex items-center"
          onClick={() => {
            setCity([]);
            localStorage.setItem("offset", 0);
            if (citySort === "desc") {
              setCitySort("asc");
              setQuery("&order_by=name%20asc");
            } else {
              setCitySort("desc");
              setQuery("&order_by=name%20desc");
            }
          }}
        >
          City <LiaSortSolid />
        </span>
        <span
          className="text-white text-sm font-comforta flex items-center "
          onClick={() => {
            setCity([]);
            localStorage.setItem("offset", 0);
            if (countrySort === "desc") {
              setCountrySort("asc");
              setQuery("&order_by=cou_name_en%20asc");
            } else {
              setCountrySort("desc");
              setQuery("&order_by=cou_name_en%20desc");
            }
          }}
        >
          Country
          <LiaSortSolid />
        </span>
        <span
          className="text-white text-sm font-comforta flex items-center justify-end"
          onClick={() => {
            setCity([]);
            localStorage.setItem("offset", 0);
            if (timeZoneSort === "desc") {
              setTimeZoneSort("asc");
              setQuery("&order_by=timezone%20asc");
            } else {
              setTimeZoneSort("desc");
              setQuery("&order_by=timezone%20desc");
            }
          }}
        >
          Timezone
          <LiaSortSolid />
        </span>
      </div>
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
                <div className="grid grid-cols-3 w-full justify-between">
                  <div className="font-comforta text-white text-sm font-bold text-nowrap">
                    {city.name.slice(0, 10)}
                  </div>
                  <div className="font-comforta text-white text-sm font-bold">
                    {city.cou_name_en.split(",")[0]}
                  </div>
                  <div className="font-comforta text-white text-sm font-bold text-end">
                    {city.timezone.split("/")[0]}
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};

export default Cities;
