import React, { useState } from "react";
import settings from "../settings";

export default function CheckStonk() {
  const [stonk, setStonk] = useState(false);
  const [growthRate, setGrowthRate] = useState(0);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? settings.PROD_API_URL
      : settings.DEV_API_URL;

  async function getStonk(event) {
    const { value } = event.target;

    if (value.length >= 3) {
      try {
        const response = await fetch(`${apiUrl}/quote/${value}`);
        const fetchedStonk = response ? await response.json() : false;
        return setStonk(fetchedStonk);
      } catch (error) {
        console.log(`failed to fetch ${value}: ${error.toString()}`);
        return setStonk(false);
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
          onChange={getStonk}
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
