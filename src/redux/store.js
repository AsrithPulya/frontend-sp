import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./SidebarSlice";

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
  },
});
