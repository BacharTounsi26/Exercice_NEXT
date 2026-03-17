import { fetchProducts }   from "@/features/shop/api/fetchProducts";
import { fetchCategories } from "@/features/layout/api/fetchCategories";
import type { SortOption }  from "@/features/shop/ui/SortBar";
import PageHeader           from "@/shared/ui/PageHeader";
import Breadcrumb           from "@/features/layout/ui/Breadcrumb";
import SortBar              from "@/features/shop/ui/SortBar";
import ShopClientSection    from "@/features/shop/ui/ShopClientSection";
import { notFound }         from "next/navigation";

interface Params       { categoryId: string }
interface SearchParams { sort?: string; page?: string }

const ITEMS_PER_PAGE = 12;

function parseSortOption(raw: string): { _sort?: string; _order?: "asc" | "desc" } {
  if (!raw) return {};
  const lastUnderscore = raw.lastIndexOf("_");
  if (lastUnderscore < 0) return { _sort: raw };
  return {
    _sort:  raw.slice(0, lastUnderscore),
    _order: raw.slice(lastUnderscore + 1) as "asc" | "desc",
  };
}

export default async function CategoryShopPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { categoryId }            = await params;
  const { sort = "", page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const { _sort, _order } = parseSortOption(sort);

  const [{ products, totalCount }, categories] = await Promise.all([
    fetchProducts({ categoryId, _sort, _order, _page: currentPage, _limit: ITEMS_PER_PAGE }),
    // If categories fail, fall back to [] — category not found will trigger notFound() below
    fetchCategories().catch(() => []),
  ]);

  const category = categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb category={{ id: category.id, name: category.name }} />
      <PageHeader title={category.name} />
      <div className="mt-4">
        <SortBar sortOption={sort as SortOption} totalCount={totalCount} />
        <ShopClientSection
          initialProducts={products}
          initialTotal={totalCount}
          initialPage={currentPage}
          sort={sort}
          categoryId={categoryId}
        />
      </div>
    </div>
  );
}
