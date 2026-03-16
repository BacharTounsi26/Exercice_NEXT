"use client";

// Client island for the home page: Top Sellers + Recently Viewed
// These depend on client-side state (cart, localStorage)

import { useEffect, useState } from "react";
import { useRecentlyViewed }    from "@/shared/hooks/useRecentlyViewed";
import { fetchTopSellers }      from "../api/fetchTopSellers";
import type { Product }        from "@/shared/types/Product";
import ProductWidgetSection    from "./ProductWidgetSection";

// Cached in module scope so multiple renders don't re-fetch
let topSellersCache: Product[] | null = null;

export default function HomeClientSection() {
  const { products: recentlyViewed } = useRecentlyViewed();
  const [topSellers, setTopSellers]  = useState<Product[]>(topSellersCache ?? []);
  const [loadingTS, setLoadingTS]    = useState(!topSellersCache);

  useEffect(() => {
    if (topSellersCache) {
      setTopSellers(topSellersCache);
      setLoadingTS(false);
      return;
    }

    let alive = true;
    fetchTopSellers()
      .then((data) => {
        if (!alive) return;
        topSellersCache = data;
        setTopSellers(data);
      })
      .finally(() => { if (alive) setLoadingTS(false); });

    return () => { alive = false; };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        {loadingTS ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="w-48 flex-shrink-0 rounded-lg border border-gray-200 bg-white overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-100" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-slate-100 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductWidgetSection
            title="Top Sellers"
            products={topSellers}
            viewAllHref="/top-sellers"
          />
        )}
      </div>

      {recentlyViewed.length > 0 && (
        <div>
          <ProductWidgetSection
            title="Recently Viewed"
            products={recentlyViewed}
            viewAllHref="/recently-viewed"
          />
        </div>
      )}
    </div>
  );
}
