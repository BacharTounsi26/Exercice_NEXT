"use client";

import { useEffect, type ReactNode } from "react";
import { Provider }                  from "react-redux";
import { store }                     from "@/store/store";
import { initCart }                  from "@/features/cart/state/cartSlice";

export default function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    store.dispatch(initCart());
    // Empty deps: run once on client mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
