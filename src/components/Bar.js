import React, { useEffect, useRef } from "react";
import useTimer from "../hooks/useTimer";
import "../style/Bar.css";

const Bar = (props) => {
  const chars = props.characters;

  const waldo = useRef(null);
  const wenda = useRef(null);
  const wizard = useRef(null);
  const timer = useTimer();
  const time = useRef(0);

  useEffect(() => {
    if (chars[2] !== null) {
      if (chars[0].found && chars[1].found && chars[2].found) {
        props.score(timer.timer);
      }
    }
  });

  useEffect(() => {
    if (chars[0] !== null) {
      chars.forEach((char) => {
        if (char.found === true) {
          const thisChar =
            char.name === "waldo"
              ? waldo
              : char.name === "wenda"
              ? wenda
              : char.name === "wizard"
              ? wizard
              : false;
          if (!!thisChar) thisChar.current.classList.add("opaque");
        }
      });
    }
  }, [chars]);

  useEffect(() => {
    timer.count();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const toStandard = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.ceil(time % 60);
      if (seconds < 10) return `${minutes}:0${seconds}`;
      return `${minutes}:${seconds}`;
    };
    time.current = toStandard(timer.timer);
  }, [timer]);

  return (
    <div className="bar">
      <div className="timer" data-testid="timer">
        {time.current}
      </div>
      <div className="characters">
        <div
          className="character-container"
          id="waldo-face"
          data-testid="waldo"
          ref={waldo}
        >
          <img src={require("../style/images/waldo.jpeg")} alt="Waldo" />
          <div className="character">Waldo</div>
        </div>
        <div
          className="character-container"
          id="wenda-face"
          ref={wenda}
          data-testid="wenda"
        >
          <img src={require("../style/images/wenda.png")} alt="Wenda" />
          <div className="character">Wenda</div>
        </div>
        <div className="character-container" id="wizard-face" ref={wizard}>
          <img
            src={require("../style/images/wizard.png")}
            alt="Wizard Whitebeard"
          />
          <div className="character">Wizard</div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
