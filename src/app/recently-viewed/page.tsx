"use client";

import Link                  from "next/link";
import { useRecentlyViewed } from "@/shared/hooks/useRecentlyViewed";
import PageHeader            from "@/shared/ui/PageHeader";
import ProductGrid           from "@/features/shop/ui/ProductGrid";

export default function RecentlyViewedPage() {
  const { products } = useRecentlyViewed();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <PageHeader
        title="Recently Viewed"
        subtitle="Products you have visited recently"
      />

      {products.length === 0 ? (
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
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
