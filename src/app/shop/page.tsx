import { fetchProducts }  from "@/features/shop/api/fetchProducts";
import type { SortOption } from "@/features/shop/ui/SortBar";
import PageHeader           from "@/shared/ui/PageHeader";
import Breadcrumb           from "@/features/layout/ui/Breadcrumb";
import SortBar              from "@/features/shop/ui/SortBar";
import ProductGrid          from "@/features/shop/ui/ProductGrid";
import Pagination           from "@/features/shop/ui/Pagination";

const ITEMS_PER_PAGE = 12;

function parseSortOption(raw: string): { _sort?: string; _order?: "asc" | "desc" } {
  if (!raw) return {};
  const [field, order] = raw.split("_");
  return { _sort: field, _order: (order as "asc" | "desc") ?? "asc" };
}

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

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb />
      <PageHeader title={q ? `Results for "${q}"` : "Shop"} />
      <div className="mt-4">
        <SortBar sortOption={sort as SortOption} totalCount={totalCount} />
        <div className="mt-6">
          <ProductGrid products={products} />
        </div>
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}
