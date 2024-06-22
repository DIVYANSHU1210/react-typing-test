import { createContext, useContext, useState } from "react";

const testModeContext = createContext();



export const TestModeContextProvider = ({children})=>{
    const [testMode, setTestMode] = useState(15);

    const value = {
        testMode,
        setTestMode
    }

    return (
    <testModeContext.Provider value= {value}>
        {children}
    </testModeContext.Provider>)
}

export const useTestMode = ()=>useContext(testModeContext);