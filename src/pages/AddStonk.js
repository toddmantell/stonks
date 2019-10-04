import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { getDevOrProdAPIURL } from "../data/getStonks";

export default function CheckStonk() {
  const [stonkTicker, setStonkTicker] = useState("");
  const [stonk, setStonk] = useState(false);
  const [growthRate, setGrowthRate] = useState(0);
  const debounceTime = 1000;

  const apiUrl = getDevOrProdAPIURL();

  const [debouncedTicker] = useDebounce(stonkTicker, debounceTime);

  useEffect(() => {
    if (debouncedTicker) getStonk(debouncedTicker);

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
    console.log("ticker: ", ticker);
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
        />
      </label>
    </form>
  );
}
