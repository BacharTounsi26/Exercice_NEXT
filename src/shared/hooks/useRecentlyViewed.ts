"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { Product } from "@/shared/types/Product";

const STORAGE_KEY = "recently_viewed";
const MAX_ITEMS   = 5;

function readFromStorage(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function writeToStorage(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded) — ignore silently
  }
}

export function useRecentlyViewed() {
  // Start with [] so SSR and first client render match, then hydrate from localStorage
  const [products, setProducts] = useState<Product[]>([]);
  const lastAddedId = useRef<number | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      setProducts(readFromStorage());
    }
  }, []);

  const addProduct = useCallback((product: Product) => {
    if (lastAddedId.current === product.id) return;
    lastAddedId.current = product.id;

    setProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const next     = [product, ...filtered].slice(0, MAX_ITEMS);
      writeToStorage(next);
      return next;
    });
  }, []);

  return { products, addProduct };
}
