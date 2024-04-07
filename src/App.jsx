import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Settings from "./pages/Settings";
import Favourites from "./pages/Favourites";
import City from "./pages/City";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/city" element={<City />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
