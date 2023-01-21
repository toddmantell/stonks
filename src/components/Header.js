import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Activity, Home, Plus, Sliders } from "react-feather";
import UserContext from "../data/context/UserContext";
import "./Header.css";

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
              <span className="icon">
                <Home size={22} />
              </span>{" "}
              Home
            </Link>
            <Link to="/dashboard" className="nav-item">
              <span className="icon">
                <Activity />
              </span>{" "}
              Dashboard
            </Link>
            <Link to="/addStonk" className="nav-item">
              <span className="icon">
                <Plus />
              </span>{" "}
              Add Stonks
            </Link>
            <Link to="/irr" className="nav-item">
              <span className="icon">
                <Sliders />
              </span>{" "}
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
