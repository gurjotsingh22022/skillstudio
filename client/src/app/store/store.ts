import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import loaderReducer from "./slices/loaderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Make sure this key `auth` exists
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
