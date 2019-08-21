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
    <figure className="stonk-card">
      <div className="stonk-attribute">
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
      <hr />
      <div className="stonk-attribute">
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
      <hr />
      <div className="stonk-attribute">
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
      <hr />
      <div className="stonk-attribute">
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
      <hr />
      <div className="stonk-attribute">
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
      <hr />
    </figure>
  );
}
