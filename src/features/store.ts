import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice.ts";
import jobsSlice from "./jobs/jobsSlice.ts";

const rootReducer = combineReducers({
  user: userSlice,
  jobs: jobsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;