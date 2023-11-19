import React from "react";
import { FrontSide } from "react-flippy";

export default ({
  companyName,
  changePercent,
  forwardConservativeGrahamFormulaNumber,
  latestPrice,
  peRatio,
  pastConservativeGrahamFormulaNumber,
  symbol,
}) => (
  <FrontSide className="stonk-card">
    <div className="stonk-attribute stonk-attribute__top">
      <div>Company Name:</div>
      <div className="stonk-attribute__name_and_logo">
        <span style={{ marginRight: ".25rem" }}>
          <img
            src={`https://storage.googleapis.com/iex/api/logos/${symbol}.png`}
            className="stonk-attribute__logo"
            alt="stonk-logo"
          />
        </span>
        <span
          className="stonk-attribute__company_name"
          style={
            forwardConservativeGrahamFormulaNumber > latestPrice &&
            pastConservativeGrahamFormulaNumber > latestPrice
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
