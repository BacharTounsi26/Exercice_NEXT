import PageHeader          from "@/shared/ui/PageHeader";
import Breadcrumb           from "@/features/layout/ui/Breadcrumb";
import SearchClientSection  from "@/features/shop/ui/SearchClientSection";
import type { Metadata }    from "next";

interface SearchParams { q?: string; sort?: string }

// Not for SEO (search results pages shouldn't be indexed),
// but gives a meaningful browser tab title.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { q = "" } = await searchParams;
  return {
    title: q ? `Search: "${q}"` : "Search",
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q = "", sort = "" } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb />
      <PageHeader title={q ? `Results for "${q}"` : "Search"} />
      {/* Toute la zone résultats est CSR — SearchClientSection fetch depuis le navigateur */}
      <SearchClientSection q={q} initialSort={sort} />
    </div>
  );
}
