import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Game from "./Game";
import Leaderboard from "./Leaderboard";

const RouteSwitch = () => {
  const [score, setScore] = useState(0);

  const updateScore = (newScore) => {
    setScore(newScore);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game updateScore={updateScore} />} />
        <Route path="/leaderboard" element={<Leaderboard score={score} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
