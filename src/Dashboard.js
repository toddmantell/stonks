import React, { useState, useEffect } from "react";
import getStonks from "./data/getStonks";
import Stonk from "./components/stonk";

export default function Dashboard() {
  const [stonks, setStonks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getStonks();
      setStonks(result);
    };

    fetchData();
  }, []);

  console.log("stonks in comp", stonks);

  return (
    <main>
      {stonks.length &&
        stonks.map((stonk, index) => {
          return <Stonk key={`stonk-${index}`} {...stonk} />;
        })}
    </main>
  );
}
