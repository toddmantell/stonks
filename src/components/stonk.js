import React from "react";

export default function Stonk({
  companyName,
  forwardConservativeGrahamFormulaNumber,
  forwardGrahamFormulaNumber,
  pastConservativeGrahamFormulaNumber,
  pastGrahamFormulaNumber,
  grahamNumber,
  latestPrice,
  localTicker
}) {
  return (
    <figure>
      <div>
        Company Name:{" "}
        <span style={{ textDecoration: "underline" }}>{companyName}</span>
      </div>
      <div>
        Ticker Symbol: <span>{localTicker}</span>
      </div>
      <div>
        Latest Price: <span>{latestPrice}</span>
      </div>
      <div>
        Graham Number:{" "}
        <span
          style={
            grahamNumber > latestPrice ? { color: "green" } : { color: "red" }
          }
        >
          {grahamNumber}
        </span>
      </div>
      <div>
        Forward Number:{" "}
        <span
          style={
            forwardGrahamFormulaNumber > latestPrice
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {forwardGrahamFormulaNumber}
        </span>
      </div>
      <div>
        Forward Number (Conservative):{" "}
        <span
          style={
            forwardConservativeGrahamFormulaNumber > latestPrice
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {forwardConservativeGrahamFormulaNumber}
        </span>
      </div>
      <div>
        Past Number:{" "}
        <span
          style={
            pastGrahamFormulaNumber > latestPrice
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {pastGrahamFormulaNumber}
        </span>
      </div>
      <div>
        Past Number (Conservative):{" "}
        <span
          style={
            pastConservativeGrahamFormulaNumber > latestPrice
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {pastConservativeGrahamFormulaNumber}
        </span>
      </div>
    </figure>
  );
}
