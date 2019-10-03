import React, { useState, useEffect } from "react";
import getStonks from "../data/getStonks";
import Stonk from "../components/stonk";

//TODO:
//Should there be a refresh button? Or auto-refresh?

export default function Dashboard() {
  const [stonks, setStonks] = useState([]);
  const [staleData, setStaleDataStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getStonks();
      let updated = false;

      if (!result.length) {
        console.log("result: ", result);
        setStaleDataStatus(true);
        return setStonks(JSON.parse(localStorage.stonks));
      }

      for (let i = 0; i < result.length; i += 1) {
        const stonksInLocalStorage =
          localStorage.stonks && JSON.parse(localStorage.stonks);
        const currentStonkInStorage = stonksInLocalStorage.find(
          stonk => stonk.localTicker === result[i].localTicker
        );
        console.log(
          "currentStonkInStorage: ",
          currentStonkInStorage.localTicker
        );

        if (currentStonkInStorage.latestPrice !== result[i].latestPrice) {
          updated = true;
        }
      }

      if (!updated) return setStonks(JSON.parse(localStorage.stonks));

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
      {staleData && (
        <div style={{ color: "red" }}>
          Failed to retrieve stonks. You are viewing old data.
        </div>
      )}
    </main>
  );
}
