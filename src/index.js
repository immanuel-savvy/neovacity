import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Neovacity from "./Neovacity";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga";

const tracking_id = "UA-260523014-1";
ReactGA.initialize(tracking_id);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Neovacity />
  </React.StrictMode>
);

const send_analytics = () =>
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(send_analytics);
