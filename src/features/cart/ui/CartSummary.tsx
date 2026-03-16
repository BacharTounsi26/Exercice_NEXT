"use client";

import { memo }             from "react";
import Link                 from "next/link";
import { productImagePath } from "@/shared/utils/productImagePath";
import type { Product }     from "@/shared/types/Product";

interface CartSummaryProps {
  subTotal:           number;
  tax:                number;
  total:              number;
  isSyncing:          boolean;
  crossSells?:        Product[];
  crossSellsLoading?: boolean;
}

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f1f5f9'/%3E%3Cpath d='M20 28h40v26H20z' fill='%23cbd5e1'/%3E%3C/svg%3E";

const CartSummary = memo(function CartSummary({
  subTotal, tax, total, crossSells = [], crossSellsLoading = false,
}: CartSummaryProps) {
  return (
    <div className="flex flex-col gap-5">

      {/* Cart Totals */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide">Summary</h2>
        </div>
        <div className="px-5 py-4 flex flex-col gap-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-semibold text-slate-800">{subTotal.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Tax (20%)</span>
            <span className="font-semibold text-slate-800">{tax.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Shipping</span>
            <span className="text-emerald-600 font-semibold text-xs uppercase tracking-wide">
              {subTotal >= 50 ? "Free 🎉" : `${(5.99).toFixed(2)} €`}
            </span>
          </div>
          {subTotal > 0 && subTotal < 50 && (
            <div className="text-[11px] text-slate-400 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              Only <strong className="text-amber-700">{(50 - subTotal).toFixed(2)} €</strong> left for free shipping!
            </div>
          )}
          <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
            <span className="font-bold text-slate-800">Total (incl. tax)</span>
            <span className="font-bold text-xl text-indigo-600">{total.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      {/* You may also like */}
      {(crossSellsLoading || crossSells.length > 0) && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide">You may also like...</h2>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {crossSellsLoading && Array.from({ length: 3 }, (_, i) => (
              <div key={`sk-${i}`} className="h-20 rounded-xl bg-slate-100 animate-pulse" />
            ))}
            {!crossSellsLoading && crossSells.map((p) => {
              const price = p.discountRate
                ? (p.price * (1 - p.discountRate / 100)).toFixed(2)
                : p.price.toFixed(2);
              return (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:bg-indigo-50 hover:border-indigo-100 transition-all group"
                >
                  <div className="w-14 h-14 flex-shrink-0 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden group-hover:border-indigo-200 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={productImagePath(p.categoryName, p.imageName)}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain p-1 group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                        (e.currentTarget as HTMLImageElement).onerror = null;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-slate-700 line-clamp-2 capitalize group-hover:text-indigo-700 transition-colors">
                      {p.name}
                    </p>
                    <p className="text-indigo-600 font-bold text-sm mt-0.5">{price} €</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

export default CartSummary;
