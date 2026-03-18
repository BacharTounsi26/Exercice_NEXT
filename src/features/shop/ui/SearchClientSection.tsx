"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchProducts }                    from "@/features/shop/api/fetchProducts";
import ProductGrid                          from "@/features/shop/ui/ProductGrid";
import Pagination                           from "@/features/shop/ui/Pagination";
import type { Product }                     from "@/shared/types/Product";
import type { SortOption }                  from "@/features/shop/ui/SortBar";
import { parseSortOption }                  from "@/shared/utils/parseSortOption";

const ITEMS_PER_PAGE = 12;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "",                  label: "Relevance"     },
  { value: "price_asc",         label: "Price ↑"       },
  { value: "price_desc",        label: "Price ↓"       },
  { value: "review_desc",       label: "Top Rated"     },
  { value: "name_asc",          label: "A → Z"         },
  { value: "discountRate_desc", label: "Best Discounts" },
];

function pushUrl(q: string, sort: string, page: number) {
  const params = new URLSearchParams();
  if (q)      params.set("q",    q);
  if (sort)   params.set("sort", sort);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  window.history.pushState({}, "", `/search${qs ? `?${qs}` : ""}`);
}

interface Props {
  q:           string;
  initialSort: string;
}

/**
 * Zone de résultats de recherche — entièrement CSR.
 * Inclut : compteur, tri, grille produits, pagination.
 * Aucune navigation serveur (pas de router.push).
 */
export default function SearchClientSection({ q, initialSort }: Props) {
  const [products,    setProducts]    = useState<Product[]>([]);
  const [totalCount,  setTotalCount]  = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort,        setSort]        = useState<SortOption>(initialSort as SortOption);
  const [loading,     setLoading]     = useState(true);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const fetchPage = useCallback(async (page: number, sortValue: string) => {
    setLoading(true);
    const { _sort, _order } = parseSortOption(sortValue);
    try {
      const data = await fetchProducts({
        q: q || undefined,
        _sort,
        _order,
        _page:  page,
        _limit: ITEMS_PER_PAGE,
      });
      setProducts(data.products);
      setTotalCount(data.totalCount);
      setCurrentPage(page);
      pushUrl(q, sortValue, page);
      if (page > 1) window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  }, [q]);

  // Fetch on mount and when q changes
  useEffect(() => {
    setSort(initialSort as SortOption);
    fetchPage(1, initialSort);
  }, [q, initialSort, fetchPage]);

  function handleSort(newSort: SortOption) {
    setSort(newSort);
    fetchPage(1, newSort);
  }

  function handlePage(page: number) {
    fetchPage(page, sort);
  }

  const isEmpty = !loading && products.length === 0;

  return (
    <div className="mt-4">
      {/* Barre tri + compteur */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <p className="text-sm text-slate-500">
          {loading
            ? "Searching…"
            : totalCount === 0
              ? "No results"
              : `${totalCount} result${totalCount > 1 ? "s" : ""}`}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="search-sort" className="text-sm text-slate-500 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="search-sort"
            value={sort}
            onChange={(e) => handleSort(e.target.value as SortOption)}
            disabled={loading}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition disabled:opacity-50"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grille produits */}
      {isEmpty ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center text-slate-500">
          <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <p className="text-lg font-medium">No products found for &ldquo;{q}&rdquo;</p>
          <p className="text-sm">Try a different keyword or browse the shop.</p>
        </div>
      ) : (
        <div className={`mt-6 transition-opacity duration-200 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
          <ProductGrid products={products} />
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onGoTo={handlePage} />
        </div>
      )}
    </div>
  );
}
