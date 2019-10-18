import React from "react";
import AsyncSelect, { makeAsyncSelect } from "react-select/async";
import { get } from "../fetchWrapper";
import { getDevOrProdAPIURL } from "../data/getStonks";

const promiseOptions = async inputValue => {
  const apiURL = getDevOrProdAPIURL();
  return await get(`${apiURL}/symbolsQuery/${inputValue}`);
};

const TypeAhead = ({ handleInputChange }) => (
  <AsyncSelect
    cacheOptions
    defaultOptions={[{ value: "default", label: "default" }]}
    loadOptions={promiseOptions}
    onChange={handleInputChange}
  />
);

export default TypeAhead;
