import React, { useState, useEffect, useContext } from "react";
import { getDevOrProdAPIURL } from "../data/getStonks";
import { get, post } from "../data/fetchWrapper";
import AddStonkForm from "../components/AddStonkForm.js";
import Metrics from "../components/Metrics";
import UserContext from "../data/context/UserContext";
import MobileHeader from "../components/Header/MobileHeader";
import "./addstonk.css";

export default function AddStonk() {
  const [apiUrl] = useState(getDevOrProdAPIURL());
  const [stonkTicker, setStonkTicker] = useState({});
  const [stonkQuote, setStonkQuote] = useState(undefined);
  const [stonk, setStonk] = useState(undefined);
  const [futureGrowthRate, setFutureGrowthRate] = useState(0);
  const [previousGrowthRate, setPreviousGrowthRate] = useState(0);

  const context = useContext(UserContext);
  const { isMobile } = context.state;

  useEffect(() => {
    if (stonkTicker.value) getStonkQuote(stonkTicker.value);

    // Since we are going to use a typeahead, this will be used when the actual stock is chosen.
    async function getStonkQuote(ticker) {
      try {
        const fetchedStonkQuote =
          (await get(`${apiUrl}/api/stock/quote/${ticker}`)) || false;
        return setStonkQuote(fetchedStonkQuote);
      } catch (error) {
        console.log(`failed to fetch ${ticker}: ${error.toString()}`);
        resetForm();
        return setStonkQuote(false);
      }
    }
  }, [stonkTicker.value, apiUrl]);

  function resetForm() {
    console.log("resetting the form");
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
      default:
        return undefined;
    }
  }

  async function getStonkCalculation(event) {
    event.preventDefault();
    console.log("getting stonk info...");
    console.log(
      `${stonkTicker.value} && ${previousGrowthRate} && ${futureGrowthRate}`
    );
    if (stonkTicker.value && previousGrowthRate && futureGrowthRate) {
      try {
        const stonkForCalc = {
          ticker: stonkTicker.value,
          futureGrowthRate,
          previousGrowthRate,
        };
        const stonk =
          (await post(`${apiUrl}/api/stock/calculateMetrics`, stonkForCalc)) ||
          false;

        setStonk({ ...stonk, companyName: stonkQuote.companyName } || false);

        // also have to send the payload to an addStonk endpoint
      } catch (error) {
        console.log(
          `An error occurred while attempting to get the stonk calulation for ${stonkTicker}: ${error.toString()}`
        );
      }
    }
  }

  async function addStonk() {
    const {
      user: { id: userId },
    } = context.state;

    const stonkToAdd = {
      ticker: stonkTicker.value,
      companyName: stonk.companyName,
      bookValuePerShare: 5, // this is hard-coded for now but needs to get updated
      projectedEPSGrowth: futureGrowthRate,
      fiveYearGrowthRate: previousGrowthRate,
    };

    const result = await context.addStonkToStonks(userId, stonkToAdd);
    result && result.length && alert("stonk successfully added");
    resetForm();
    setStonkQuote(undefined);
  }

  function setTickerAndGetQuote(ticker) {
    resetForm();
    setStonkTicker(ticker);
  }

  return (
    <>
      {isMobile && <MobileHeader pageName="ADD STONK" />}
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
          addStonkToStonks={addStonk}
        />
      </article>
    </>
  );
}
