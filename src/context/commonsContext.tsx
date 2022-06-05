import React, { createContext, useContext } from 'react'; 
import { useMedia } from 'react-use';



export const CommonsContext = createContext({
    title: '', 
    setTitle: (value: string) => { },
});


export const CommonsProvider = (props: any) => {
    const [title, setTitle] = React.useState('');

    const defaultTheme = {
        title, 
        // Overrides the isDark value will cause re-render inside the context.  
        setTitle: (scheme: string) => setTitle(scheme),
    };

    return (
        <CommonsContext.Provider value={defaultTheme} >
            { props.children}
        </CommonsContext.Provider>
    );
};

 
export const useCommons = () => useContext(CommonsContext);