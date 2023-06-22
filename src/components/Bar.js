import React, { useEffect, useRef, useState } from "react";
import useTimer from "../hooks/useTimer";
import waldoImage from "../style/images/waldo.jpeg";
import wendaImage from "../style/images/wenda.png";
import wizardImage from "../style/images/wizard.png";
import "../style/Bar.css";

const Bar = ({ characters, updateScore }) => {
  const [foundCharacters, setFoundCharacters] = useState([]);
  const timer = useTimer();
  const time = useRef("0:00");

  useEffect(() => {
    const allCharactersFound = characters.every(
      (char) => char !== null && char.found
    );

    if (allCharactersFound) {
      updateScore(timer.timer);
    }
  }, [characters, updateScore, timer]);

  useEffect(() => {
    setFoundCharacters(
      characters
        .filter((char) => char !== null && char.found)
        .map((char) => char.name)
    );
  }, [characters]);


  useEffect(() => {
    timer.count();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.ceil(time % 60);
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${minutes}:${formattedSeconds}`;
    };

    time.current = formatTime(timer.timer);
  }, [timer]);

  return (
    <div className="bar">
      <div className="timer">{time.current}</div>
      <div className="characters">
        <div
          className={`character-container ${
            foundCharacters.includes("waldo") ? "opaque" : ""
          }`}
        >
          <img src={waldoImage} alt="Waldo" />
          <div className="character">Waldo</div>
        </div>
        <div
          className={`character-container ${
            foundCharacters.includes("wenda") ? "opaque" : ""
          }`}
        >
          <img src={wendaImage} alt="Wenda" />
          <div className="character">Wenda</div>
        </div>
        <div
          className={`character-container ${
            foundCharacters.includes("wizard") ? "opaque" : ""
          }`}
        >
          <img src={wizardImage} alt="Wizard Whitebeard" />
          <div className="character">Wizard</div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
