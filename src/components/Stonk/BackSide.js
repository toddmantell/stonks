import React from "./node_modules/react";
import { BackSide } from "./node_modules/react-flippy";

export default ({
  symbol,
  latestPrice,
  forwardConservativeGrahamFormulaNumber,
  forwardGrahamFormulaNumber,
  pastConservativeGrahamFormulaNumber,
  pastGrahamFormulaNumber
}) => (
  <BackSide style={{ height: "108%", borderRadius: "10px" }}>
    <div className="stonk-attribute">({symbol})</div>
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
