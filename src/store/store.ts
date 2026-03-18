import { configureStore, type Middleware } from "@reduxjs/toolkit";
import cartReducer, {
  syncCart,
  addItem,
  updateQty,
  removeItem,
} from "@/features/cart/state/cartSlice";
import checkoutReducer from "@/features/checkout/state/checkoutSlice";

const SYNC_ACTIONS: Set<string> = new Set([
  addItem.type,
  updateQty.type,
  removeItem.type,
]);

function hasActionType(action: unknown): action is { type: string } {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof (action as { type: unknown }).type === "string"
  );
}

// Debounce cart sync to avoid race conditions when the user clicks +/- rapidly.
// Only the last action within 500ms triggers the PUT request.
let syncTimer: ReturnType<typeof setTimeout> | null = null;

const cartSyncMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  if (hasActionType(action) && SYNC_ACTIONS.has(action.type)) {
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      syncTimer = null;
      const { cart } = storeAPI.getState().cart;
      if (cart) {
        storeAPI.dispatch(syncCart(cart) as never);
      }
    }, 500);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    cart:     cartReducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartSyncMiddleware),
});

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
