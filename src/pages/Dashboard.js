import React, { useContext } from "react";
import Stonk from "../components/Stonk;
import StonkSkeleton from "../components/StonkSkeleton";
import UserContext from "../data/context/UserContext";

export default function StonksDashboard() {
  const context = useContext(UserContext);

  const { stonks, isLoading } = context.state;

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
