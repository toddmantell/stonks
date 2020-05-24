import React from "react";
import AsyncSelect from "react-select/async";
import { get } from "../data/fetchWrapper";
import { getDevOrProdAPIURL } from "../data/getStonks";

export default function TypeAhead({ handleInputChange, defaults }) {
  async function getSymbols(inputValue) {
    const apiURL = getDevOrProdAPIURL();
    return (await get(`${apiURL}/api/stock/symbol/${inputValue}`)) || [];
  }

  return (
    <AsyncSelect
      cacheOptions={true}
      defaultOptions={defaults}
      loadOptions={getSymbols}
      onChange={handleInputChange}
      className="typeahead"
    />
  );
}
