import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./reducers";

export const store = configureStore({ reducer: allReducers });
