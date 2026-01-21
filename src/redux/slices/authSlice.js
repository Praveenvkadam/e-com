import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    clearAuthUser(state) {
      state.user = null;
      state.loading = false;
    },
    updateUserProfile(state, action) {
      if (!state.user) return;

      state.user = {
        ...state.user,
        displayName: action.payload.displayName ?? state.user.displayName,
        photoURL: action.payload.photoURL ?? state.user.photoURL,
      };
    },
  },
});

export const {
  setAuthUser,
  clearAuthUser,
  updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
