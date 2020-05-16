import React, { useContext } from "react";
import UserContext from "../data/context/UserContext";

export default function MarketBanner(props) {
  const context = useContext(UserContext);
  const { isLoading, stonksAreLocal, VOO } = context.state;

  return (
    <section className="market-banner">
      <span>
        <span className="index-underline">Vanguard S&P 500 Index:</span>{" "}
        {Number.parseFloat(VOO.latestPrice).toFixed(2)}{" "}
        <span
          style={VOO.changePercent > 0 ? { color: "green" } : { color: "red" }}
        >
          (
          {isLoading
            ? 0.0
            : Number.parseFloat(VOO.changePercent * 100).toFixed(2)}
          %)
        </span>
      </span>
      {stonksAreLocal === true && (
        <span>
          {"    "}There was a problem retrieving data, you are viewing old data
        </span>
      )}
    </section>
  );
}
