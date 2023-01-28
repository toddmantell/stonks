import React from "react";
import { Activity, Home, Plus, Sliders } from "react-feather";
import { Link } from "react-router-dom";

export default function MobileNavbar(props) {
  return (
    <div className="mobile-header">
      <Link to="/" className="nav-item">
        <span className="mobile-icon">
          <Home size={22} />
        </span>
      </Link>
      <Link to="/dashboard" className="nav-item">
        <span className="mobile-icon">
          <Activity />
        </span>
      </Link>
      <Link to="/addStonk" className="nav-item">
        <span className="mobile-icon">
          <Plus />
        </span>
      </Link>
      <Link to="/irr" className="nav-item">
        <span className="mobile-icon">
          <Sliders />
        </span>
      </Link>
    </div>
  );
}
