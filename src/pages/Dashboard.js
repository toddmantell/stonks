import React, { useContext } from "react";
import StonkSkeleton from "../components/StonkSkeleton";
import UserContext from "../data/context/UserContext";
import StonkCards from "../components/StonkCards";

export default function StonksDashboard() {
  const context = useContext(UserContext);

  const {
    removeStonk,
    state: { stonks, isLoading }
  } = context;

  return (
    <main className="stonks-container">
      {isLoading === true
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
            <StonkSkeleton key={`skeleton-${item}`} />
          ))
        : <StonkCards stonks={stonks} options={["By Ticker", "By Co. Name", "By Undervalued"]} />}
    </main>
  );
}
