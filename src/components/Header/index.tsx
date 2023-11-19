import React, { useContext } from "react";
import "./Header.css";
import DesktopHeader from "./DesktopHeader";
import MobileNavbar from "./MobileNavbar";
import UserContext from "../../data/context/UserContext";

export default function Header() {
  const {
    state: { isMobile },
  } = useContext(UserContext);

  return isMobile ? <MobileNavbar /> : <DesktopHeader />;
}
