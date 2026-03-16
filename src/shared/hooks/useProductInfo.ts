"use client";

import { useMemo } from "react";
import type { Product } from "@/shared/types/Product";

export function useProductInfo(product: Product) {
  const { discountedPrice, oldPrice, stars } = useMemo(() => {
    const discountedPrice = product.discountRate
      ? +(product.price * (1 - product.discountRate / 100)).toFixed(2)
      : product.price;

    const oldPrice = product.discountRate ? product.price : null;

    const stars = Array.from(
      { length: 5 },
      (_, i) => i < (product.review || 0)
    );

    return { discountedPrice, oldPrice, stars };
  }, [product.price, product.discountRate, product.review]);

  return { discountedPrice, oldPrice, stars };
}
