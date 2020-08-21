import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {ThemeProvider} from "styled-components";
import {BrowserRouter} from "react-router-dom";
import theme from "./data/theme"

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
    </BrowserRouter>
    , document.getElementById("root"));
