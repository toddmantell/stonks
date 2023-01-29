import React from "react";

import "./Header.css";
import DesktopHeader from "./DesktopHeader";
import MobileNavbar from "./MobileNavbar";
import useMobileCheck from "../../hooks/useMobileCheck";

export default function Header() {
  const isMobile = useMobileCheck();

  return isMobile ? <MobileNavbar /> : <DesktopHeader />;
}
