import { fetchTopSellers } from "@/features/home/api/fetchTopSellers";
import PageHeader          from "@/shared/ui/PageHeader";
import Breadcrumb          from "@/features/layout/ui/Breadcrumb";
import ProductGrid         from "@/features/shop/ui/ProductGrid";

export const revalidate = 300;

export default async function TopSellersPage() {
  const products = await fetchTopSellers().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <Breadcrumb />
      <PageHeader
        title="Top Sellers"
        subtitle="Our best-selling products, loved by customers"
      />
      <ProductGrid products={products} />
    </div>
  );
}
