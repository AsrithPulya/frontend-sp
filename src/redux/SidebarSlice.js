import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    refreshNavbar: false,
  },
  reducers: {
    triggerNavbarRefresh: (state) => {
      state.refreshNavbar = !state.refreshNavbar; // Toggle state to trigger re-render
    },
  },
});

export const { triggerNavbarRefresh } = navbarSlice.actions;
export default navbarSlice.reducer;
