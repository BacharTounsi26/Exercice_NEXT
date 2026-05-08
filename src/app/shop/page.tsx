import { fetchProducts }    from "@/features/shop/api/fetchProducts";
import type { SortOption }  from "@/features/shop/ui/SortBar";
import PageHeader            from "@/shared/ui/PageHeader";
import Breadcrumb            from "@/features/layout/ui/Breadcrumb";
import SortBar               from "@/features/shop/ui/SortBar";
import ShopClientSection     from "@/features/shop/ui/ShopClientSection";
import { parseSortOption }   from "@/shared/utils/parseSortOption";
import type { Metadata }      from "next";
import { Suspense }           from "react";

export const metadata: Metadata = {
  title:       "Shop",
  description: "Browse our full catalogue of smartphones and mobile devices.",
};

const ITEMS_PER_PAGE = 12;

interface SearchParams { q?: string; sort?: string; page?: string }

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q = "", sort = "", page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const { _sort, _order } = parseSortOption(sort);

  const { products, totalCount } = await fetchProducts({
    q: q || undefined,
    _sort,
    _order,
    _page: currentPage,
    _limit: ITEMS_PER_PAGE,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb category={{ id: "shop", name: "All Products" }} />
      <PageHeader title={q ? `Results for "${q}"` : "All Products"} />
      <div className="mt-4">
        <Suspense fallback={<div className="h-12 rounded-xl bg-slate-100 animate-pulse mb-6" />}>
          <SortBar sortOption={sort as SortOption} totalCount={totalCount} />
        </Suspense>
        <ShopClientSection
          key={`${sort}-${q}`}
          initialProducts={products}
          initialTotal={totalCount}
          initialPage={currentPage}
          q={q}
          sort={sort}
        />
      </div>
    </div>
  );
}
