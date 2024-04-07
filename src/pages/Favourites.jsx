import React from "react";
import Navbar from "../components/Navbar";
import Favs from "../components/Favs";

const Favourites = () => {
  return (
    <div className="bg-[#0B131E] min-h-screen p-5">
      <Navbar />
      <Favs />
    </div>
  );
};

export default Favourites;
