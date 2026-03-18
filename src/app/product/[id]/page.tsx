import { notFound }              from "next/navigation";
import type { Metadata }         from "next";
import { Suspense }              from "react";
import { fetchProductById }      from "@/features/product/api/fetchProductById";
import { fetchCategories }       from "@/features/layout/api/fetchCategories";
import Breadcrumb                from "@/features/layout/ui/Breadcrumb";
import ProductGallery            from "@/features/product/ui/ProductGallery";
import ProductInfo               from "@/features/product/ui/ProductInfo";
import ProductDescription        from "@/features/product/ui/ProductDescription";
import OtherBrands               from "@/features/product/ui/OtherBrands";
import RecentlyViewedTracker     from "@/features/product/ui/RecentlyViewedTracker";
import RecentlyViewedWidget      from "@/features/product/ui/RecentlyViewedWidget";

interface Params { id: string }

// Next.js deduplicates the fetch — no extra network call vs the page itself.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductById(id).catch(() => null);
  if (!product) return { title: "Product not found" };
  return {
    title:       product.name,
    description: `Buy ${product.name} at the best price on ShopMobile.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    fetchProductById(id).catch((err: Error) => {
      // Distinguish a true 404 from a backend-offline error.
      // 404 → show not-found page; anything else → let error.tsx handle it.
      if (err.message === "Product not found.") return null;
      throw err;
    }),
    fetchCategories().catch(() => []),
  ]);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
      <Breadcrumb
        category={{ id: product.categoryId, name: product.categoryName }}
        product={product.name}
      />
      {/* Track this product as recently viewed (client island) */}
      <RecentlyViewedTracker product={product} />

      {/* Main layout: [Recently Viewed | Gallery | Info]
          RecentlyViewedWidget returns null when empty → gallery+info fills full width */}
      <div className="flex flex-col lg:flex-row gap-8">
        <Suspense fallback={null}>
          <RecentlyViewedWidget
            excludeId={product.id}
            wrapperClassName="w-full lg:w-64 xl:w-72 flex-shrink-0"
          />
        </Suspense>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10">
          <ProductGallery
            imageName={product.imageName}
            categoryName={product.categoryName}
            productName={product.name}
          />
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Description tabs */}
      <ProductDescription product={product} />

      {/* Other brands */}
      <OtherBrands categories={categories} currentCategoryId={product.categoryId} />
    </div>
  );
}
