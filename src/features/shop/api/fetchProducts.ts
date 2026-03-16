import type { Product } from "@/shared/types/Product";
import { API_URL }      from "@/shared/utils/apiBase";

export type FetchProductsParams = {
  q?: string;
  categoryId?: string;
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";
};

export type FetchProductsResult = {
  products:   Product[];
  totalCount: number;
};

// Server-side fetch — no ISR cache because params vary per request (pagination/search)
export async function fetchProducts(params: FetchProductsParams): Promise<FetchProductsResult> {
  const url = new URL(`${API_URL}/products`);

  if (params.categoryId)  url.searchParams.set("categoryId", params.categoryId);
  if (params.q?.trim())   url.searchParams.set("q", params.q.trim());
  if (params._sort) {
    url.searchParams.set("_sort",  params._sort);
    url.searchParams.set("_order", params._order ?? "asc");
  }
  if (params._page  !== undefined) url.searchParams.set("_page",  String(params._page));
  if (params._limit !== undefined) url.searchParams.set("_limit", String(params._limit));

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error(`fetchProducts: ${res.status}`);

  const products   = (await res.json()) as Product[];
  const totalCount = Number(res.headers.get("X-Total-Count") ?? 0);
  return { products, totalCount };
}
