"use client";

import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  const isNetworkError =
    error.message.toLowerCase().includes("fetch") ||
    error.message.toLowerCase().includes("network") ||
    error.message.toLowerCase().includes("econnrefused") ||
    error.message.toLowerCase().includes("failed to fetch");

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 flex flex-col items-center justify-center text-center gap-6">

      <div className="w-24 h-24 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
        {isNetworkError ? (
          <svg className="w-12 h-12 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 12h.01M8.464 15.536a5 5 0 010-7.072M5.636 18.364a9 9 0 010-12.728" />
          </svg>
        ) : (
          <svg className="w-12 h-12 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        )}
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">
          {isNetworkError ? "Backend unavailable" : "Something went wrong"}
        </h1>
        <p className="text-slate-500 max-w-md">
          {isNetworkError
            ? "The server could not be reached. Please make sure the API is running and try again."
            : "An unexpected error occurred. Please try again or go back to the home page."}
        </p>
        {error.digest && (
          <p className="text-xs text-slate-400 font-mono mt-1">Error ID: {error.digest}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-2">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Try again
        </button>
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
