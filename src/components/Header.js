import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="App-header">
      <h2 className="heading">STONKS!</h2>
      <div className="explanation-text">
        (The name of this app is a reference to{" "}
        <a
          href="https://knowyourmeme.com/memes/stonks"
          target="_blank"
          rel="noopener noreferrer"
        >
          the "Stonks" meme.)
        </a>
      </div>
      <Link to="/">Home/Dashboard</Link>
      <Link to="/addStonk">Add Stonks</Link>
    </header>
  );
}
