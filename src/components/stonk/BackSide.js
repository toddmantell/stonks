import React from "react";
import { BackSide } from "react-flippy";

export default ({
  localTicker,
  latestPrice,
  forwardConservativeGrahamFormulaNumber,
  forwardGrahamFormulaNumber,
  pastConservativeGrahamFormulaNumber,
  pastGrahamFormulaNumber
}) => (
  <BackSide style={{ height: "108%", borderRadius: "10px" }}>
    <div className="stonk-attribute">({localTicker})</div>
    <hr />
    <div className="stonk-attribute">
      Forward Number:{" "}
      <span
        style={
          forwardGrahamFormulaNumber > latestPrice
            ? { color: "green" }
            : { color: "red" }
        }
      >
        ${forwardGrahamFormulaNumber}
      </span>
    </div>
    <hr />
    <div className="stonk-attribute">
      Forward Number (Cons.):{" "}
      <span
        style={
          forwardConservativeGrahamFormulaNumber > latestPrice
            ? { color: "green" }
            : { color: "red" }
        }
      >
        ${forwardConservativeGrahamFormulaNumber}
      </span>
    </div>
    <hr />
    <div className="stonk-attribute">
      Past Number:{" "}
      <span
        style={
          pastGrahamFormulaNumber > latestPrice
            ? { color: "green" }
            : { color: "red" }
        }
      >
        ${pastGrahamFormulaNumber}
      </span>
    </div>
    <hr />
    <div className="stonk-attribute stonk-attribute__bottom">
      Past Number (Cons.):{" "}
      <span
        style={
          pastConservativeGrahamFormulaNumber > latestPrice
            ? { color: "green" }
            : { color: "red" }
        }
      >
        ${pastConservativeGrahamFormulaNumber}
      </span>
    </div>
  </BackSide>
);
