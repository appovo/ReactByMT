import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware } from "redux";

import thunk from "redux-thunk";
import allReducers from "../reducers";

export const store = configureStore(
  { reducer: allReducers },
  composeWithDevTools(applyMiddleware(thunk))
);
