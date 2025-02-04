import React, { createContext, useContext } from "react";
import { useMedia } from "react-use";

export const ThemeContext = createContext({
  isDark: true,
  setScheme: (value: "light" | "dark") => {},
});

export const ThemeProvider = (props: any) => {
  // Getting the device color theme, this will also work with react-native-web
  const colorScheme = useMedia("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  const [isDark, setIsDark] = React.useState(colorScheme === "dark");
  React.useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    setScheme: (scheme: "light" | "dark") => setIsDark(scheme === "dark"),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
