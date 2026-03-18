import type { Metadata }  from "next";
import type { ReactNode }  from "react";
import { Suspense }        from "react";
import "./globals.css";
import StoreProvider       from "@/store/StoreProvider";
import Header              from "@/features/layout/ui/Header";
import Navbar              from "@/features/layout/ui/Navbar";
import Footer              from "@/features/layout/ui/Footer";
import { fetchCategories } from "@/features/layout/api/fetchCategories";
import type { Category }   from "@/shared/types/Category";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    // Child pages export only the unique part (e.g. "Samsung");
    // the template appends " — ShopMobile" automatically.
    template: "%s — ShopMobile",
    default:  "ShopMobile — Premium Devices",
  },
  description: "Find the latest smartphones and mobile technology at ShopMobile.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Fetch categories for Navbar + Footer (ISR cached)
  let categories: Category[] = [];
  try {
    categories = await fetchCategories();
  } catch {
    // Degrade gracefully — Navbar renders without categories
  }

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-slate-100">
        <StoreProvider>
          {/* Header uses useSearchParams() — must be wrapped in Suspense */}
          <Suspense fallback={<div className="h-16 bg-white border-b border-slate-100" />}>
            <Header />
          </Suspense>
          {/* Navbar is a client component — reads usePathname() for reactive active state */}
          <Navbar categories={categories} />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
