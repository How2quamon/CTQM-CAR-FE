import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./globals.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import IndexRoute from "./routes/IndexRoute";
import { store } from "./stores/store";
import ReactGA from "react-ga4";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
//Initialize GA4
ReactGA.initialize("G-BDQJF6FEVL");
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IndexRoute />
    </Provider>
  </React.StrictMode>
);
const SendAnalytics = ()=> {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
