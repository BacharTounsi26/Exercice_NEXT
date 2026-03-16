import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 flex flex-col items-center justify-center text-center gap-6">

      <div className="w-24 h-24 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
        <svg className="w-12 h-12 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
        </svg>
      </div>

      <div className="space-y-2">
        <p className="text-6xl font-black text-slate-200">404</p>
        <h1 className="text-2xl font-bold text-slate-800">Category not found</h1>
        <p className="text-slate-500 max-w-md">
          This brand or category does not exist. It may have been renamed or removed.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-2">
        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          All Products
        </Link>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          Back to Home
        </Link>
      </div>

    </div>
  );
}
