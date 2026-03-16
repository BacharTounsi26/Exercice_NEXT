"use client";

import { memo } from "react";
import type { PaymentMethod } from "@/shared/types/PaymentMethod";

interface PaymentOption {
  value:       PaymentMethod;
  label:       string;
  description: string;
  icon:        React.ReactNode;
}

const OPTIONS: PaymentOption[] = [
  {
    value: "bank_transfer",
    label: "Bank transfer",
    description: "Make your payment directly to our bank account. Use your order number as the payment reference. Your order will be shipped once funds are received.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    value: "cheque",
    label: "Pay by check",
    description: "Send your check payable to ShopMobile. Your order will be processed as soon as it is received.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    value: "paypal",
    label: "PayPal",
    description: "Pay via PayPal. You can use your bank card even without a PayPal account.",
    icon: (
      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
      </svg>
    ),
  },
];

interface PaymentMethodsProps {
  value:    PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const PaymentMethods = memo(function PaymentMethods({ value, onChange }: PaymentMethodsProps) {
  return (
    <div className="flex flex-col gap-3">
      {OPTIONS.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <div
            key={opt.value}
            className={`rounded-xl border-2 transition-all cursor-pointer overflow-hidden ${isSelected ? "border-indigo-500 bg-indigo-50/50" : "border-slate-200 bg-white hover:border-indigo-200"}`}
            onClick={() => onChange(opt.value)}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <input
                type="radio"
                name="payment_method"
                id={`payment_${opt.value}`}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange(opt.value)}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
              />
              <span className={isSelected ? "text-indigo-600" : "text-slate-500"}>
                {opt.icon}
              </span>
              <label
                htmlFor={`payment_${opt.value}`}
                className="font-semibold text-sm text-slate-800 cursor-pointer"
              >
                {opt.label}
              </label>
            </div>
            {isSelected && (
              <div className="px-4 py-3 border-t border-indigo-100 bg-white">
                <p className="text-sm text-slate-600">{opt.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default PaymentMethods;
