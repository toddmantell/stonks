import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header container">
        <div className="app-header banner">
          <a
            className="logo-name"
            href="https://knowyourmeme.com/memes/stonks"
            target="_blank"
            rel="noopener noreferrer"
          >
            STONKS!
          </a>
          {/* This might need to become a tooltip  <div className="explanation-text">
            (The name of this app is a reference to{" "}
            <a
              href="https://knowyourmeme.com/memes/stonks"
              target="_blank"
              rel="noopener noreferrer"
            >
              the "Stonks" meme.)
            </a>
					</div> */}
          <nav className="header nav">
            {" "}
            <Link to="/">Home/Dashboard</Link>
            <Link to="/addStonk">Add Stonks</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
