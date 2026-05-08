"use client";

import Link            from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/shared/types/Category";

interface NavbarProps {
  categories: Category[];
  className?: string;
}

export default function Navbar({ categories, className = "" }: NavbarProps) {
  const pathname = usePathname();

  const base   = "rounded px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors";
  const active = "bg-white/20 text-white shadow-sm";
  const idle   = "text-indigo-100 hover:text-white hover:bg-white/10";

  const shopMatch      = pathname.match(/^\/shop\/([^/?]+)/);
  const activeCategoryId = shopMatch?.[1];
  const isShopPath     = pathname.startsWith("/shop");
  const isHomePath     = pathname === "/";

  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout")) {
    return null;
  }

  return (
    <nav className={`w-full bg-indigo-700 border-b border-indigo-800 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        <ul className="flex flex-wrap items-center gap-1.5 py-2.5">

          <li>
            <Link href="/" className={`${base} ${isHomePath ? active : idle}`}>
              HOME
            </Link>
          </li>

          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/shop/${c.id}`}
                className={`${base} ${c.id === activeCategoryId ? active : idle}`}
              >
                {c.name.toUpperCase()}
              </Link>
            </li>
          ))}

          <li className="ml-auto">
            <Link
              href="/shop"
              className={`${base} ${!activeCategoryId && isShopPath ? active : idle}`}
            >
              ALL PRODUCTS
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}
