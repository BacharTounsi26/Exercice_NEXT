// Client-side fetch deduplication + TTL cache (5 minutes)
// Used by client-side API calls to avoid redundant fetches.
// Server-side fetching uses Next.js built-in fetch caching directly.

const TTL_MS = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const inFlight = new Map<string, Promise<unknown>>();

export async function cachedFetch<T>(
  url: string,
  transform?: (res: Response) => Promise<T>
): Promise<T> {
  const now = Date.now();
  const hit = cache.get(url);
  if (hit && hit.expiresAt > now) return hit.data as T;

  const flying = inFlight.get(url);
  if (flying) return flying as Promise<T>;

  const promise = (async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
    const data = transform ? await transform(res) : ((await res.json()) as T);
    cache.set(url, { data, expiresAt: Date.now() + TTL_MS });
    inFlight.delete(url);
    return data;
  })();

  inFlight.set(url, promise);
  return promise;
}

export function invalidateCache(url?: string): void {
  if (url) {
    cache.delete(url);
    inFlight.delete(url);
  } else {
    cache.clear();
    inFlight.clear();
  }
}
