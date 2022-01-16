import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return {
    windowWidth,
    windowHeight,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    innerWidth: 0,
    innerHeight: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
