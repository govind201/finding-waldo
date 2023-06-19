import React from "react";
import "../style/Feedback.css";

const Feedback = (props) => {
  return (
    <div
      className={`feedback-container ${props.didFind}`}
      data-testid="background"
    >
      {(() => {
        if (props.didFind === "correct") {
          return <div className="feedback">Correct!</div>;
        }
        return <div className="feedback">Nice try!</div>;
      })()}
    </div>
  );
};

export default Feedback;
