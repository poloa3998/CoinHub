import React, { useState } from "react";
import Nav from "./components/Nav";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import Home from "./pages/Home";
import Cryptocurrencies from "./pages/Cryptocurrencies";
import News from "./pages/News";
import CryptoDetails from "./pages/CryptoDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState<string>(defaultDark ? "dark" : "light");
  localStorage.setItem("theme", theme);
  return (
    <BrowserRouter basename="/">
      <div className="app" data-theme={theme}>
        <Nav theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/news" element={<News simple={false} />} />

          <Route path="/crypto/:coinId" element={<CryptoDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
