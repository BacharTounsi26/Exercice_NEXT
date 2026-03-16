"use client";

import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ShopError({ error, reset }: Props) {
  const isNetworkError =
    error.message.toLowerCase().includes("fetch") ||
    error.message.toLowerCase().includes("network") ||
    error.message.toLowerCase().includes("econnrefused") ||
    error.message.toLowerCase().includes("failed to fetch");

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 flex flex-col items-center justify-center text-center gap-6">

      <div className="w-24 h-24 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
        <svg className="w-12 h-12 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">
          {isNetworkError ? "Could not load products" : "Shop error"}
        </h1>
        <p className="text-slate-500 max-w-md">
          {isNetworkError
            ? "The product catalogue is temporarily unavailable. Please check that the API server is running."
            : "An error occurred while loading the shop. Please try again."}
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
          href="/"
          className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          Back to Home
        </Link>
      </div>

    </div>
  );
}
