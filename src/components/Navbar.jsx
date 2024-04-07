import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { BsListStars } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center bg-[#202B3B] justify-between rounded md:px-2">
        <div className="title p-5 text-4xl font-comforta font-extrabold text-gray-400 hidden md:block">
          Weather
        </div>
        <div className="flex gap-5  p-2 m-auto md:m-0">
          <div className="flex">
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <div className="icon w-[30px] h-[30px]">
                <TiWeatherPartlySunny
                  className="w-[30px] h-[30px]"
                  color="grey"
                />
              </div>
              <p className="font-comforta text-[15px] font-extrabold text-gray-400">
                Weather
              </p>
            </div>
          </div>
          <div className="flex">
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => {
                navigate("/city");
              }}
            >
              <div className="icon w-[30px] h-[30px]">
                <BsListStars className="w-[30px] h-[30px]" color="grey" />
              </div>
              <p className="font-comforta text-[15px] font-extrabold text-gray-400">
                Cities
              </p>
            </div>
          </div>
          <div className="flex">
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => {
                navigate("/favourites");
              }}
            >
              <div className="icon w-[30px] h-[30px]">
                <AiFillStar className="w-[30px] h-[30px]" color="grey" />
              </div>
              <p className="font-comforta text-[15px] font-extrabold text-gray-400">
                Fav
              </p>
            </div>
          </div>
          <div className="flex">
            <div
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => {
                navigate("/settings");
              }}
            >
              <div className="icon w-[30px] h-[30px]">
                <IoSettings className="w-[30px] h-[30px]" color="grey" />
              </div>
              <p className="font-comforta text-[15px] font-extrabold text-gray-400">
                Settings
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
