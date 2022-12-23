import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import "./styles/main.scss";
import allReducers from "./components/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

export const StoreContext = React.createContext({ store: null });
const store = configureStore({ reducer: allReducers });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
