"use client";

import Link                  from "next/link";
import { useRecentlyViewed } from "@/shared/hooks/useRecentlyViewed";
import ProductGrid           from "@/features/shop/ui/ProductGrid";

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
          <div className="bg-slate-100 aspect-square" />
          <div className="p-4 space-y-2">
            <div className="h-3 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-4/5" />
            <div className="h-5 bg-slate-200 rounded w-1/2 mt-1" />
            <div className="h-9 bg-slate-200 rounded-xl mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RecentlyViewedGrid() {
  const { products, loading } = useRecentlyViewed();

  if (loading) return <GridSkeleton />;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400">
        <svg className="w-16 h-16 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <p className="text-lg font-medium">No recently viewed products yet</p>
        <p className="text-sm">Start browsing to build your history</p>
        <Link
          href="/shop"
          className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
