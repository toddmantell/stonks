import React, { useContext } from "react";
import Stonk from "../components/stonk/Stonk";
import UserContext from "../data/context/UserContext";

//TODO:
//Should there be a refresh button? Or auto-refresh?

export default function Dashboard(props) {
  console.log("Context:", UserContext);

  const { stonks } = useContext(UserContext);

  return (
    <main className="stonks-container">
      {stonks.length
        ? stonks.map((stonk, index) => {
            return <Stonk key={`stonk-${index}`} {...stonk} />;
          })
        : null}
    </main>
  );
}
