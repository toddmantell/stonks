import React, { useState, useEffect } from "react";
import getStonks from "./data/getStonks";
import Stonk from "./components/stonk";

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
    <main>
      {stonks.length &&
        stonks.map((stonk, index) => {
          return <Stonk key={`stonk-${index}`} {...stonk} />;
        })}
    </main>
  );
}
