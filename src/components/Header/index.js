import React, { useEffect, useState } from "react";

import "./Header.css";
import DesktopHeader from "./DesktopHeader";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 640);
  }, []);

  return isMobile ? <MobileNavbar /> : <DesktopHeader />;
}
