import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleMovie from "./components/SingleMovie";
import LandingPage from "./containers/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
