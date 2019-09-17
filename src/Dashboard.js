import React, { useState, useEffect } from "react";
import getStonks from "./data/getStonks";
import Stonk from "./components/stonk";
import AddStonk from "./components/AddStonk";

//TODO:
//Should there be a refresh button? Or auto-refresh?

export default function Dashboard() {
  const [stonks, setStonks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.stonks)
        return setStonks(JSON.parse(localStorage.stonks));

      const result = await getStonks();
      setStonks(result);
      // stringify is necessary because items in local storage are stored as strings
      localStorage.stonks = JSON.stringify(result);
    };

    fetchData();
  }, []);

  return (
    <main className="stonks-container">
      {stonks.length &&
        stonks.map((stonk, index) => {
          return <Stonk key={`stonk-${index}`} {...stonk} />;
        })}
      <hr />
      <AddStonk />
    </main>
  );
}
