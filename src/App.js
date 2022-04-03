import React, { useState } from "react";
import "./styles/app.css";
import ReactRouterSetup from "../src/Router";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`

function App() {
  const [theme, setTheme] = useState("dark");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div>
      <ReactRouterSetup />
      <br></br>
      <br></br>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>
          <label className="toggle">
            <input type="checkbox" onChange={() => themeToggler()}></input>
            <span className="slider"></span>
            <br></br>
            <h4 className="toggle_title">Change Theme</h4>
          </label>
        </StyledApp>
      </ThemeProvider>
      <br></br>
    </div>
  );
}
/*const App = () => {
  return (
    <div>
      <ReactRouterSetup />
    </div>
  );
};*/

export default App;