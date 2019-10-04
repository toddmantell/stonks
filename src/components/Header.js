import React from "react";

export default function Header() {
  return (
    <header className="App-header">
      <div>STONKS!</div>
      <div style={{ fontSize: "16px" }}>
        *The name of this app is a reference to{" "}
        <a
          href="https://knowyourmeme.com/memes/stonks"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white" }}
        >
          the "Stonks" meme.
        </a>
      </div>
    </header>
  );
}
