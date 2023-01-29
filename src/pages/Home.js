import React, { useContext } from "react";
import MobileHeader from "../components/Header/MobileHeader";
import UserContext from "../data/context/UserContext";

export default function Home(props) {
  const context = useContext(UserContext);
  return context.state.isMobile ? (
    <>
      <MobileHeader />
      <main className="home">WELCOME TO THE STONKS APP!</main>
    </>
  ) : (
    <main className="home">WELCOME TO THE STONKS APP!</main>
  );
}
