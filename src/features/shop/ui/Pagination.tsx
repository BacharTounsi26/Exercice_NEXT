"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { memo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages:  number;
}

function buildRange(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | null)[] = [1];
  if (current > 3)         pages.push(null);
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push(null);
  pages.push(total);
  return pages;
}

const Pagination = memo(function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) params.delete("page");
    else            params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  const base     = "min-w-[38px] h-9 px-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors";
  const active   = "bg-indigo-600 text-white shadow-sm pointer-events-none";
  const normal   = "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 cursor-pointer";
  const disabled = "bg-white border border-slate-200 text-slate-300 pointer-events-none cursor-not-allowed";

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10 flex-wrap" aria-label="Pagination">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
        className={`${base} ${currentPage === 1 ? disabled : normal}`}
      >
        ‹
      </button>

      {buildRange(currentPage, totalPages).map((p, i) =>
        p === null
          ? <span key={`e${i}`} className="min-w-[38px] h-9 flex items-center justify-center text-slate-400 select-none">…</span>
          : <button
              key={p}
              onClick={() => goTo(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
              className={`${base} ${p === currentPage ? active : normal}`}
            >
              {p}
            </button>
      )}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
        className={`${base} ${currentPage === totalPages ? disabled : normal}`}
      >
        ›
      </button>
    </nav>
  );
});

export default Pagination;
