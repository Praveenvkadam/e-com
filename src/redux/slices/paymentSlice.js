import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // idle | loading | success | error
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    startPayment(state) {
      state.status = "loading";
      state.error = null;
    },
    paymentSuccess(state) {
      state.status = "success";
      state.error = null;
    },
    paymentError(state, action) {
      state.status = "error";
      state.error = action.payload || "Payment failed";
    },
    resetPayment(state) {
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  startPayment,
  paymentSuccess,
  paymentError,
  resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
