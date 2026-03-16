"use client";

import { memo, useMemo }  from "react";
import Link               from "next/link";
import { imagePath }      from "@/shared/utils/imagePath";
import type { Category }  from "@/shared/types/Category";

const PLACEHOLDER_BRAND =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f1f5f9' rx='8'/%3E%3Ccircle cx='24' cy='24' r='10' fill='%23cbd5e1'/%3E%3C/svg%3E";

interface OtherBrandsProps {
  categories:        Category[];
  currentCategoryId: string;
}

const OtherBrands = memo(function OtherBrands({ categories, currentCategoryId }: OtherBrandsProps) {
  const others = useMemo(
    () => categories.filter((c) => c.id !== currentCategoryId),
    [categories, currentCategoryId]
  );

  if (others.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-2">
          Other Brands
        </h3>
        <p className="text-xs text-slate-500">No other brands available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">
        Other Brands
      </h3>

      <div className="flex flex-col gap-2">
        {others.map((c) => (
          <Link
            key={c.id}
            href={`/shop/${c.id}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 hover:border-indigo-100 border border-transparent transition-all group"
          >
            <div className="w-10 h-10 flex-shrink-0 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden border border-slate-100 group-hover:border-indigo-200 transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePath(c.image)}
                alt={c.name}
                className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_BRAND;
                }}
              />
            </div>
            <span className="text-sm font-semibold text-slate-600 group-hover:text-indigo-700 transition-colors">
              {c.name}
            </span>
            <svg
              className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 ml-auto transition-colors"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
});

export default OtherBrands;
