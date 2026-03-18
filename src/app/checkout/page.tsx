"use client";

import { useState, useEffect } from "react";
import { useRouter }     from "next/navigation";
import { useCart }       from "@/features/cart/hooks/useCart";
import { useCheckout }   from "@/features/checkout/hooks/useCheckout";
import CheckoutForm      from "@/features/checkout/ui/CheckoutForm";
import OrderSummary      from "@/features/checkout/ui/OrderSummary";
import OrderSuccess      from "@/features/checkout/ui/OrderSuccess";
import PageHeader        from "@/shared/ui/PageHeader";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cart, status: cartStatus, subTotal, tax, total } = useCart();
  const { status, order, error, isSubmitting, submit, reset } = useCheckout();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  // Reset checkout state when leaving the page so a return visit starts clean
  useEffect(() => {
    return () => { reset(); };
  }, [reset]);

  useEffect(() => {
    if (!hydrated) return;                           // attendre la fin de l'hydratation
    if (cartStatus === "loading") return;             // attendre le chargement du panier
    if (status === "submitting" || status === "success") return; // commande en cours
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [hydrated, cartStatus, items.length, status, router]);

  if (status === "success" && order) {
    return <OrderSuccess order={order} />;
  }

  if (!hydrated || cartStatus === "loading") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="h-8 w-48 bg-slate-100 rounded animate-pulse mb-6" />
        <div className="h-96 bg-slate-100 rounded animate-pulse" />
      </div>
    );
  }

  if (!cart || cartStatus === "error") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400">
          <p className="text-lg font-medium text-red-500">Unable to load your cart.</p>
          <p className="text-sm">Please make sure the API server is running and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <PageHeader title="Checkout" />

      {status === "error" && error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm onSubmit={submit} isSubmitting={isSubmitting} />
        </div>
        <div>
          <OrderSummary items={items} subTotal={subTotal} tax={tax} total={total} />
        </div>
      </div>
    </div>
  );
}
