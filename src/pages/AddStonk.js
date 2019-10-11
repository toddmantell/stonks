import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { getDevOrProdAPIURL } from "../data/getStonks";
import { get, post } from "../fetchWrapper";

export default function CheckStonk() {
  const apiUrl = getDevOrProdAPIURL();
  const [stonkTicker, setStonkTicker] = useState("");
  const [stonk, setStonk] = useState(false);
  const [futureGrowthRate, setFutureGrowthRate] = useState(0);
  const [previousGrowthRate, setPreviousGrowthRate] = useState(0);
  const debounceTime = 1000;

  //ignore error for now, we'll do an array.find for symbols in a typeahead
  const [symbols, setSymbols] = useState([]);

  const [debouncedTicker] = useDebounce(stonkTicker, debounceTime);

  useEffect(() => {
    getSymbols();
    if (debouncedTicker) getStonkQuote(debouncedTicker);

    // get the symbols (lazily) for a smooth typeahead experience (typeahead not yet implemented)
    async function getSymbols() {
      if (localStorage.symbols)
        return setSymbols(JSON.parse(localStorage.symbols));

      if (
        localStorage.symbols &&
        localStorage.symbols.lastUpdated > Date.now() - 86400000
      ) {
        // IEX updates the symbols every day at 7:45 Eastern
        // Check to see if the data in localStorage is older than this morning at 7:45 or 7:45 am
        // if 24 hours have not passed since 7:45 yet
        // Might also be a good idea to have some mechanism in the back end that retrieves the data and/or stores it in a db
      }

      try {
        const symbolsResponse = await get(`${apiUrl}/symbols`);
        const symbols = await symbolsResponse.json();
        localStorage.symbols = JSON.stringify({
          ...symbols,
          lastUpdated: Date.now()
        });
        setSymbols(symbols);
      } catch (error) {
        console.log(`An error occurred while fetching symbols: ${error}`);
      }
    }

    // since we are going to use a typeahead, this will be used when the actual stock is chosen
    async function getStonkQuote(ticker) {
      console.log(`getting ${ticker}...`);

      try {
        const fetchedStonkQuote =
          (await get(`${apiUrl}/quote/${ticker}`)) || false;
        return setStonk(fetchedStonkQuote);
      } catch (error) {
        console.log(`failed to fetch ${ticker}: ${error.toString()}`);
        return setStonk(false);
      }
    }
  }, [debouncedTicker]);

  // Why is this necessary? You can't directly use the useState update function as an event handler
  // So instead of creating a handler for every input, this generic one reads the input id and updates state accordingly
  function setInputValue(event) {
    const { id, value } = event.target;
    event.persist();
    switch (id) {
      case "stonk-symbol":
        setStonkTicker(value);
        break;
      case "previous-growth-rate":
        setPreviousGrowthRate(value);
        break;
      case "future-growth-rate":
        setFutureGrowthRate(value);
        break;
    }
  }

  async function getStonkCalculation() {
    if (debouncedTicker && previousGrowthRate && futureGrowthRate) {
      try {
        const stonk =
          (await post(`${apiUrl}/dashboard/${debouncedTicker}`)) || false;
      } catch (error) {
        console.log(
          `An error occurred while attempting to get the stonk calulation for ${debouncedTicker}: ${error.toString()}`
        );
      }
    }
  }

  return (
    <form data-testid="check-stonk-form">
      <h2 data-testid="form-heading">Placeholder</h2>
      <label htmlFor="" data-testid="stonk-name-label">
        Enter Stonk Symboldata-testid="stonk-name-label"
        <input
          id="stonk-symbol"
          placeholder="Stonk Symbol"
          data-testid="stonk-symbol"
          onChange={setInputValue}
        />
        <div>Stonk found: {stonk ? stonk.symbol : "Stonk not found."}</div>
        <div>Current Price: {stonk && stonk.latestPrice}</div>
      </label>
      <label htmlFor="previous-growth-rate" data-testid="previous-growth-label">
        Previous 5 Year Growth Rate:
        <input
          type="text"
          id="previous-growth-rate"
          placeholder="previous growth rate"
          data-testid="previous-growth-rate"
          onChange={setInputValue}
          value={previousGrowthRate}
        />
      </label>
      <label htmlFor="future-growth-rate" data-testid="future-growth-label">
        Expected Future Growth Rate:
        <input
          type="text"
          id="future-growth-rate"
          placeholder="future growth rate"
          data-testid="future-growth-rate"
          onChange={setInputValue}
          value={futureGrowthRate}
        />
      </label>

      <button type="submit">Get Calculation</button>
    </form>
  );
}
