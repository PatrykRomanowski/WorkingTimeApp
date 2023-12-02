// FontContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import * as Font from "expo-font";

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "RubikMonoOne-Regular": require("../assets/fonts/RubikMonoOne-Regular.ttf"),
        "Monoton-Regular": require("../assets/fonts/Monoton-Regular.ttf"),
        "Pock-Regular": require("../assets/fonts/POCKC___.ttf"),
        "LED-Regular": require("../assets/fonts/LED.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
        "Bebas-Regular": require("../assets/fonts/BebasNeue-Regular.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {fontsLoaded && children}
    </FontContext.Provider>
  );
};

export const useFonts = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFonts must be used within a FontProvider");
  }
  return context;
};
