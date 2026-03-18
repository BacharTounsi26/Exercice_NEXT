import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

export const selectCartState  = (state: RootState) => state.cart;
export const selectCart       = (state: RootState) => state.cart.cart;
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectCartError  = (state: RootState) => state.cart.error;

export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart?.items ?? []
);

export const selectCartCount = createSelector(
  selectCartItems,
  (items) => items.reduce((acc, i) => acc + i.qty, 0)
);

export const selectCartSubTotal = createSelector(
  selectCart,
  (cart) => cart?.subTotal ?? 0
);

export const selectCartTax = createSelector(
  selectCart,
  (cart) => cart?.tax ?? 0
);

export const selectCartTotal = createSelector(
  selectCart,
  (cart) => cart?.total ?? 0
);

export const selectIsCartEmpty = createSelector(
  selectCartItems,
  (items) => items.length === 0
);

export const selectIsSyncing = createSelector(
  selectCartStatus,
  (status) => status === "syncing"
);
