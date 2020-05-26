import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { get } from "../data/fetchWrapper";
import { getDevOrProdAPIURL } from "../data/getStonks";

export default function CustomTypeAhead({ setTickerAndGetQuote, css = {textbox: "textbox"} }) {
  const APIURL = getDevOrProdAPIURL();
  const DEBOUNCETIME = 1000;

  const [symbolFragment, setSymbolFragment] = useState("");
  const [symbols, setSymbols] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [debouncedSymbol] = useDebounce(symbolFragment, DEBOUNCETIME);

  useEffect(() => {
    if (debouncedSymbol) {
      setIsSearching(true);
      getSymbols();
      setIsSearching(false);
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
        if (!localSymbols.length) {
          setSymbols([]);
          throw new Error(`Could not fetch symbols for ${symbolFragment}`);
        }

        if (localSymbols && localSymbols.length > 20) return setSymbols(localSymbols.slice(0,20));

        setSymbols(localSymbols);
      } catch (error) {
        console.log(`An error occurred while fetching symbols: ${error}`);
      }
    }
  }, [debouncedSymbol]);

  // Because you can't directly select the datalist, we have to set the ticker for the quote
  // if it matches a symbol, since the symbols will get retrieved only after symbol lookup
  const handleChange = ({ target }) => {
    symbols.length && symbols.forEach(symbol => {
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
        {symbols.length &&
          symbols.map((symbol, index) => (
            <option key={`option-${index}`} value={symbol.value}>
              {symbol.label}
            </option>
          ))}
      </datalist>
      {isSearching && <div>Searching...</div>}
    </>
  );
}
