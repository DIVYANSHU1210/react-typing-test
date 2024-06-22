import { createContext, useContext, useState } from "react";
import { themeOptions } from "../utils/themeOptions";

const themeContext = createContext();

const ThemeContextProvider = ({children})=>{
    const myTheme = JSON.parse(localStorage.getItem("my-theme")) || themeOptions[0].value;
    // console.log("myTheme - ",myTheme);
    const [theme, setTheme] = useState(myTheme);
    const value = {
        theme , setTheme
    }
    return (
        <themeContext.Provider value={value}>{children}</themeContext.Provider>
    )
}

export default ThemeContextProvider;
export const useTheme = ()=> useContext(themeContext);  