import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import "./styles/main.scss";
import { Provider } from "react-redux";
import { store } from "./components/store";

export const StoreContext = React.createContext({ store: null });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
