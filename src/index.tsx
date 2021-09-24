import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "./Components/Toastify";
import { RootProvider } from "./Context/Root";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ToastContainer />
    <RootProvider>
      <Router basename="/shop">
        <App />
      </Router>
    </RootProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
