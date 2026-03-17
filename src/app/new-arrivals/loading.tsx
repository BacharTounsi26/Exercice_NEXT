// Skeleton for the New Arrivals page

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

export default function NewArrivalsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6 animate-pulse">

      {/* Breadcrumb */}
      <div className="h-4 bg-slate-200 rounded w-32" />

      {/* Page header */}
      <div className="space-y-2">
        <div className="h-7 bg-slate-200 rounded w-36" />
        <div className="h-4 bg-slate-200 rounded w-64" />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

    </div>
  );
}
