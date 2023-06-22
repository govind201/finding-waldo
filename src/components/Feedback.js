import React from "react";
import "../style/Feedback.css";

const Feedback = ({didFind}) => {
  return (
    <div className={`feedback-container ${didFind}`} >
      {didFind === "correct" ? (
        <div className="feedback">Correct!</div>
      ) : (
        <div className="feedback">Nice try!</div>
      )}
    </div>
  );
};

export default Feedback;
