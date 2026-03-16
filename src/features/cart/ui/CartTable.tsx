"use client";

import { memo, useCallback } from "react";
import Link                  from "next/link";
import { useRouter }         from "next/navigation";
import { productImagePath }  from "@/shared/utils/productImagePath";
import type { CartItem as CartItemType } from "@/shared/types/CartItem";

interface CartItemProps {
  item:      CartItemType;
  onUpdate:  (id: number, qty: number) => void;
  onRemove:  (id: number) => void;
  isSyncing: boolean;
}

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f1f5f9'/%3E%3Cpath d='M20 28h40v26H20z' fill='%23cbd5e1'/%3E%3C/svg%3E";

const CartItemRow = memo(function CartItemRow({ item, onUpdate, onRemove, isSyncing }: CartItemProps) {
  const lineTotal = +(item.price * item.qty).toFixed(2);

  const dec = useCallback(() => { if (item.qty > 1)  onUpdate(item.id, item.qty - 1); }, [item.id, item.qty, onUpdate]);
  const inc = useCallback(() => { if (item.qty < 99) onUpdate(item.id, item.qty + 1); }, [item.id, item.qty, onUpdate]);

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">

      <td className="py-4 px-3 w-10">
        <button
          onClick={() => onRemove(item.id)}
          disabled={isSyncing}
          aria-label="Remove"
          className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
        >
          ×
        </button>
      </td>

      <td className="py-4 px-3 w-24">
        <Link href={`/product/${item.id}`}>
          <div className="w-16 h-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden hover:border-indigo-200 transition-colors">
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
        </Link>
      </td>

      <td className="py-4 px-3">
        <Link
          href={`/product/${item.id}`}
          className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors capitalize line-clamp-2"
        >
          {item.name}
        </Link>
        <p className="text-xs text-slate-400 mt-0.5">{item.categoryName}</p>
      </td>

      <td className="py-4 px-3 text-sm text-slate-600 font-medium whitespace-nowrap">
        {item.price.toFixed(2)} €
      </td>

      <td className="py-4 px-3">
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden w-fit">
          <button onClick={dec} disabled={isSyncing || item.qty <= 1} className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 transition-colors text-sm">−</button>
          <span className="w-8 text-center text-sm font-semibold text-slate-700">{item.qty}</span>
          <button onClick={inc} disabled={isSyncing || item.qty >= 99} className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 transition-colors text-sm">+</button>
        </div>
      </td>

      <td className="py-4 px-3 text-sm font-bold text-slate-700 whitespace-nowrap">
        {lineTotal.toFixed(2)} €
      </td>
    </tr>
  );
});

interface CartTableProps {
  items:     CartItemType[];
  isSyncing: boolean;
  onUpdate:  (id: number, qty: number) => void;
  onRemove:  (id: number) => void;
}

export default memo(function CartTable({ items, isSyncing, onUpdate, onRemove }: CartTableProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {isSyncing && (
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border-b border-indigo-100">
          <svg className="w-3 h-3 text-indigo-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <span className="text-xs text-indigo-600 font-medium">Updating...</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="py-3 px-3 w-10" />
              <th className="py-3 px-3 w-24 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Photo</th>
              <th className="py-3 px-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Product</th>
              <th className="py-3 px-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Price</th>
              <th className="py-3 px-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Quantity</th>
              <th className="py-3 px-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} onUpdate={onUpdate} onRemove={onRemove} isSyncing={isSyncing} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end px-4 py-4 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={() => router.push("/checkout")}
          disabled={isSyncing}
          className="px-8 py-3 text-sm rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-60"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Place order
        </button>
      </div>
    </div>
  );
});
