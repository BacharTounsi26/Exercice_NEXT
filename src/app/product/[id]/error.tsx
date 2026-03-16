"use client";

import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ error, reset }: Props) {
  const isNetworkError =
    error.message.toLowerCase().includes("fetch") ||
    error.message.toLowerCase().includes("network") ||
    error.message.toLowerCase().includes("econnrefused") ||
    error.message.toLowerCase().includes("failed to fetch");

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 flex flex-col items-center justify-center text-center gap-6">

      <div className="w-24 h-24 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
        <svg className="w-12 h-12 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">
          {isNetworkError ? "Could not load product" : "Product unavailable"}
        </h1>
        <p className="text-slate-500 max-w-md">
          {isNetworkError
            ? "The product details could not be fetched. Please make sure the API server is running."
            : "This product could not be loaded. Please try again or browse the shop."}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-2">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          Browse Shop
        </Link>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          Home
        </Link>
      </div>

    </div>
  );
}
