import React from "react";
import Navbar from "../components/Navbar";
import SettingsButton from "../components/SettingsButton";

const Settings = () => {
  return (
    <div className="bg-[#0B131E] min-h-screen p-5">
      <Navbar />
      <SettingsButton />
    </div>
  );
};

export default Settings;
