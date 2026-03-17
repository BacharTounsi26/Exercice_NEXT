"use client";

import { useEffect, useState }  from "react";
import { useCart }              from "@/features/cart/hooks/useCart";
import CartTable                from "@/features/cart/ui/CartTable";
import CartSummary              from "@/features/cart/ui/CartSummary";
import EmptyCart                from "@/features/cart/ui/EmptyCart";
import PageHeader               from "@/shared/ui/PageHeader";
import { fetchProducts }        from "@/features/shop/api/fetchProducts";
import type { Product }         from "@/shared/types/Product";

export default function CartPage() {
  const { items, isSyncing, status, subTotal, tax, total, update, remove } = useCart();

  // Guard: avant le montage côté client, serveur et client rendent
  // le même skeleton pour éviter le mismatch d'hydratation.
  // (StoreProvider dispatche initCart() de façon synchrone → status "loading" côté serveur)
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // ── Suggestions CSR ─────────────────────────────────────────────────────
  const [crossSells,        setCrossSells]        = useState<Product[]>([]);
  const [crossSellsLoading, setCrossSellsLoading] = useState(true);

  useEffect(() => {
    // Fetch suggestions excluding products already in the cart
    fetchProducts({ _sort: "review", _order: "desc", _limit: 5 })
      .then(({ products }) => {
        const cartIds = new Set(items.map((i) => i.id));
        setCrossSells(products.filter((p) => !cartIds.has(p.id)).slice(0, 4));
      })
      .catch(() => setCrossSells([]))
      .finally(() => setCrossSellsLoading(false));
    // Re-run only when cart items change (ids)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((i) => i.id).join(",")]);
  // ────────────────────────────────────────────────────────────────────────

  if (!mounted || status === "loading") {
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
              crossSells={crossSells}
              crossSellsLoading={crossSellsLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
