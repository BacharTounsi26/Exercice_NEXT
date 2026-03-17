// Skeleton for the Home page (Hero + Promo + Brands + Product sections)

function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden animate-pulse">
      <div className="bg-slate-100 aspect-square" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-4/5" />
        <div className="h-3 bg-slate-200 rounded w-2/3" />
        <div className="h-5 bg-slate-200 rounded w-1/2 mt-1" />
        <div className="h-9 bg-slate-200 rounded-xl mt-2" />
      </div>
    </div>
  );
}

export default function HomeLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-10 animate-pulse">

      {/* Hero Slider */}
      <div className="rounded-2xl bg-slate-100 h-72 w-full" />

      {/* Promo strip */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-slate-100 h-16" />
        ))}
      </div>

      {/* Brand strip */}
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-full bg-slate-100 h-9 w-24 flex-shrink-0" />
        ))}
      </div>

      {/* Product sections grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* New arrivals widget */}
        <div className="space-y-3">
          <div className="h-5 bg-slate-200 rounded w-1/2" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="bg-slate-100 rounded-lg w-14 h-14 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-4/5" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>

        {/* Top sellers / featured grid */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>

    </div>
  );
}
