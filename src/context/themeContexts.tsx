import React, { createContext, useContext } from 'react'; 
import { useMedia } from 'react-use';



export const ThemeContext = createContext({
    isDark: true, 
    setScheme: (value: "light" | "dark") => { },
});


export const ThemeProvider = (props: any) => {
    // Getting the device color theme, this will also work with react-native-web
    const colorScheme = useMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'

    /*
    * To enable changing the app theme dynamicly in the app (run-time)
    * we're gonna use useState so we can override the default device theme
    */
    const [isDark, setIsDark] = React.useState(colorScheme === "dark");

    // Listening to changes of device appearance while in run-time
    React.useEffect(() => {
        setIsDark(colorScheme === "dark");
    }, [colorScheme]);

    const defaultTheme = {
        isDark, 
        // Overrides the isDark value will cause re-render inside the context.  
        setScheme: (scheme: "light" | "dark") => setIsDark(scheme === "dark"),
    };

    return (
        <ThemeContext.Provider value={defaultTheme} >
            { props.children}
        </ThemeContext.Provider>
    );
};

// Custom hook to get the theme object returns {isDark, colors, setScheme}
export const useTheme = () => useContext(ThemeContext);