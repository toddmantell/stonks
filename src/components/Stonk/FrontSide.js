import React from "react";
import { FrontSide } from "react-flippy";

export default ({
  companyName,
  changePercent,
	forwardConservativeGrahamFormulaNumber,
  latestPrice,
  peRatio,
	pastConservativeGrahamFormulaNumber,
	symbol
}) => (
  <FrontSide className="stonk-card">
    <div className="stonk-attribute stonk-attribute__top">
      Company Name:{" "}
      <div className="stonk-attribute--companyName">
        <span
          style={
            forwardConservativeGrahamFormulaNumber > latestPrice && pastConservativeGrahamFormulaNumber > latestPrice
              ? {
                  color: "green",
                }
              : {}
          }
        >
          {companyName}
        </span>
      </div>
    </div>
    <hr />
    <div className="stonk-attribute">
      Ticker Symbol: <span>{symbol}</span>
    </div>
    <hr />
    <div className="stonk-attribute">
      Latest Price: <span>${latestPrice}</span> (
      <span style={changePercent > 0 ? { color: "green" } : { color: "red" }}>
        {changePercent ? changePercent : 0}%
      </span>
      )
    </div>
    <hr />
    <div className="stonk-attribute">
      PE Ratio (TTM): <span>{peRatio}</span>
    </div>
  </FrontSide>
);
