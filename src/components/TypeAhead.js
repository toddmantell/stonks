import React, { useState, useEffect } from "react";
import "./typeahead.css";
import { get } from "../data/fetchWrapper";
import { getDevOrProdAPIURL } from "../data/getStonks";

const APIURL = getDevOrProdAPIURL();

export default function Typeahead({
  setTickerAndGetQuote = () => console.log("no handler provided to typeahead"),
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");

  const onTextChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  useEffect(() => {
    const debounceAndFetchData =
      text &&
      setTimeout(async () => {
        console.log("timeout started: ", text);
        try {
          const tickers = await get(`${APIURL}/api/stock/symbol/${text}`);

          let localSuggestions;
          if (tickers && tickers.length > 0) {
            const regex = new RegExp(`^${text}`, `i`);
            localSuggestions = tickers
              .sort()
              .filter((ticker) => regex.test(ticker.value));
          }

          setSuggestions(localSuggestions);
        } catch (e) {
          console.log(e);
        }
      }, 750);

    return () => clearTimeout(debounceAndFetchData);
  }, [text]);

  const suggestionSelected = (stonk) => {
    setTickerAndGetQuote(stonk);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    console.log("suggestions :", suggestions);
    if (!suggestions || suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((stonk, index) => (
          <li key={index} onClick={(e) => suggestionSelected(stonk)}>
            {stonk.value} {stonk.label}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="TypeAheadDropDown">
      <input
        onChange={onTextChange}
        placeholder="Search Stonks"
        value={text}
        type="text"
      />
      {renderSuggestions()}
    </div>
  );
}
