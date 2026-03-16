import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 flex flex-col items-center justify-center text-center gap-6">

      <div className="w-24 h-24 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
        <svg className="w-12 h-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <div className="space-y-2">
        <p className="text-6xl font-black text-slate-200">404</p>
        <h1 className="text-2xl font-bold text-slate-800">Page not found</h1>
        <p className="text-slate-500 max-w-md">
          The product, category, or page you are looking for does not exist or may have been removed.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-2">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
        >
          Browse Shop
        </Link>
      </div>

    </div>
  );
}
