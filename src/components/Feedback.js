import React from "react";
import "../style/Feedback.css";

const Feedback = (props) => {
  return (
    <div className={`feedback-container ${props.didFind}`} data-testid="background">
      {props.didFind === "correct" ? (
        <div className="feedback">Correct!</div>
      ) : (
        <div className="feedback">Nice try!</div>
      )}
    </div>
  );
};

export default Feedback;
