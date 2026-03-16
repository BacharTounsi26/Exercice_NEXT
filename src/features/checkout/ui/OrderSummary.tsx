"use client";

import { memo } from "react";
import Link     from "next/link";
import { productImagePath } from "@/shared/utils/productImagePath";
import type { CartItem } from "@/shared/types/CartItem";

interface OrderSummaryProps {
  items:    CartItem[];
  subTotal: number;
  tax:      number;
  total:    number;
}

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f1f5f9'/%3E%3Cpath d='M10 16h28v18H10z' fill='%23cbd5e1'/%3E%3C/svg%3E";

const OrderSummary = memo(function OrderSummary({ items, subTotal, tax, total }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden sticky top-4">
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide">Your order</h2>
        <Link href="/cart" className="text-xs text-indigo-600 hover:underline font-medium">Edit</Link>
      </div>

      <div className="divide-y divide-slate-50">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-5 py-3">
            <div className="w-10 h-10 flex-shrink-0 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={productImagePath(item.categoryName, item.imageName)}
                alt={item.name}
                className="max-w-full max-h-full object-contain p-1"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                  (e.currentTarget as HTMLImageElement).onerror = null;
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 line-clamp-1 capitalize">{item.name}</p>
              <p className="text-xs text-slate-400">× {item.qty}</p>
            </div>
            <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
              {(item.price * item.qty).toFixed(2)} €
            </span>
          </div>
        ))}
      </div>

      <div className="px-5 py-4 border-t border-slate-100 flex flex-col gap-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-semibold text-slate-800">{subTotal.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Tax (20%)</span>
          <span className="font-semibold text-slate-800">{tax.toFixed(2)} €</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Shipping</span>
          <span className="text-emerald-600 font-semibold text-xs uppercase">
            {subTotal >= 50 ? "Free 🎉" : "5.99 €"}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <span className="font-bold text-slate-800">Total (incl. tax)</span>
          <span className="font-bold text-xl text-indigo-600">{total.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
});

export default OrderSummary;
