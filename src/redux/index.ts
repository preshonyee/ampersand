import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./store/user";

const reducer = combineReducers({
  user,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
