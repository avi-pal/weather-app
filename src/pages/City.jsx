import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Cities from "../components/Cities";

const City = () => {
  return (
    <div className="bg-[#0B131E] min-h-screen p-5">
      <Navbar />
      <Cities />
    </div>
  );
};

export default City;
