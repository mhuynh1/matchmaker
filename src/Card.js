import React from "react";
import logo from "./logo.svg";

export const Card = ({ card, flipFaceUp, disableClicks }) => {
  return (
    <div
      className={`memory-card ${card.faceUp && `flipped`}`}
      onClick={disableClicks || card.faceUp ? undefined : flipFaceUp(card)}
    >
      <div className="panes-container">
        <div className="logo front">
          <img src={logo} alt="" />
        </div>
        <div className="logo back">
          <p>
            <span role="img" aria-label="emoji">
              {card.backFace}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
