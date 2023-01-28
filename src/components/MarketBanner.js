import React, { useContext } from "react";
import UserContext from "../data/context/UserContext";

export default function MarketBanner(props) {
  const context = useContext(UserContext);
  const { isLoading, VOO } = context.state;

  const getCurrentTime = () =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "long",
    }).format(new Date(Date.now()));

  return (
    <section className="market-banner">
      <span>
        <span className="index-underline">
          <a
            href="https://www.etf.com/VOO#overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vanguard S&P 500 Index:
          </a>
        </span>{" "}
        {isLoading ? 0 : Number.parseFloat(VOO.latestPrice).toFixed(2)}{" "}
        <span
          style={VOO.changePercent > 0 ? { color: "green" } : { color: "red" }}
        >
          (
          {isLoading
            ? 0.0
            : Number.parseFloat(VOO.changePercent * 100).toFixed(2)}
          %)
        </span>
        <span className="timestamp">{isLoading ? "" : getCurrentTime()}</span>
      </span>
      {VOO.latestPrice === 1 && (
        <span>
          {"    "}There was a problem retrieving data, you are viewing
          placeholder data.
        </span>
      )}
    </section>
  );
}
