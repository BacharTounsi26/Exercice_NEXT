/**
 * Parses a sort option string like "price_asc" or "discountRate_desc"
 * into separate `_sort` and `_order` query parameters.
 *
 * Uses `lastIndexOf("_")` so keys containing underscores (e.g. "discountRate")
 * are handled correctly.
 */
export function parseSortOption(raw: string): { _sort?: string; _order?: "asc" | "desc" } {
  if (!raw) return {};
  const lastUnderscore = raw.lastIndexOf("_");
  if (lastUnderscore < 0) return { _sort: raw };
  return {
    _sort:  raw.slice(0, lastUnderscore),
    _order: raw.slice(lastUnderscore + 1) as "asc" | "desc",
  };
}
