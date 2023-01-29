// eslint-disable-next-line
import React, { useState, useEffect } from "react";

export default function useMobileCheck() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 640);
  }, []);

  return isMobile;
}
