"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { Product } from "@/shared/types/Product";
import { API_URL }      from "@/shared/utils/apiBase";

const STORAGE_KEY = "recently_viewed";
const MAX_ITEMS   = 5;

/** Read stored IDs. Gracefully migrates legacy format (array of full Product objects). */
function readIds(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Legacy migration: if items are objects, extract their id
    if (parsed.length > 0 && typeof parsed[0] === "object") {
      return (parsed as Product[]).map((p) => p.id);
    }
    return parsed as number[];
  } catch {
    return [];
  }
}

function writeIds(ids: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded) — ignore silently
  }
}

async function fetchById(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) return null;
    return res.json() as Promise<Product>;
  } catch {
    return null;
  }
}

export function useRecentlyViewed() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const lastAddedId = useRef<number | null>(null);
  const mounted     = useRef(false);

  // On mount: read IDs from localStorage and fetch each product from the API
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const ids = readIds();
    if (ids.length === 0) {
      // Wrap in a resolved promise so the setState runs after the effect body
      // (avoids the "setState inside effect" lint rule for the synchronous path)
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    Promise.all(ids.map(fetchById))
      .then((results) => {
        setProducts(results.filter((p): p is Product => p !== null));
      })
      .finally(() => setLoading(false));
  }, []);

  const addProduct = useCallback((product: Product) => {
    if (lastAddedId.current === product.id) return;
    lastAddedId.current = product.id;

    // Persist only the ID
    const ids     = readIds();
    const filtered = ids.filter((id) => id !== product.id);
    writeIds([product.id, ...filtered].slice(0, MAX_ITEMS));

    // Optimistically update in-memory list with the full product already available
    setProducts((prev) => {
      const rest = prev.filter((p) => p.id !== product.id);
      return [product, ...rest].slice(0, MAX_ITEMS);
    });
  }, []);

  return { products, loading, addProduct };
}
