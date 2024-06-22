import Footer from "./Componetns/Footer";
import TypingBox from "./Componetns/TypingBox"
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global"
// import "./styles/app.css";
import { useTheme } from "./context/ThemeContext";


function App() {
  const {theme, setTheme} = useTheme();
 
  return (
    <ThemeProvider theme = {theme}>
      <div className="canvas">
          <GlobalStyles/>
          <div>header</div>
          <TypingBox/>
          <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default App
