import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TestModeContextProvider } from './context/TestModeContext.jsx'
import ThemeContextProvider from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
        <ThemeContextProvider>
            <TestModeContextProvider>
                <App />
            </TestModeContextProvider>
        </ThemeContextProvider>
        
    
)
