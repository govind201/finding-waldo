import React, { useEffect, useState } from "react";
import "../style/Marker.css";

const Marker = (props) => {
  const gameImg = document.getElementById("game-img");
  const dimensions = gameImg.getBoundingClientRect();
  const [positionMarker, setPositionMarker] = useState([]);

  useEffect(() => {
    setPositionMarker({
      left: (props.char.x[0] / 100) * dimensions.width + "px",
      top: (props.char.y[1] / 100) * dimensions.height + 20 + "px",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="marker" style={positionMarker}>
      x
    </div>
  );
};

export default Marker;
