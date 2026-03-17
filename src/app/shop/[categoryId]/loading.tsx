// Skeleton for the Category Shop page

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

export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 animate-pulse">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 bg-slate-200 rounded w-16" />
        <div className="h-4 bg-slate-200 rounded w-3" />
        <div className="h-4 bg-slate-200 rounded w-24" />
      </div>

      {/* Page header */}
      <div className="mb-4 space-y-2">
        <div className="h-7 bg-slate-200 rounded w-40" />
        <div className="h-4 bg-slate-200 rounded w-56" />
      </div>

      {/* Sort bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-4 bg-slate-200 rounded w-28" />
        <div className="h-9 bg-slate-200 rounded-xl w-40" />
      </div>

      {/* Product grid — 12 items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

    </div>
  );
}
