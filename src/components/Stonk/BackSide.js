import React from "react";
import { BackSide } from "react-flippy";
import Button from "../Button";

export default ({
  symbol,
  latestPrice,
  forwardConservativeGrahamFormulaNumber,
  forwardGrahamFormulaNumber,
  futureGrowthRate,
  pastConservativeGrahamFormulaNumber,
  pastGrahamFormulaNumber,
  previousGrowthRate,
  removeStonk
}) => (
  <BackSide style={{ height: "108%", borderRadius: "10px" }}>
    <div className="stonk-attribute">({symbol})</div>
    <hr />
    <div className="stonk-attribute">
      Forward({futureGrowthRate}%):{" "}
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
      Forward Cons.({futureGrowthRate}%):{" "}
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
      Past({previousGrowthRate}%):{" "}
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
      Past Cons.({previousGrowthRate}%):{" "}
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
    <Button
      buttonText="Remove"
      onClickHandler={() => removeStonk(symbol)}
      styleClass="stonk-card__button"
    />
  </BackSide>
);
