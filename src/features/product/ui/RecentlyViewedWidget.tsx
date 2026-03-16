"use client";

import { useRecentlyViewed }  from "@/shared/hooks/useRecentlyViewed";
import ProductWidgetSection   from "@/features/home/ui/ProductWidgetSection";

interface Props {
  currentProductId: number;
}

export default function RecentlyViewedWidget({ currentProductId }: Props) {
  const { products } = useRecentlyViewed();
  const others = products.filter((p) => p.id !== currentProductId);

  if (others.length === 0) return null;

  // Fixed-width column — sits to the left of the gallery in the flex-row layout
  return (
    <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      <ProductWidgetSection
        title="Recently Viewed"
        products={others}
        viewAllHref="/recently-viewed"
      />
    </div>
  );
}
