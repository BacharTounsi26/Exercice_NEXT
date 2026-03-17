// Skeleton for the Product Detail page

export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-10 animate-pulse">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <div className="h-4 bg-slate-200 rounded w-16" />
        <div className="h-4 bg-slate-200 rounded w-3" />
        <div className="h-4 bg-slate-200 rounded w-24" />
        <div className="h-4 bg-slate-200 rounded w-3" />
        <div className="h-4 bg-slate-200 rounded w-32" />
      </div>

      {/* Main layout: Gallery + Info */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Gallery */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="rounded-2xl bg-slate-100 aspect-square" />

          {/* Product info */}
          <div className="space-y-4">
            <div className="h-3 bg-slate-200 rounded w-1/4" />
            <div className="h-7 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="flex gap-2">
              <div className="h-6 bg-slate-200 rounded-full w-20" />
              <div className="h-6 bg-slate-200 rounded-full w-16" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-4 bg-slate-200 rounded w-4/6" />
            </div>
            <div className="flex gap-3 pt-4">
              <div className="h-11 bg-slate-200 rounded-xl flex-1" />
              <div className="h-11 bg-slate-200 rounded-xl w-11" />
            </div>
          </div>
        </div>
      </div>

      {/* Description tabs */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="h-10 bg-slate-200 rounded-xl w-28" />
          <div className="h-10 bg-slate-100 rounded-xl w-28" />
          <div className="h-10 bg-slate-100 rounded-xl w-28" />
        </div>
        <div className="rounded-2xl bg-slate-50 p-6 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-4 bg-slate-200 rounded w-4/6" />
        </div>
      </div>

      {/* Other brands */}
      <div className="space-y-3">
        <div className="h-5 bg-slate-200 rounded w-40" />
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 rounded-xl w-28" />
          ))}
        </div>
      </div>

    </div>
  );
}
