"use client";

import { useEffect }         from "react";
import { useRecentlyViewed } from "@/shared/hooks/useRecentlyViewed";
import type { Product }      from "@/shared/types/Product";

export function useTrackProduct(product: Product): void {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    addProduct(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);
}
