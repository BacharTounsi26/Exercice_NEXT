"use client";

import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-700 mb-2">Your cart is empty</h2>
      <p className="text-slate-400 text-sm mb-8 max-w-xs">
        You haven&apos;t added anything yet. Browse our catalog and find your next purchase.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Discover the catalog
      </Link>
    </div>
  );
}
