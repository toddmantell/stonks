import React, { useState, useEffect } from "react";
import { getDevOrProdAPIURL } from "../data/getStonks";
import { get, post } from "../fetchWrapper";
import AddStonkForm from "../components/AddStonkForm";
import Metrics from "../components/Metrics";

export default function AddStonk() {
  const apiUrl = getDevOrProdAPIURL();
  const [stonkTicker, setStonkTicker] = useState({});
  const [stonkQuote, setStonkQuote] = useState(undefined);
  const [stonk, setStonk] = useState(undefined);
  const [futureGrowthRate, setFutureGrowthRate] = useState(0);
  const [previousGrowthRate, setPreviousGrowthRate] = useState(0);

  useEffect(() => {
    if (stonkTicker.value) getStonkQuote(stonkTicker.value);

    // since we are going to use a typeahead, this will be used when the actual stock is chosen
    async function getStonkQuote(ticker) {
      console.log(`getting ${ticker}...`);

      try {
        const fetchedStonkQuote =
          (await get(`${apiUrl}/api/quote/${ticker}`)) || false;
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
    if (stonkTicker.value && previousGrowthRate && futureGrowthRate) {
      try {
        const stonkForCalc = {
          ticker: stonkTicker.value,
          futureGrowthRate,
          previousGrowthRate
        };
        const stonk =
          (await post(`${apiUrl}/api/calculateMetrics`, stonkForCalc)) || false;

        setStonk(stonk || false);

        // also have to send the payload to an addStonk endpoint
      } catch (error) {
        console.log(
          `An error occurred while attempting to get the stonk calulation for ${stonkTicker}: ${error.toString()}`
        );
      }
    }
  }

  async function addStonkToStonks() {
    const { symbol, latestPrice } = stonkQuote;
    const stonkToSend = { ...stonk, ticker: symbol, latestPrice };

    const result = await post(`${apiUrl}/api/addStonk`, stonkToSend);
    result.ok && alert("stonk successfully added");
  }

  function setTickerAndGetQuote(ticker) {
    resetForm();
    setStonkTicker(ticker);
  }

  return (
    <article className="add-stonks">
      <AddStonkForm
        getStonkCalculation={getStonkCalculation}
        setTickerAndGetQuote={setTickerAndGetQuote}
        setInputValue={setInputValue}
        previousGrowthRate={previousGrowthRate}
        futureGrowthRate={futureGrowthRate}
      />
      <Metrics
        stonk={stonk}
        stonkQuote={stonkQuote}
        addStonkToStonks={addStonkToStonks}
      />
    </article>
  );
}
