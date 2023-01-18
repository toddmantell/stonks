import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ValuationProbabilities from "../components/ValuationProbabilities";
import UserContext from "../data/context/UserContext";

import "../components/typeahead.css";
import IRRWidget from "../components/CalculateIRR";

export default function StonkDetails(props) {
  const { stonks } = useContext(UserContext).state;
  const { ticker = "" } = useParams();

  console.log("search params", ticker);

  // const [localTicker, setLocalTicker] = useState("");
  const [chosenStonk, setChosenStonk] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (ticker && stonks.length) {
      const currentStonk = stonks.find((s) => s.symbol === currentStonk);
      setChosenStonk(currentStonk);
    }
  }, []);

  const setTickerAndPassStonk = (stonk) => {
    stonk && setChosenStonk(stonk);
  };

  return (
    <main style={{ maxWidth: "20rem", marginLeft: "5rem" }}>
      <LocalTypeahead
        stonks={stonks}
        setTickerAndPassStonk={setTickerAndPassStonk}
      />
      <div>
        <div>Name: {chosenStonk.companyName}</div>
        <div>Ticker: {chosenStonk.symbol}</div>
        <div>EPS: {chosenStonk.ttmEPS}</div>
        <div>latestPrice: {chosenStonk.latestPrice}</div>
      </div>
      <IRRWidget stonk={chosenStonk} setChartData={setChartData} />
      <ValuationProbabilities data={chartData} />
      <div>
        <div>Name: {chosenStonk.companyName}</div>
        <div>Ticker: {chosenStonk.symbol}</div>
        <div>EPS: {chosenStonk.ttmEPS}</div>
      </div>
    </main>
  );
}

// Re-using the Typeahead for a non-api use case; should look at refactoring the typeahead for both use cases
function LocalTypeahead({
  setTickerAndPassStonk = () => console.log("no handler provided to typeahead"),
  stonks,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");

  const onTextChange = (e) => {
    const { value = "" } = e.target;
    setText(value.toUpperCase());
  };

  useEffect(() => {
    let localSuggestions = stonks.slice();
    if (stonks && stonks.length > 0) {
      const regex = new RegExp(`^${text}`, `i`);
      localSuggestions.filter((stonks) => regex.test(stonks.value));
    }

    setSuggestions(localSuggestions);
  }, [text]);

  const renderSuggestions = () => {
    console.log("suggestions :", suggestions);
    if (!suggestions || suggestions.length === 0) {
      return null;
    }

    const filteredSuggestions =
      stonks.filter((stonk) => stonk.symbol.includes(text)) || [];

    const suggestionSelected = (stonk) => {
      setTickerAndPassStonk(stonk);
      setText(stonk.symbol + " - " + stonk.companyName);
      setSuggestions([]);
    };

    return (
      <ul>
        {text &&
          filteredSuggestions.map((stonk, index) => (
            <li key={index} onClick={(e) => suggestionSelected(stonk)}>
              {stonk.symbol} {stonk.companyName}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div style={{ maxWidth: "20rem" }}>
      <div className="TypeAheadDropDown">
        <input
          onChange={onTextChange}
          onClick={(e) => setText("")}
          placeholder="Search Stonk"
          value={text}
          type="text"
        />
        {renderSuggestions()}
      </div>
    </div>
  );
}
