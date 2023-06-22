import React from "react";
import "../style/Box.css";

const Box = ({clickCoords}) => {
  const positionBox = {
    left:
      clickCoords.e.nativeEvent.clientX -
      clickCoords.dimensions.left -
      10 +
      "px",
    top:
      clickCoords.e.nativeEvent.clientY -
      clickCoords.dimensions.top +
      40 +
      "px",
  };

  return <div id="box" style={positionBox}></div>;
};

export default Box;
