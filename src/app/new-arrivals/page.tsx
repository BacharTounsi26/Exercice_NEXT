import { fetchTopNew }    from "@/features/home/api/fetchTopNew";
import PageHeader         from "@/shared/ui/PageHeader";
import Breadcrumb         from "@/features/layout/ui/Breadcrumb";
import ProductGrid        from "@/features/shop/ui/ProductGrid";
import type { Metadata }  from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title:       "New Arrivals",
  description: "Explore the latest smartphones and mobile devices just added to ShopMobile.",
};

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
