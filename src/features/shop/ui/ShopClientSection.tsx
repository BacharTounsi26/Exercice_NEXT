"use client";

import { useState, useCallback } from "react";
import { fetchProducts }         from "@/features/shop/api/fetchProducts";
import ProductGrid               from "@/features/shop/ui/ProductGrid";
import Pagination                from "@/features/shop/ui/Pagination";
import type { Product }          from "@/shared/types/Product";
import { parseSortOption }       from "@/shared/utils/parseSortOption";

const ITEMS_PER_PAGE = 12;

interface Props {
  initialProducts: Product[];
  initialTotal:    number;
  initialPage:     number;
  q?:              string;
  sort?:           string;
  categoryId?:     string;
}

/**
 * Gère la pagination en CSR :
 * - Le premier rendu vient du serveur (props SSR).
 * - Les changements de page suivants fetchent directement l'API depuis le navigateur.
 * - L'URL est mise à jour via history.pushState (bookmarkable, sans re-render serveur).
 */
export default function ShopClientSection({
  initialProducts,
  initialTotal,
  initialPage,
  q        = "",
  sort     = "",
  categoryId,
}: Props) {
  const [products,    setProducts]    = useState<Product[]>(initialProducts);
  const [totalCount,  setTotalCount]  = useState(initialTotal);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading,     setLoading]     = useState(false);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const goToPage = useCallback(async (page: number) => {
    setLoading(true);
    const { _sort, _order } = parseSortOption(sort);

    try {
      const data = await fetchProducts({
        q: q || undefined,
        categoryId,
        _sort,
        _order,
        _page:  page,
        _limit: ITEMS_PER_PAGE,
      });

      setProducts(data.products);
      setTotalCount(data.totalCount);
      setCurrentPage(page);

      // Met à jour l'URL sans déclencher un re-render serveur
      const params = new URLSearchParams(window.location.search);
      if (page === 1) params.delete("page");
      else            params.set("page", String(page));
      const query  = params.toString();
      const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
      window.history.pushState({}, "", newUrl);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  }, [q, sort, categoryId]);

  return (
    <>
      <div className={`mt-6 transition-opacity duration-200 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
        <ProductGrid products={products} />
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onGoTo={goToPage}
          />
        </div>
      )}
    </>
  );
}
