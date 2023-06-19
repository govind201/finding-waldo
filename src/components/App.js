import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Game from "./Game";
import Leaderboard from "./Leaderboard";

const RouteSwitch = () => {
  const [score, setScore] = useState(0);

  const updateScore = (toThis) => {
    setScore(toThis);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game score={updateScore} />} />
        <Route path="/leaderboard" element={<Leaderboard score={score} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
