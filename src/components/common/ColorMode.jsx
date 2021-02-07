import React from "react";
import { useColorMode } from "@xstyled/emotion";

export function ColorMode(props) {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <header>
      <button
        onClick={(e) => {
          setColorMode(colorMode === "default" ? "dark" : "default");
        }}
      >
        Toggle {colorMode === "default" ? "Dark" : "Light"}
      </button>
    </header>
  );
}
