import { configureStore } from "@reduxjs/toolkit";
import { rootReducer as reducer } from "idm_binder";

export const store = configureStore({
  reducer,
});
