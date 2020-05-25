import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { get } from "../data/fetchWrapper";
import { getDevOrProdAPIURL } from "../data/getStonks";

export default function CustomTypeAhead({ setTickerAndGetQuote }) {
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

        setSymbols(localSymbols);
      } catch (error) {
        console.log(`An error occurred while fetching symbols: ${error}`);
      }
    }
  }, [debouncedSymbol]);

  const setFragment = event => setSymbolFragment(event.target.value);

  return (
    <div>
      Find Ticker:
      <input type="search" list="symbols" placeholder="Ticker Symbol" onChange={setFragment} />
      <datalist id="symbols" onChange={setTickerAndGetQuote}>
        {symbols.length &&
          symbols.map((symbol, index) => (
            <option key={`option-${index}`} value={symbol.value}>
              {symbol.label}
            </option>
          ))}
      </datalist>
      {isSearching && <div>Searching...</div>}
    </div>
  );
}
