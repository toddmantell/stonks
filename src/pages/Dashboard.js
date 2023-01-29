import React, { useContext } from "react";
import MarketBanner from "../components/MarketBanner";
import StonkSkeleton from "../components/StonkSkeleton";
import UserContext from "../data/context/UserContext";
import StonkCards from "../components/StonkCards";
import SortCardsDropdown from "../components/SortCardsDropdown";
import "./dashboard.css";
import useMobileCheck from "../hooks/useMobileCheck";

export default function StonksDashboard() {
  const context = useContext(UserContext);
  const isMobile = useMobileCheck();

  const {
    removeStonk,
    sortStonks,
    state: { stonks, sortedStonks, isLoading },
  } = context;

  return isMobile ? (
    <main className="stonks-container" data-testid="stonks-container">
      <MarketBanner />
      <SortCardsDropdown dispatch={sortStonks} />
      {isLoading === true ? (
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <StonkSkeleton key={`skeleton-${item}`} />
        ))
      ) : (
        <StonkCards
          stonks={sortedStonks.length ? sortedStonks : stonks}
          removeStonk={removeStonk}
        />
      )}
    </main>
  ) : (
    <>
      <MarketBanner />
      <SortCardsDropdown dispatch={sortStonks} />
      <main className="stonks-container" data-testid="stonks-container">
        {isLoading === true ? (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <StonkSkeleton key={`skeleton-${item}`} />
          ))
        ) : (
          <StonkCards
            stonks={sortedStonks.length ? sortedStonks : stonks}
            removeStonk={removeStonk}
          />
        )}
      </main>
    </>
  );
}
