import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditProfileOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openEditProfile(state) {
      state.isEditProfileOpen = true;
    },
    closeEditProfile(state) {
      state.isEditProfileOpen = false;
    },
  },
});

export const { openEditProfile, closeEditProfile } = uiSlice.actions;
export default uiSlice.reducer;
