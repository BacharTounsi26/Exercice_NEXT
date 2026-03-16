import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createCart }  from "../api/createCart";
import { getCart }     from "../api/getCart";
import { updateCart }  from "../api/updateCart";
import { deleteCart }  from "../api/deleteCart";
import type { Cart }     from "@/shared/types/Cart";
import type { CartItem } from "@/shared/types/CartItem";
import type { Product }  from "@/shared/types/Product";

const TAX_RATE    = 0.20;
const STORAGE_KEY = "cart_id";

// ── Helpers ────────────────────────────────────────────────────────────────

function computeTotals(items: CartItem[]): Pick<Cart, "subTotal" | "tax" | "total"> {
  const subTotal = +items.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
  const tax      = +(subTotal * TAX_RATE).toFixed(2);
  const total    = +(subTotal + tax).toFixed(2);
  return { subTotal, tax, total };
}

function saveCartId(id: string) {
  try { localStorage.setItem(STORAGE_KEY, id); } catch { /* storage unavailable */ }
}

function loadCartId(): string | null {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

function clearCartId() {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* storage unavailable */ }
}

// ── State ──────────────────────────────────────────────────────────────────

export interface CartState {
  cart:   Cart | null;
  status: "idle" | "loading" | "syncing" | "error";
  error:  string | null;
}

const initialState: CartState = {
  cart:   null,
  status: "idle",
  error:  null,
};

// ── Thunks ─────────────────────────────────────────────────────────────────

export const initCart = createAsyncThunk<Cart>(
  "cart/init",
  async () => {
    const savedId = loadCartId();

    if (savedId) {
      const existing = await getCart(savedId);
      if (existing) return existing;
    }

    const fresh = await createCart();
    saveCartId(fresh.id);
    return fresh;
  }
);

export const syncCart = createAsyncThunk<Cart, Cart>(
  "cart/sync",
  async (cart) => updateCart(cart)
);

export const clearCartAsync = createAsyncThunk<Cart, string>(
  "cart/clearAsync",
  async (cartId) => {
    await deleteCart(cartId);
    const fresh = await createCart();
    saveCartId(fresh.id);
    return fresh;
  }
);

// ── Slice ──────────────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem(state, action: PayloadAction<{ product: Product; qty: number }>) {
      if (!state.cart) return;
      const { product, qty } = action.payload;

      const existing = state.cart.items.find((i) => i.id === product.id);

      if (existing) {
        existing.qty = Math.min(99, existing.qty + qty);
      } else {
        const newItem: CartItem = {
          id:           product.id,
          name:         product.name,
          imageName:    product.imageName,
          categoryName: product.categoryName,
          price:        product.discountRate
                          ? +(product.price * (1 - product.discountRate / 100)).toFixed(2)
                          : product.price,
          qty,
        };
        state.cart.items.push(newItem);
      }

      Object.assign(state.cart, computeTotals(state.cart.items));
    },

    updateQty(state, action: PayloadAction<{ id: number; qty: number }>) {
      if (!state.cart) return;
      const item = state.cart.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.qty = Math.max(1, Math.min(99, action.payload.qty));
        Object.assign(state.cart, computeTotals(state.cart.items));
      }
    },

    resetCart(state) {
      state.cart   = null;
      state.status = "idle";
      state.error  = null;
      clearCartId();
    },

    removeItem(state, action: PayloadAction<number>) {
      if (!state.cart) return;
      state.cart.items = state.cart.items.filter((i) => i.id !== action.payload);
      Object.assign(state.cart, computeTotals(state.cart.items));
    },
  },

  extraReducers: (builder) => {
    // initCart
    builder
      .addCase(initCart.pending,   (state) => { state.status = "loading"; state.error = null; })
      .addCase(initCart.fulfilled, (state, action) => {
        state.cart   = action.payload;
        state.status = "idle";
      })
      .addCase(initCart.rejected,  (state, action) => {
        state.status = "error";
        state.error  = action.error.message ?? "Cart initialization error.";
      });

    // syncCart
    builder
      .addCase(syncCart.pending,   (state) => { state.status = "syncing"; })
      .addCase(syncCart.fulfilled, (state, action) => {
        state.cart   = action.payload;
        state.status = "idle";
      })
      .addCase(syncCart.rejected,  (state) => { state.status = "idle"; });

    // clearCartAsync
    builder
      .addCase(clearCartAsync.pending,   (state) => { state.status = "loading"; })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.cart   = action.payload;
        state.status = "idle";
      })
      .addCase(clearCartAsync.rejected,  (state, action) => {
        state.status = "error";
        state.error  = action.error.message ?? "Error clearing cart.";
      });
  },
});

export const { addItem, updateQty, resetCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
