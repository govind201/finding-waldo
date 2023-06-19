import React from "react";
import "../style/Dropdown.css";

const Dropdown = (props) => {
  const characters = props.characters;
  const dropDisplay = props.dropDisplay;
  const coords = props.coords;
  const found = props.found;

  const positionDropdown = {
    left: coords.e.nativeEvent.clientX - coords.dimensions.left + 20 + "px",
    top: coords.e.nativeEvent.clientY - coords.dimensions.top + 80 + "px",
  };

  return (
    <div id="dropdown" data-testid="dropdown" style={positionDropdown}>
      {characters.map((character) => {
        return (
          <div
            key={character.id}
            id={character.name}
            onClick={(e) => {
              dropDisplay();
              found(e);
            }}
          >
            {character.name}
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
