import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder }    from "../api/createOrder";
import { clearCartAsync } from "@/features/cart/state/cartSlice";
import type { Cart }             from "@/shared/types/Cart";
import type { CheckoutFormData } from "@/shared/types/CheckoutFormData";
import type { Order }            from "@/shared/types/Order";

export interface CheckoutState {
  order:  Order | null;
  status: "idle" | "submitting" | "success" | "error";
  error:  string | null;
}

const initialState: CheckoutState = {
  order:  null,
  status: "idle",
  error:  null,
};

export const submitOrder = createAsyncThunk<
  Order,
  { cart: Cart; form: CheckoutFormData }
>(
  "checkout/submitOrder",
  async ({ cart, form }, { dispatch }) => {
    const order = await createOrder(cart, form);
    // clearCartAsync : supprime l'ancien panier ET crée un nouveau de façon atomique.
    // Évite le state null transitoire de resetCart() qui pouvait déclencher la
    // redirection vers /cart ou causer des race conditions avec cartSyncMiddleware.
    await dispatch(clearCartAsync(cart.id));
    return order;
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    resetCheckout(state) {
      state.order  = null;
      state.status = "idle";
      state.error  = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = "submitting";
        state.error  = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.order  = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = "error";
        state.error  = action.error.message ?? "Error while placing the order.";
      });
  },
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
