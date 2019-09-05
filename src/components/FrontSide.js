import React from "react";
import { FrontSide } from "react-flippy";

export default ({ companyName, localTicker, latestPrice }) => (
  <FrontSide className="stonk-card">
    <div className="stonk-attribute stonk-attribute__top">
      Company Name:{" "}
      <span style={{ textDecoration: "underline" }}>{companyName}</span>
    </div>
    <hr />
    <div className="stonk-attribute">
      Ticker Symbol: <span>{localTicker}</span>
    </div>
    <hr />
    <div className="stonk-attribute">
      Latest Price: <span>{latestPrice}</span>
    </div>
  </FrontSide>
);
