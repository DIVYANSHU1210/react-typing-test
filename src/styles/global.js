import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle `
body{
    background-color: ${({theme})=>theme.background};
    color: ${({theme})=>theme.textColor};
    margin: 0;
    padding: 0;
    transition: all .3s ease;
}

.canvas{
    display : grid;
    min-height:100vh;
    grid-auto-flow: row;
    grid-template-rows: auto 1fr auto;  
    /* grid-template-columns: 1fr; */
    width: 100vw;
    align-items: center;
    text-align: center;
}


  
.typingBox{
    display: block;
    max-width: 1000px;
    height: 140px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    color : ${({theme})=>theme.typingBoxColor}
}

.words{
    display: flex;
    flex-wrap: wrap;
    font-size: 32px;
}
.word{
    padding: .2rem;
}

.hidden-input{
    opacity: 0;
}

.current-letter{
    border-left: 1px solid;
    animation: blinking 2s infinite;
}

.current-letter-right{
    border-right: 1px solid;
    animation: blinking-right 2s infinite;
}

@keyframes blinking{
    0%{border-left-color: white}
    25%{border-left-color: black}
    50%{border-left-color: white}
    75%{border-left-color: black}
    100%{border-left-color: white}
}

@keyframes blinking-right {
    0%{border-right-color: white}
    25%{border-right-color: black}
    50%{border-right-color: white}
    75%{border-right-color: black}
    100%{border-right-color: white}
}

.correct{
    color: rgb(12, 193, 12);
}

.incorrect{
    color: red;
}


.upper-menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

#test-mode{
        outline: none;
        background-color: ${({theme})=>theme.background};
        color: white;
        padding: .5rem;
        border: 1px solid white;
}

#test-mode>option{
    background: ${({theme})=>theme.background};
    color: white;
    border-top: 1px solid white;
}


.footer{
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom : 1rem;
    
    
}

.test-results{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
`