"use client";

import { useRecentlyViewed }  from "@/shared/hooks/useRecentlyViewed";
import ProductWidgetSection   from "@/features/home/ui/ProductWidgetSection";

interface Props {
  /** ID du produit à exclure de la liste (page produit) */
  excludeId?:       number;
  /** Classe CSS du wrapper — permet de contrôler la largeur selon le contexte */
  wrapperClassName?: string;
}

export default function RecentlyViewedWidget({ excludeId, wrapperClassName }: Props) {
  const { products } = useRecentlyViewed();
  const visible = excludeId
    ? products.filter((p) => p.id !== excludeId)
    : products;

  if (visible.length === 0) return null;

  return (
    <div className={wrapperClassName}>
      <ProductWidgetSection
        title="Recently Viewed"
        products={visible}
        viewAllHref="/recently-viewed"
      />
    </div>
  );
}
