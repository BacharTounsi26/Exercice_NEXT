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
  const active = "bg-indigo-600 text-white shadow-sm";
  const idle   = "text-slate-600 hover:text-slate-900 hover:bg-slate-100";

  const shopMatch      = pathname.match(/^\/shop\/([^/?]+)/);
  const activeCategoryId = shopMatch?.[1];
  const isShopPath     = pathname.startsWith("/shop");
  const isHomePath     = pathname === "/";

  return (
    <nav className={`w-full bg-slate-50 border-b border-slate-100 ${className}`}>
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
