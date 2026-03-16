"use client";

import { useEffect }     from "react";
import { useRouter }     from "next/navigation";
import { useCart }       from "@/features/cart/hooks/useCart";
import { useCheckout }   from "@/features/checkout/hooks/useCheckout";
import CheckoutForm      from "@/features/checkout/ui/CheckoutForm";
import OrderSummary      from "@/features/checkout/ui/OrderSummary";
import OrderSuccess      from "@/features/checkout/ui/OrderSuccess";
import PageHeader        from "@/shared/ui/PageHeader";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, status: cartStatus, subTotal, tax, total } = useCart();
  const { status, order, isSubmitting, submit, reset } = useCheckout();

  // Reset checkout state when leaving the page so a return visit starts clean
  useEffect(() => {
    return () => { reset(); };
  }, [reset]);

  useEffect(() => {
    if (cartStatus !== "loading" && items.length === 0 && status === "idle") {
      router.replace("/cart");
    }
  }, [cartStatus, items.length, status, router]);

  if (status === "success" && order) {
    return <OrderSuccess order={order} />;
  }

  if (cartStatus === "loading") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="h-8 w-48 bg-slate-100 rounded animate-pulse mb-6" />
        <div className="h-96 bg-slate-100 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <PageHeader title="Checkout" />
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
