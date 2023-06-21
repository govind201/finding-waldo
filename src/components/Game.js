import React, { useEffect, useState } from "react";
import "../style/Game.css";
import Bar from "./Bar";
import { store } from "../firebase/firebase.config";
import { collection, query, getDocs } from "firebase/firestore";
import Dropdown from "./Dropdown";
import uniqid from "uniqid";
import Marker from "./Marker";
import Feedback from "./Feedback";
import Box from "./Box";
import { useNavigate } from "react-router-dom";

const Game = (props) => {
  const [dropDown, setDropDown] = useState(false);
  const [clickCoords, setClickCoords] = useState(null);
  const [hidChars, setHidChars] = useState([]);
  const [waldo, setWaldo] = useState(null);
  const [wenda, setWenda] = useState(null);
  const [wizard, setWizard] = useState(null);
  const [feedback, setFeedback] = useState(false);
  const [didFind, setDidFind] = useState("incorrect");

  const navigate = useNavigate();

  useEffect(() => {
    const gameOver = () => {
      if (waldo.found && wenda.found && wizard.found) {
        navigate("/leaderboard");
      }
    };
    if (!!wizard && !!wenda && !!waldo) {
      gameOver();
    }
  }, [waldo, navigate, wenda, wizard]);

  const getCoords = (e) => {
    const dimensions = e.target.getBoundingClientRect();
    const x =
      ((e.nativeEvent.clientX - dimensions.left) / dimensions.width) * 100;
    const y =
      ((e.nativeEvent.clientY - dimensions.top) / dimensions.height) * 100;
    return { x, y, e, dimensions };
  };

  useEffect(() => {
    const retrieveCharacters = async () => {
      try {
        const charactersQuery = query(collection(store, "characters"));
        const querySnapshot = await getDocs(charactersQuery);
        const chars = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.name,
            x: data.locationX,
            y: data.locationY,
            id: uniqid(),
            found: false,
          };
        });

        const charactersMap = new Map([
          ["waldo", setWaldo],
          ["wenda", setWenda],
          ["wizard", setWizard],
        ]);

        chars.forEach((char) => {
          const setCharacter = charactersMap.get(char.name);
          if (setCharacter) {
            setCharacter(char);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    retrieveCharacters();
  }, []);

  useEffect(() => {
    if (wizard !== null) {
      const updateHidCharacters = () => {
        const stillHidden = [];
        if (!waldo.found) stillHidden.push(waldo);
        if (!wenda.found) stillHidden.push(wenda);
        if (!wizard.found) stillHidden.push(wizard);
        setHidChars(stillHidden);
      };
      updateHidCharacters();
    }
  }, [waldo, wenda, wizard]);

  const testX = (char) =>
    char.x[0] < clickCoords.x && clickCoords.x < char.x[1];
  const testY = (char) =>
    char.y[0] < clickCoords.y && clickCoords.y < char.y[1];

  const characterIsFound = (name) => {
    const thisChar =
      name === "waldo"
        ? [setWaldo, waldo]
        : name === "wenda"
        ? [setWenda, wenda]
        : name === "wizard"
        ? [setWizard, wizard]
        : false;
    thisChar[0]({
      name: thisChar[1].name,
      x: thisChar[1].x,
      y: thisChar[1].y,
      id: thisChar[1].id,
      found: true,
    });
  };

  const displayFeedback = () => {
    setFeedback(true);
    setTimeout(() => {
      setFeedback(false);
    }, 2000);
  };

  const isCharacterFound = (e) => {
    const name = e.target.id;
    hidChars.forEach((char) => {
      if (char.name === name) {
        if (testX(char) && testY(char)) {
          characterIsFound(name);
          setDidFind("correct");
        } else setDidFind("incorrect");
      }
    });
    displayFeedback();
  };

  const displayDropDown = () =>
    dropDown ? setDropDown(false) : setDropDown(true);

  const clickedCoord = (e) => {
    setClickCoords(getCoords(e));
    displayDropDown();
  };

  return (
    <div className="main">
      <Bar characters={[waldo, wenda, wizard]} score={props.score} />
      <img
        data-testid="game"
        src={require("../style/images/whereswaldo.jpg")}
        alt="wheres waldo. Click to play"
        onClick={clickedCoord}
        id="game-img"
      />
      {feedback && <Feedback didFind={didFind} />}
      {dropDown && (
        <>
          <Dropdown
            characters={hidChars}
            dropDisplay={displayDropDown}
            coords={clickCoords}
            found={isCharacterFound}
          />
          <Box coords={clickCoords} />
        </>
      )}
      {wizard !== null &&
        [waldo, wenda, wizard].map((char) =>
          char.found ? <Marker char={char} key={char.id} /> : null
        )}
    </div>
  );
};

export default Game;
