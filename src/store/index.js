import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("user", serializedState);
  } catch {
    console.log("error");
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
