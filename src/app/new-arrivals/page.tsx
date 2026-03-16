import { fetchTopNew }    from "@/features/home/api/fetchTopNew";
import PageHeader         from "@/shared/ui/PageHeader";
import Breadcrumb         from "@/features/layout/ui/Breadcrumb";
import ProductGrid        from "@/features/shop/ui/ProductGrid";

export const revalidate = 300;

export default async function NewArrivalsPage() {
  const products = await fetchTopNew().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <Breadcrumb />
      <PageHeader
        title="New Arrivals"
        subtitle="The latest products added to our catalogue"
      />
      <ProductGrid products={products} />
    </div>
  );
}
