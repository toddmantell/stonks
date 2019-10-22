import React from "react";

const Metrics = ({ stonkQuote, stonk, addStonkToStonks }) => (
  <div className="metrics-section">
    {stonkQuote && (
      <div className="metrics-heading">
        <h2 className="metrics-heading--symbol">
          {stonkQuote ? stonkQuote.symbol : "Find Stonk"}
        </h2>
        <div>{stonkQuote && stonkQuote.companyName}</div>
        <hr />
        <h2 className="metrics-heading--price">
          ${stonkQuote && stonkQuote.latestPrice}
        </h2>
      </div>
    )}
    <div className="metrics-section--metrics">
      {stonk && (
        <>
          <div className="metrics-section--metric">
            Past:{" "}
            <span
              className={
                stonk.pastGrahamFormulaNumber < stonkQuote.latestPrice
                  ? "bold loss"
                  : "bold gain"
              }
            >
              ${stonk.pastGrahamFormulaNumber}
            </span>
          </div>
          <hr />
          <div className="metrics-section--metric">
            Past (Cons):{" "}
            <span
              className={
                stonk.pastConservativeGrahamFormulaNumber <
                stonkQuote.latestPrice
                  ? "bold loss"
                  : "bold gain"
              }
            >
              ${stonk.pastConservativeGrahamFormulaNumber}
            </span>
          </div>
          <hr />
          <div className="metrics-section--metric">
            Forward:{" "}
            <span
              className={
                stonk.forwardGrahamFormulaNumber < stonkQuote.latestPrice
                  ? "bold loss"
                  : "bold gain"
              }
            >
              ${stonk.forwardGrahamFormulaNumber}
            </span>
          </div>
          <hr />
          <div className="metrics-section--metric">
            Forward (Cons):{" "}
            <span
              className={
                stonk.forwardConservativeGrahamFormulaNumber <
                stonkQuote.latestPrice
                  ? "bold loss"
                  : "bold gain"
              }
            >
              ${stonk.forwardConservativeGrahamFormulaNumber}
            </span>
          </div>
        </>
      )}
    </div>
    <div className="metrics-section--button">
      <button
        type="submit"
        className={stonk ? "form-button" : "form-button__hidden"}
        onClick={addStonkToStonks}
      >
        Add Stonk
      </button>
    </div>
  </div>
);

export default Metrics;
