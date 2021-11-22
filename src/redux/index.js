import { configureStore } from "@reduxjs/toolkit";
import { rootReducer as reducer } from "primary_care_admin_binder";

export const store = configureStore({
  reducer,
});
