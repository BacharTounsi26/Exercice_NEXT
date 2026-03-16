"use client";

import { memo } from "react";
import Link     from "next/link";
import type { Order } from "@/shared/types/Order";

interface OrderSuccessProps { order: Order }

const PAYMENT_LABELS: Record<string, string> = {
  bank_transfer: "Bank transfer",
  cheque:        "Check",
  paypal:        "PayPal",
};

const OrderSuccess = memo(function OrderSuccess({ order }: OrderSuccessProps) {
  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-6">
        <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-2">Order confirmed!</h1>
      <p className="text-slate-500 text-sm mb-8">
        Thanks for your purchase. Your order{" "}
        <span className="font-semibold text-slate-700">#{order.id}</span> has been placed.
      </p>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8 text-left flex flex-col gap-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Shipping to</span>
          <span className="font-semibold text-slate-700 text-right">
            {order.shipping.firstName} {order.shipping.lastName},<br />
            {order.shipping.address1}, {order.shipping.city}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Payment</span>
          <span className="font-semibold text-slate-700">
            {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <span className="font-bold text-slate-800">Total paid</span>
          <span className="font-bold text-xl text-indigo-600">{order.total.toFixed(2)} €</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-md"
        >
          Back to home
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
});

export default OrderSuccess;
