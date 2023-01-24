import React from "react";
import { BackSide } from "react-flippy";

export default ({
  symbol,
  latestPrice,
  forwardConservativeGrahamFormulaNumber,
  forwardGrahamFormulaNumber,
  futureGrowthRate,
  pastConservativeGrahamFormulaNumber,
  pastGrahamFormulaNumber,
  previousGrowthRate,
}) => (
  <BackSide className="stonk-card backside">
    <div className="stonk-attribute">({symbol})</div>
    <hr />
    <div className="stonk-attribute">
      High({previousGrowthRate}%):{" "}
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
    <div className="stonk-attribute">
      High Cons.({previousGrowthRate}%):{" "}
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
    <hr />

    <div className="stonk-attribute">
      Low({futureGrowthRate}%):{" "}
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
    <div className="stonk-attribute stonk-attribute__bottom">
      Low Cons.({futureGrowthRate}%):{" "}
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
  </BackSide>
);
