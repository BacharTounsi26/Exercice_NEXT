import type { Category } from "@/shared/types/Category";
import { API_URL }       from "@/shared/utils/apiBase";

// Server-side fetch with Next.js ISR caching (5-minute revalidation)
export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`fetchCategories: ${res.status}`);
  return res.json();
}
