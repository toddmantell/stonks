import React from "react";

export default ({ pageName = "STONKS" }) => (
  <div className="mobile-header">
    <div className="mobile-header-container">
      <span>
        <img
          className="mobile-header-image"
          src="../../../stonks.jpg"
          alt="header-logo"
        />
      </span>
      <span className="mobile-header-text">{pageName}</span>
    </div>
  </div>
);
