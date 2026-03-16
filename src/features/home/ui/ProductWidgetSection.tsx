import type { Product } from "@/shared/types/Product";
import ProductWidgetItem from "./ProductWidgetItem";
import Button from "@/shared/ui/Button";
import Link from "next/link";

type Props = {
  title:      string;
  products:   Product[];
  viewAllHref?: string;
};

export default function ProductWidgetSection({ title, products, viewAllHref }: Props) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4 px-2 md:px-0">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-700 text-sm font-semibold border border-indigo-200 hover:border-indigo-300 transition-all duration-150 active:scale-95"
          >
            View All
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-gray-400 text-sm py-4">No products to display.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 px-2 md:px-0">
          {products.map((p) => (
            <ProductWidgetItem key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
