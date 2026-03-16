"use client";

import Link                   from "next/link";
import { useRecentlyViewed }  from "@/shared/hooks/useRecentlyViewed";
import { productImagePath }   from "@/shared/utils/productImagePath";
import { formatPrice }        from "@/shared/utils/formatPrice";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f1f5f9'/%3E%3Cpath d='M10 16h28v18H10z' fill='%23cbd5e1'/%3E%3C/svg%3E";

interface Props {
  currentProductId: number;
}

export default function RecentlyViewedSidebar({ currentProductId }: Props) {
  const { products } = useRecentlyViewed();
  const others = products.filter((p) => p.id !== currentProductId);

  // After the hydration-safe useEffect in useRecentlyViewed, this will populate.
  // Until then products=[] so others=[] and we render nothing.
  if (others.length === 0) return null;

  return (
    <aside className="w-full lg:w-52 xl:w-56 flex-shrink-0">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
        Recently Viewed
      </h3>
      <ul className="flex flex-row overflow-x-auto lg:flex-col gap-3 pb-2 lg:pb-0">
        {others.map((product) => {
          const price = product.discountRate
            ? (product.price * (1 - product.discountRate / 100)).toFixed(2)
            : product.price.toFixed(2);

          return (
            <li key={product.id} className="flex-shrink-0 lg:flex-shrink">
              <Link
                href={`/product/${product.id}`}
                className="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50 transition-all group"
              >
                <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg border border-slate-100 overflow-hidden flex items-center justify-center p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={productImagePath(product.categoryName, product.imageName)}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700 line-clamp-2 transition-colors leading-tight">
                    {product.name}
                  </p>
                  <p className="text-xs text-indigo-600 font-bold mt-1">
                    {formatPrice(Number(price))}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
