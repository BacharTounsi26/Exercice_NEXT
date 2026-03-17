import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 flex flex-col items-center justify-center text-center gap-6">

      <div className="w-24 h-24 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
        <svg className="w-12 h-12 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>

      <div className="space-y-2">
        <p className="text-6xl font-black text-slate-200">404</p>
        <h1 className="text-2xl font-bold text-slate-800">Product not found</h1>
        <p className="text-slate-500 max-w-md">
          This product does not exist or may have been removed from our catalogue.
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
