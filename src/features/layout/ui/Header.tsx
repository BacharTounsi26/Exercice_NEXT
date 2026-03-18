"use client";

import { memo, useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link                              from "next/link";
import { useAppSelector }                from "@/shared/hooks/useAppStore";
import { useDebounce }                   from "@/shared/hooks/useDebounce";
import Button                            from "@/shared/ui/Button";
import { sanitizeText }                  from "@/shared/utils/sanitizeInput";
import { selectCartTotal, selectCartCount } from "@/features/cart/state/selectors";

const Header = memo(function Header() {
  const router   = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isCheckoutPage = pathname.startsWith("/checkout") || pathname.startsWith("/cart");
  const isShopPage     = pathname.startsWith("/shop");
  const isSearchPage   = pathname.startsWith("/search");

  // Sync local search input with URL ?q= param (setState-during-render pattern)
  const urlQ = (isShopPage || isSearchPage) ? (searchParams.get("q") ?? "") : "";
  const [q,        setQ]        = useState(urlQ);
  const [prevUrlQ, setPrevUrlQ] = useState(urlQ);
  if (prevUrlQ !== urlQ) {
    setPrevUrlQ(urlQ);
    setQ(urlQ);
  }

  const cartTotal = useAppSelector(selectCartTotal);
  const cartCount = useAppSelector(selectCartCount);

  // Defer cart values until after hydration to prevent SSR mismatch.
  // Initialize to false on both server and client; flip only after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const displayTotal = mounted ? cartTotal : 0;
  const displayCount = mounted ? cartCount : 0;

  // ── Live search ─────────────────────────────────────────────────────────
  const debouncedQ = useDebounce(q, 400);

  useEffect(() => {
    const safe = sanitizeText(debouncedQ, 80);
    if (safe === urlQ) return;
    if (safe.length === 1) return;
    router.push(`/search?q=${encodeURIComponent(safe)}`);
  }, [debouncedQ, urlQ, router]);
  // ────────────────────────────────────────────────────────────────────────

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const safeQuery = sanitizeText(q, 80);
    router.push(`/search?q=${encodeURIComponent(safeQuery)}`);
  }

  function handleClear() {
    setQ("");
    if (isSearchPage) router.push("/search");
    else if (isShopPage) router.push("/shop");
  }

  return (
    <header className="w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="grid grid-cols-12 items-center gap-4">

          {/* Logo */}
          <div className={`col-span-12 ${isCheckoutPage ? "sm:col-span-8" : "sm:col-span-4"}`}>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md group-hover:bg-indigo-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                  <path d="M9 21V12h6v9" fill="none" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="text-left leading-tight">
                <div className="text-[17px] font-semibold text-slate-800">
                  Shop<span className="text-indigo-600">Mobile</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400">
                  Premium Devices
                </div>
              </div>
            </Link>
          </div>

          {/* Recherche */}
          {!isCheckoutPage && (
            <div className="col-span-12 sm:col-span-5">
              <form onSubmit={handleSearch} className="flex">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search products..."
                    className="w-full rounded-l-lg border border-slate-300 px-4 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                  />
                  {q && (
                    <Button
                      type="button"
                      onClick={handleClear}
                      aria-label="Clear"
                      variant="plain"
                      size="none"
                      radius="none"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xl leading-none"
                    >×</Button>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="none"
                  radius="lg"
                  disabled={!q.trim()}
                  className="rounded-r-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold uppercase text-white hover:bg-indigo-700 transition-colors flex-shrink-0 disabled:bg-indigo-400 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Search
                </Button>
              </form>
            </div>
          )}

          {/* Mini-cart */}
          <div className={`col-span-12 ${isCheckoutPage ? "sm:col-span-4" : "sm:col-span-3"}`}>
            <Link
              href="/cart"
              className="relative flex w-full items-center justify-end gap-3 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:border-indigo-200 transition group"
            >
              <span className="text-slate-500">
                Cart :{" "}
                <span className="font-semibold text-indigo-600">
                  {displayTotal.toFixed(2)} €
                </span>
              </span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.16 14.26l.03.01L19 15a1 1 0 0 0 .98-.8l1.71-8.58A1 1 0 0 0 20.71 4H6.21l-.38-2H2v2h2l2.6 12.01a3.001 3.001 0 1 0 5.8.99h4.8a3.001 3.001 0 1 0 0-2H10.4a3 3 0 0 0-3.24-2.74Z" />
              </svg>
              {displayCount > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                  {displayCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
});

export default Header;
