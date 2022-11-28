import { configureStore } from "@reduxjs/toolkit";
import { rootReducer as reducer,actions } from "./src/index";

export const store = configureStore({
  reducer,
});


export {actions};