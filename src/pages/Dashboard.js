import React, { useState, useEffect } from "react";
import getStonks from "../data/getStonks";
import Stonk from "../components/stonk/Stonk";
import StonkSkeleton from "../components/StonkSkeleton";

export default function Dashboard() {
  const [stonks, setStonks] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStonks();

        if (!result.length) {
          // we probably would rather have a better UX for this, but for a ProofOfC this suffices
          window.alert(
            "Failed to retrieve stonks. You are viewing stale data."
          );
          setIsLoading(false);
          return setStonks(JSON.parse(localStorage.stonks));
        }

        return checkForUpdatedStonks(result);
      } catch (error) {
        console.log(error);
      }
    };

    function checkForUpdatedStonks(fetchResult) {
      if (localStorage.stonks) {
        for (let i = 0; i < fetchResult.length; i += 1) {
          const stonksInLocalStorage =
            localStorage.stonks && JSON.parse(localStorage.stonks);

          const currentStonkInStorage = stonksInLocalStorage.find(
            stonk => stonk.symbol === fetchResult[i].symbol
          );

          if (
            currentStonkInStorage.latestPrice !== fetchResult[i].latestPrice
          ) {
            setUpdated(true);
          }

          if (!updated) {
            setIsLoading(false);
            return setStonks(JSON.parse(localStorage.stonks));
          }
        }
      }

      setStonks(fetchResult);
      setIsLoading(false);
      // stringify is necessary because items in local storage are stored as strings
      localStorage.stonks = JSON.stringify(fetchResult);
    }

    fetchData();
  }, []);

  return (
    <main className="stonks-container">
      {isLoading === true
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <StonkSkeleton key={`skeleton-${item}`} />
          ))
        : stonks.map((stonk, index) => {
            return <Stonk key={`stonk-${index}`} {...stonk} />;
          })}
    </main>
  );
}
