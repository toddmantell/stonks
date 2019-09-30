import React from "react";
import { FrontSide } from "react-flippy";

export default ({ companyName, localTicker, latestPrice, grahamNumber }) => (
  <FrontSide className="stonk-card">
    <div className="stonk-attribute stonk-attribute__top">
      Company Name:{" "}
      <div style={{ textDecoration: "underline" }}>{companyName}</div>
    </div>
    <hr />
    <div className="stonk-attribute">
      Ticker Symbol: <span>{localTicker}</span>
    </div>
    <hr />
    <div className="stonk-attribute">
      Latest Price: <span>{latestPrice}</span>
    </div>
    <hr />
    <div className="stonk-attribute">
      Graham Number:{" "}
      <span
        style={
          grahamNumber > latestPrice ? { color: "green" } : { color: "red" }
        }
      >
        {grahamNumber}
      </span>
    </div>
  </FrontSide>
);
