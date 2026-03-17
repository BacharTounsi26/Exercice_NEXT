import PageHeader          from "@/shared/ui/PageHeader";
import Breadcrumb           from "@/features/layout/ui/Breadcrumb";
import SearchClientSection  from "@/features/shop/ui/SearchClientSection";

interface SearchParams { q?: string; sort?: string }

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
