import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,     // firebase user object
  loading: true,  // true until first auth check completes
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearAuthUser: (state) => {
      state.user = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuthUser, clearAuthUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
