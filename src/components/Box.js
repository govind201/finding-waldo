import React from "react";
import "../style/Box.css";

const Box = (props) => {
  const positionBox = {
    left:
      props.coords.e.nativeEvent.clientX -
      props.coords.dimensions.left -
      10 +
      "px",
    top:
      props.coords.e.nativeEvent.clientY -
      props.coords.dimensions.top +
      40 +
      "px",
  };

  return <div id="box" data-testid="box" style={positionBox}></div>;
};

export default Box;
