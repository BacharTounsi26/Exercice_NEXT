import type { Product } from "@/shared/types/Product";
import { API_URL }      from "@/shared/utils/apiBase";

// Server-side fetch with Next.js ISR caching
export async function fetchTopNew(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products?isNewProduct=true`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`fetchTopNew: ${res.status}`);
  return res.json();
}
