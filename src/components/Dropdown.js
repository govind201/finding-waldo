import React from "react";
import "../style/Dropdown.css";

const Dropdown = ({hiddenCharacters, displayDropDown, clickCoords, isCharacterFound}) => {

  const positionDropdown = {
    left: clickCoords.e.nativeEvent.clientX - clickCoords.dimensions.left + 20 + "px",
    top: clickCoords.e.nativeEvent.clientY - clickCoords.dimensions.top + 80 + "px",
  };

  return (
    <div id="dropdown" style={positionDropdown}>
      {hiddenCharacters.map((character) => {
        return (
          <div
            key={character.id}
            id={character.name}
            onClick={(e) => {
              displayDropDown();
              isCharacterFound(e);
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
