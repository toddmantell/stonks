import React, { useState, useEffect } from "react";
import { getDevOrProdAPIURL } from "../data/getStonks";
import TypeAhead from "../components/TypeAhead";
import { get, post } from "../fetchWrapper";

export default function AddStonk() {
  const apiUrl = getDevOrProdAPIURL();
  const [stonkTicker, setStonkTicker] = useState({});
  const [stonkQuote, setStonkQuote] = useState(undefined);
  const [stonk, setStonk] = useState(undefined);
  const [futureGrowthRate, setFutureGrowthRate] = useState(0);
  const [previousGrowthRate, setPreviousGrowthRate] = useState(0);

  //ignore error for now, we'll do an array.find for symbols in a typeahead
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    // get the symbols (lazily) for a smooth typeahead experience (typeahead not yet implemented)
    async function getSymbols() {
      if (localStorage.symbols) {
        const localSymbols = JSON.parse(localStorage.symbols);
        console.log("localSymbols", localSymbols);

        setSymbols(localSymbols);

        // (
        // 	localStorage.symbols &&
        // 	localStorage.symbols.lastUpdated > Date.now() - 86400000
        // ) {
        // 	// IEX updates the symbols every day at 7:45 Eastern
        // 	// Check to see if the data in localStorage is older than this morning at 7:45 or 7:45 am
        // 	// if 24 hours have not passed since 7:45 yet
        // 	// Might also be a good idea to have some mechanism in the back end that retrieves the data and/or stores it in a db
        // }
      } else {
        try {
          const symbols = await get(`${apiUrl}/symbols`);
          localStorage.symbols = JSON.stringify([
            ...symbols,
            {
              lastUpdated: Date.now()
            }
          ]);
          setSymbols(symbols);
        } catch (error) {
          console.log(`An error occurred while fetching symbols: ${error}`);
        }
      }
    }

    getSymbols();
  }, [setSymbols]);

  useEffect(() => {
    if (stonkTicker.value) getStonkQuote(stonkTicker.value);

    // since we are going to use a typeahead, this will be used when the actual stock is chosen
    async function getStonkQuote(ticker) {
      console.log(`getting ${ticker}...`);

      try {
        const fetchedStonkQuote =
          (await get(`${apiUrl}/quote/${ticker}`)) || false;
        console.log("quote: ", fetchedStonkQuote);

        resetForm();
        return setStonkQuote(fetchedStonkQuote);
      } catch (error) {
        console.log(`failed to fetch ${ticker}: ${error.toString()}`);
        resetForm();
        return setStonkQuote(false);
      }
    }
  }, [stonkTicker.value]);

  function resetForm() {
    setStonk(false);
    setFutureGrowthRate(0);
    setPreviousGrowthRate(0);
  }

  // Why is this necessary? You can't directly use the useState update function as an event handler
  // So instead of creating a handler for every input, this generic one reads the input id and updates state accordingly
  function setInputValue(event) {
    const { id, value } = event.target;
    event.persist();
    switch (id) {
      case "previous-growth-rate":
        setPreviousGrowthRate(value);
        break;
      case "future-growth-rate":
        setFutureGrowthRate(value);
        break;
    }
  }

  async function getStonkCalculation(event) {
    event.preventDefault();
    if (stonkTicker && previousGrowthRate && futureGrowthRate) {
      try {
        const stonkForCalc = {
          ticker: stonkTicker,
          futureGrowthRate,
          previousGrowthRate
        };
        const stonk =
          (await post(`${apiUrl}/calculateMetrics`, stonkForCalc)) || false;

        setStonk(stonk || false);

        // also have to send the payload to an addStonk endpoint
      } catch (error) {
        console.log(
          `An error occurred while attempting to get the stonk calulation for ${stonkTicker}: ${error.toString()}`
        );
      }
    }
  }

  function addStonkToStonks() {
    // Not implemented
  }

  function setTickerAndGetQuote(ticker) {
    setStonkTicker(ticker);
  }

  return (
    <article className="add-stonks">
      <form
        data-testid="add-stonk-form"
        className="add-stonk-form"
        onSubmit={getStonkCalculation}
      >
        <h2 data-testid="form-heading">Placeholder</h2>
        <div>
          <label
            htmlFor="stonk-symbol"
            data-testid="stonk-symbol-label"
            className="input-label"
          >
            Enter Stonk Symbol:
          </label>
          <TypeAhead />
        </div>
        <div>
          <label
            htmlFor="previous-growth-rate"
            data-testid="previous-growth-label"
            className="input-label"
          >
            Previous 5 Year Growth Rate:
          </label>
          <input
            type="text"
            id="previous-growth-rate"
            placeholder="Previous growth rate"
            data-testid="previous-growth-rate"
            className="textbox"
            onChange={setInputValue}
            value={previousGrowthRate || ""}
          />
        </div>
        <div>
          <label
            htmlFor="future-growth-rate"
            data-testid="future-growth-label"
            className="input-label"
          >
            Expected Future Growth Rate:
          </label>
          <input
            type="text"
            id="future-growth-rate"
            placeholder="Future growth rate"
            data-testid="future-growth-rate"
            className="textbox"
            onChange={setInputValue}
            value={futureGrowthRate || ""}
          />
        </div>
        <button type="submit">Get Calculation</button>
      </form>

      <div className="metrics">
        <div>
          Stonk found: {stonkQuote ? stonkQuote.symbol : "Stonk not found."}
        </div>
        <div>Current Price: {stonkQuote && stonkQuote.latestPrice}</div>
        {stonk && (
          <>
            <div>
              Past:{" "}
              <span
                className={
                  stonk.pastGrahamFormulaNumber < stonkQuote.latestPrice
                    ? "bold loss"
                    : "bold gain"
                }
              >
                {stonk.pastGrahamFormulaNumber}
              </span>
            </div>
            <div>
              Past (Cons):{" "}
              <span
                className={
                  stonk.pastConservativeGrahamFormulaNumber <
                  stonkQuote.latestPrice
                    ? "bold loss"
                    : "bold gain"
                }
              >
                {stonk.pastConservativeGrahamFormulaNumber}
              </span>
            </div>
            <div>
              Forward:{" "}
              <span
                className={
                  stonk.forwardGrahamFormulaNumber < stonkQuote.latestPrice
                    ? "bold loss"
                    : "bold gain"
                }
              >
                {stonk.forwardGrahamFormulaNumber}
              </span>
            </div>
            <div>
              Forward (Cons):{" "}
              <span
                className={
                  stonk.forwardConservativeGrahamFormulaNumber <
                  stonkQuote.latestPrice
                    ? "bold loss"
                    : "bold gain"
                }
              >
                {stonk.forwardConservativeGrahamFormulaNumber}
              </span>
            </div>
          </>
        )}
        <button type="submit" onClick={addStonkToStonks}>
          Add Stonk
        </button>
      </div>
    </article>
  );
}
