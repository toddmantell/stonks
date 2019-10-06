import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { getDevOrProdAPIURL } from "../data/getStonks";

export default function CheckStonk() {
  const apiUrl = getDevOrProdAPIURL();
  const [stonkTicker, setStonkTicker] = useState("");
  const [stonk, setStonk] = useState(false);
  const [growthRate, setGrowthRate] = useState(0);
  const debounceTime = 1000;

  //ignore error for now, we'll do an array.find for symbols in a typeahead
  const [symbols, setSymbols] = useState([]);

  const [debouncedTicker] = useDebounce(stonkTicker, debounceTime);

  useEffect(() => {
    getSymbols();
    if (debouncedTicker) getStonk(debouncedTicker);

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
        const symbolsResponse = await fetch(`${apiUrl}/symbols`);
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
    async function getStonk(ticker) {
      console.log(`getting ${ticker}...`);

      try {
        const response = await fetch(`${apiUrl}/quote/${ticker}`);
        const fetchedStonk = response ? await response.json() : false;
        return setStonk(fetchedStonk);
      } catch (error) {
        console.log(`failed to fetch ${ticker}: ${error.toString()}`);
        return setStonk(false);
      }
    }
  }, [debouncedTicker]);

  function setTicker(event) {
    const { value: ticker } = event.target;
    event.persist();
    setStonkTicker(ticker);
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
          onChange={setTicker}
        />
        <div>Stonk found: {stonk ? stonk.symbol : "Stonk not found."}</div>
        <div>Current Price: {stonk && stonk.latestPrice}</div>
      </label>
      <label htmlFor="five-year-rate" data-testid="five-year-label">
        Expected Growth Rate:
        <input
          type="text"
          id="five-year-rate"
          placeholder="5 year growth rate"
          data-testid="five-year-rate"
          onChange={setGrowthRate}
          value={growthRate}
        />
      </label>
    </form>
  );
}
