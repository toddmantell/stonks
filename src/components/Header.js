import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../data/context/UserContext";

export default function Header() {
  const context = useContext(UserContext);
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
            <Link to="/" className="nav-item">
              Home/Dashboard
            </Link>
            <Link to="/addStonk" className="nav-item">
              Add Stonks
            </Link>
            <Link to="/irr" className="nav-item">
              IRR
            </Link>
            <span style={{ margin: "15px 0 0 500px" }}>
              {context.state.user.name}
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
}
