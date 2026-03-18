"use client";

import { useTrackProduct } from "@/features/product/hooks/useTrackProduct";
import type { Product }    from "@/shared/types/Product";

export default function RecentlyViewedTracker({ product }: { product: Product }) {
  useTrackProduct(product);
  return null;
}
