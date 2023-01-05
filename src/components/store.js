import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";

import thunk from "redux-thunk";
import allReducers from "./reducers";

export const store = configureStore(
  { reducer: allReducers },
  applyMiddleware(thunk)
);
