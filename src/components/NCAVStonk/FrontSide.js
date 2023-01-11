import React from "react";
import { FrontSide } from "react-flippy";

export default ({
  companyName,
  symbol,
  latestPrice,
  changePercent,
  ncavWithTwoDecimals,
  priceAsPercentOfNCAV
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
      NCAV/share:{" "}
      <span
        style={
          ncavWithTwoDecimals > latestPrice
            ? { color: "green" }
            : { color: "red" }
        }
      >
        ${ncavWithTwoDecimals}
      </span>
      <span
        style={
          ncavWithTwoDecimals > latestPrice
            ? { color: "green" }
            : { color: "red" }
        }
      >
        {" "}
        ({priceAsPercentOfNCAV}%)
      </span>
    </div>
  </FrontSide>
);
