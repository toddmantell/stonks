import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { toast } from 'react-toastify';

import { get } from "../data/fetchWrapper";
import { getDevOrProdAPIURL } from "../data/getStonks";

export default function CustomTypeAhead({ setTickerAndGetQuote, css = {textbox: "textbox"} }) {
  const APIURL = getDevOrProdAPIURL();
  const DEBOUNCETIME = 500;

  const [symbolFragment, setSymbolFragment] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [debouncedSymbol] = useDebounce(symbolFragment, DEBOUNCETIME);

  useEffect(() => {
    if (debouncedSymbol) {
      setIsSearching(true);
      getSymbols();
    } else {
      setSymbols([]);
    }

    async function getSymbols() {
      try {
        const localSymbols = await get(`${APIURL}/api/stock/symbol/${symbolFragment}`);
        // localStorage.symbols = JSON.stringify({
        //   ...symbols,
        //   lastUpdated: Date.now()
        // });
        if (!localSymbols[0]) {
          setSymbols([]);
          setIsSearching(false);
          return toast.error(`Could not find symbols for ${symbolFragment}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined});
        }

        if (localSymbols && localSymbols.length > 20) {
          setIsSearching(false);
          return setSymbols(localSymbols.slice(0,20));
        }

        setSymbols(localSymbols);
        setIsSearching(false);
      } catch (error) {
        console.log(`An error occurred while fetching symbols: ${error}`);
      }
    }
  }, [debouncedSymbol]);

  // Because you can't directly select the datalist, we have to set the ticker for the quote
  // if it matches a symbol, since the symbols will get retrieved only after symbol lookup
  const handleChange = ({ target }) => {
    target.value && symbols[0] && symbols.forEach(symbol => {
      if (symbol.value === target.value) setTickerAndGetQuote(symbol)
    });

    // It still sets the fragment again, so we would like to avoid this double call if possible
    setSymbolFragment(target.value);
  }

  return (
    <>
      <input
      className={css.textbox}
      type="text"
      list="symbols"
      placeholder="Ticker Symbol"
      autoComplete="on"
      onChange={handleChange}
      maxLength="5" />
      <datalist id="symbols">
        {symbols.length && symbols[0] &&
          symbols.map((symbol, index) => (
            <option key={`option-${index}`} value={symbol.value}>
              {symbol.label}
            </option>
          ))}
      </datalist>
      <span>{isSearching && <span>searching</span>}</span>
    </>
  );
}
