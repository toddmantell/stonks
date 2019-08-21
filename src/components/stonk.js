import React from "react";

export default function Stonk({ companyName, localTicker }) {
  return (
    <figure>
      <div>Company Name: {companyName}</div>
      <div>Ticker Symbol: {localTicker}</div>
    </figure>
  );
}
