import React, { useState, useEffect } from "react";
import getStonks from "../data/getStonks";
import Stonk from "../components/stonk/stonk";

//TODO:
//Should there be a refresh button? Or auto-refresh?

export default function Dashboard() {
  const [stonks, setStonks] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStonks();

        if (!result.length) {
          // we probably would rather have a better UX for this, but for a ProofOfC this suffices
          window.alert(
            "Failed to retrieve stonks. You are viewing stale data."
          );
          return setStonks(JSON.parse(localStorage.stonks));
        }

        return checkForUpdatedStonks(result);
      } catch (error) {
        console.log(error);
      }
    };

    function checkForUpdatedStonks(fetchResult) {
      for (let i = 0; i < fetchResult.length; i += 1) {
        const stonksInLocalStorage =
          localStorage.stonks && JSON.parse(localStorage.stonks);

        const currentStonkInStorage = stonksInLocalStorage.find(
          stonk => stonk.localTicker === fetchResult[i].localTicker
        );

        if (currentStonkInStorage.latestPrice !== fetchResult[i].latestPrice) {
          setUpdated(true);
        }
      }

      if (!updated) return setStonks(JSON.parse(localStorage.stonks));

      setStonks(fetchResult);
      // stringify is necessary because items in local storage are stored as strings
      localStorage.stonks = JSON.stringify(fetchResult);
    }

    fetchData();
  }, []);

  return (
    <main className="stonks-container">
      {stonks.length &&
        stonks.map((stonk, index) => {
          return <Stonk key={`stonk-${index}`} {...stonk} />;
        })}
    </main>
  );
}
