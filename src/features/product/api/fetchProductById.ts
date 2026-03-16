import type { Product } from "@/shared/types/Product";
import { API_URL }      from "@/shared/utils/apiBase";

// Server-side fetch with Next.js ISR caching
export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    next: { revalidate: 300 },
  });
  if (res.status === 404) throw new Error("Product not found.");
  if (!res.ok) throw new Error(`fetchProductById: ${res.status}`);
  return res.json();
}
