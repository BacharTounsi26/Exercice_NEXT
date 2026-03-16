"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { memo } from "react";

export type SortOption =
  | ""
  | "price_asc"
  | "price_desc"
  | "review_desc"
  | "name_asc"
  | "discountRate_desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "",                  label: "Relevance"       },
  { value: "price_asc",         label: "Price ↑"          },
  { value: "price_desc",        label: "Price ↓"          },
  { value: "review_desc",       label: "Top Rated"        },
  { value: "name_asc",          label: "A → Z"            },
  { value: "discountRate_desc", label: "Best Discounts"   },
];

interface SortBarProps {
  sortOption:  SortOption;
  totalCount:  number;
}

const SortBar = memo(function SortBar({ sortOption, totalCount }: SortBarProps) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  function handleSort(option: SortOption) {
    const params = new URLSearchParams(searchParams.toString());
    if (option) params.set("sort", option);
    else        params.delete("sort");
    params.delete("page"); // reset to page 1
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-between mb-6 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
      <span className="text-[13px] text-slate-500">
        <span className="font-semibold text-slate-700">{totalCount}</span>{" "}
        product{totalCount !== 1 ? "s" : ""}
      </span>

      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm text-slate-500 whitespace-nowrap hidden sm:block">
          Sort:
        </label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value as SortOption)}
          className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default SortBar;
