import React, { useState } from 'react'
import { themeOptions } from '../utils/themeOptions'
import Select from 'react-select'
import { useTheme } from '../context/ThemeContext'

function Footer() {
    const {theme, setTheme} = useTheme();
    const handleChange = (e)=>{
        setTheme(e.value);
        localStorage.setItem('my-theme', JSON.stringify(e.value));
    } 
    return (

    <div >
        <div className='footer'>
            <div className='social'>social</div>
            <div className='theme-section'>
                <Select
                    onChange={handleChange}
                    options={themeOptions}
                    menuPlacement='top'
                    defaultValue={{label: theme.label, value: theme}}
                    styles={{
                        control: (styles)=> ({...styles, backgroundColor : theme.background}),
                        menu : (styles)=>({...styles, backgroundColor : theme.background}),
                        option : (styles, {isFocused})=>{
                            return {
                                ...styles,
                                color : (!isFocused)? theme.textColor : theme.background,
                                backgroundColor : (!isFocused)? theme.background : theme.textColor,
                                cursor :"pointer"
                            }
                        }
                    }}
                />
            </div>
        </div>
        
    </div>
  )
}

export default Footer