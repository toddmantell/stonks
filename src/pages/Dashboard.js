import React, { useContext } from "react";
import Stonk from "../components/Stonk";
import NCAVStonk from "../components/NCAVStonk";
import StonkSkeleton from "../components/StonkSkeleton";
import UserContext from "../data/context/UserContext";

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
        : stonks.map((stonk, index) => {
            return stonk.priceAsPercentOfNCAV > 0 &&
              stonk.priceAsPercentOfNCAV < 100 ? (
              <NCAVStonk
                key={`stonk-${index}`}
                {...{ ...stonk, removeStonk }}
              />
            ) : (
              <Stonk key={`stonk-${index}`} {...{ ...stonk, removeStonk }} />
            );
          })}
    </main>
  );
}
