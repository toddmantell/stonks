import React from "./node_modules/react";
import { FrontSide } from "./node_modules/react-flippy";

export default ({
  companyName,
  symbol,
  latestPrice,
  changePercent,
  grahamNumber
}) => (
  <FrontSide className="stonk-card">
    <div className="stonk-attribute stonk-attribute__top">
      Company Name:{" "}
      <div className="stonk-attribute--companyName">{companyName}</div>
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
      Graham Number:{" "}
      <span
        style={
          grahamNumber > latestPrice ? { color: "green" } : { color: "red" }
        }
      >
        ${grahamNumber}
      </span>
    </div>
  </FrontSide>
);