import React from "react";
import AsyncSelect from "react-select/async";
import { get } from "../fetchWrapper";
import { getDevOrProdAPIURL } from "../data/getStonks";

export default function TypeAhead({ handleInputChange, defaults }) {
  async function getSymbols(inputValue) {
    const apiURL = getDevOrProdAPIURL();
    return await get(`${apiURL}/symbolsQuery/${inputValue}`);
  }

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={defaults}
      loadOptions={getSymbols}
      onChange={handleInputChange}
    />
  );
}
