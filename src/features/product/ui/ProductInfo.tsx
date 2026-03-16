"use client";

import { memo, useState } from "react";
import { useProductInfo } from "@/shared/hooks/useProductInfo";
import { useCart }        from "@/features/cart/hooks/useCart";
import type { Product }   from "@/shared/types/Product";

interface Props {
  product: Product;
}

const ProductInfo = memo(function ProductInfo({ product }: Props) {
  const { discountedPrice, oldPrice, stars } = useProductInfo(product);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const inStock = product.inStock !== false;

  function handleAddToCart() {
    if (!inStock) return;
    add(product, qty);
  }

  return (
    <div className="flex flex-col gap-5">

      <div>
        <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          {product.categoryName}
        </span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 capitalize leading-snug">
        {product.name}
      </h1>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {stars.map((filled, i) => (
            <svg key={i} className={`w-5 h-5 ${filled ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.538 1.118l-3.376-2.454a1 1 0 00-1.175 0l-3.376 2.454c-.783.57-1.838-.197-1.538-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.056 9.386c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.959z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-slate-500">{product.review ?? 0}/5</span>
      </div>

      <div className="flex items-baseline gap-3 py-3 border-y border-slate-100">
        <span className="text-3xl font-bold text-indigo-600">{discountedPrice}€</span>
        {oldPrice && (
          <>
            <span className="text-lg text-slate-400 line-through">{oldPrice}€</span>
            <span className="text-sm font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
              -{product.discountRate}%
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-red-400"}`} />
        <span className={`text-sm font-medium ${inStock ? "text-emerald-700" : "text-red-600"}`}>
          {inStock ? "In stock — Fast delivery" : "Out of stock"}
        </span>
      </div>

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
          disabled={!inStock}
          className="flex-1 min-w-[180px] h-11 rounded-xl font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.16 14.26l.03.01L19 15a1 1 0 0 0 .98-.8l1.71-8.58A1 1 0 0 0 20.71 4H6.21l-.38-2H2v2h2l2.6 12.01a3.001 3.001 0 1 0 5.8.99h4.8a3.001 3.001 0 1 0 0-2H10.4a3 3 0 0 0-3.24-2.74Z" />
          </svg>
          {inStock ? "Add to cart" : "Unavailable"}
        </button>
      </div>
    </div>
  );
});

export default ProductInfo;
