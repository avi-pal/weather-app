import React, { useState } from "react";

const SettingsButton = () => {
  const [temp, setTemp] = useState(localStorage.getItem("temp"));
  return (
    <>
      <div className="rounded mt-5 p-5 bg-[#202B3B] flex justify-between">
        <h2 className="text-white font-comforta text-2xl">Temp</h2>
        <div className="bg-[#0B131E] rounded flex gap-2 p-2">
          <div
            className={`w-[40px] cursor-pointer text-center text-white rounded ${
              temp === "metric" ? "bg-[#202B3B]" : ""
            }`}
            onClick={() => {
              localStorage.setItem("temp", "metric");
              setTemp("metric");
            }}
          >
            °C
          </div>
          <div
            className={`w-[40px] cursor-pointer text-center text-white rounded ${
              temp === "imperial" ? "bg-[#202B3B]" : ""
            }`}
            onClick={() => {
              localStorage.setItem("temp", "imperial");
              setTemp("imperial");
            }}
          >
            °F
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsButton;
