"use client";

import { useCart }       from "@/features/cart/hooks/useCart";
import CartTable         from "@/features/cart/ui/CartTable";
import CartSummary       from "@/features/cart/ui/CartSummary";
import EmptyCart         from "@/features/cart/ui/EmptyCart";
import PageHeader        from "@/shared/ui/PageHeader";

export default function CartPage() {
  const { items, isSyncing, status, subTotal, tax, total, update, remove } = useCart();

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="h-8 w-48 bg-slate-100 rounded animate-pulse mb-6" />
        <div className="h-64 bg-slate-100 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <PageHeader title="Your Cart" />

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartTable
              items={items}
              isSyncing={isSyncing}
              onUpdate={update}
              onRemove={remove}
            />
          </div>
          <div>
            <CartSummary
              subTotal={subTotal}
              tax={tax}
              total={total}
              isSyncing={isSyncing}
            />
          </div>
        </div>
      )}
    </div>
  );
}
