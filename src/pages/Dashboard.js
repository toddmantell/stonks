import React, { useContext } from "react";
import MarketBanner from "../components/MarketBanner";
import StonkSkeleton from "../components/StonkSkeleton";
import UserContext from "../data/context/UserContext";
import StonkCards from "../components/StonkCards";

export default function StonksDashboard() {
  const context = useContext(UserContext);

  const {
    removeStonk,
    state: { stonks, isLoading },
  } = context;

  return (
    <>
      <MarketBanner />
      <main className="stonks-container" data-testid="stonks-container">
        {isLoading === true ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <StonkSkeleton key={`skeleton-${item}`} />
          ))
        ) : (
          <StonkCards stonks={stonks} removeStonk={removeStonk} />
        )}
      </main>
    </>
  );
}
