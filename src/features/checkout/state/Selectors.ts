import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

export const selectCheckoutState  = (state: RootState) => state.checkout;
export const selectCheckoutOrder  = (state: RootState) => state.checkout.order;
export const selectCheckoutStatus = (state: RootState) => state.checkout.status;
export const selectCheckoutError  = (state: RootState) => state.checkout.error;

export const selectIsSubmitting = createSelector(
  selectCheckoutStatus,
  (status) => status === "submitting"
);

export const selectIsSuccess = createSelector(
  selectCheckoutStatus,
  (status) => status === "success"
);
