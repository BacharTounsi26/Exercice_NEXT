"use client";

import { useRef, type ReactNode } from "react";
import { Provider }               from "react-redux";
import { store }                  from "@/app/store";
import { initCart }               from "@/features/cart/state/cartSlice";

// Initialise the cart once when the Provider mounts on the client.
let cartInitialised = false;

export default function StoreProvider({ children }: { children: ReactNode }) {
  const initialised = useRef(false);

  if (!initialised.current) {
    initialised.current = true;
    if (!cartInitialised) {
      cartInitialised = true;
      store.dispatch(initCart());
    }
  }

  return <Provider store={store}>{children}</Provider>;
}
