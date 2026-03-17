"use client";

import { useState }  from "react";
import { useCart }   from "@/features/cart/hooks/useCart";
import type { Product } from "@/shared/types/Product";

interface Props {
  product: Product;
}

/**
 * Sélection de quantité + bouton "Add to cart" — entièrement CSR.
 * Composant client isolé pour que le reste de ProductInfo reste SSR.
 */
export default function AddToCartControls({ product }: Props) {
  const { add } = useCart();
  const [qty,   setQty]   = useState(1);
  const [added, setAdded] = useState(false);

  const inStock = product.inStock !== false;

  function handleAddToCart() {
    if (!inStock || added) return;
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          className="w-10 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:text-slate-300 transition-colors"
        >−</button>
        <span className="w-10 text-center font-semibold text-slate-800 text-sm">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(99, q + 1))}
          disabled={qty >= 99}
          className="w-10 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:text-slate-300 transition-colors"
        >+</button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!inStock || added}
        className={`flex-1 min-w-[180px] h-11 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2
          ${added
            ? "bg-emerald-500 text-white"
            : inStock
              ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"}
        `}
      >
        {added ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Added ✓
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.16 14.26l.03.01L19 15a1 1 0 0 0 .98-.8l1.71-8.58A1 1 0 0 0 20.71 4H6.21l-.38-2H2v2h2l2.6 12.01a3.001 3.001 0 1 0 5.8.99h4.8a3.001 3.001 0 1 0 0-2H10.4a3 3 0 0 0-3.24-2.74Z" />
            </svg>
            {inStock ? "Add to cart" : "Unavailable"}
          </>
        )}
      </button>
    </div>
  );
}
