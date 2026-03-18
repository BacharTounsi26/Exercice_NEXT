import { fetchProducts }   from "@/features/shop/api/fetchProducts";
import { fetchCategories } from "@/features/layout/api/fetchCategories";
import type { SortOption }  from "@/features/shop/ui/SortBar";
import type { Metadata }    from "next";
import PageHeader           from "@/shared/ui/PageHeader";
import Breadcrumb           from "@/features/layout/ui/Breadcrumb";
import SortBar              from "@/features/shop/ui/SortBar";
import ShopClientSection    from "@/features/shop/ui/ShopClientSection";
import { notFound }         from "next/navigation";
import { parseSortOption }  from "@/shared/utils/parseSortOption";
import { Suspense }         from "react";

interface Params       { categoryId: string }
interface SearchParams { sort?: string; page?: string }

const ITEMS_PER_PAGE = 12;

// Next.js deduplicates the fetch — fetchCategories is ISR-cached, no extra call.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { categoryId } = await params;
  const categories = await fetchCategories().catch(() => []);
  const category   = categories.find((c) => c.id === categoryId);
  if (!category) return { title: "Category" };
  return {
    title:       category.name,
    description: `Browse all ${category.name} products on ShopMobile.`,
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
        <Suspense fallback={<div className="h-12 rounded-xl bg-slate-100 animate-pulse mb-6" />}>
          <SortBar sortOption={sort as SortOption} totalCount={totalCount} />
        </Suspense>
        <ShopClientSection
          key={sort}
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
