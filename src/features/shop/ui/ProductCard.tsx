"use client";

import { memo, useState, useCallback } from "react";
import Link                   from "next/link";
import { useProductInfo }     from "@/shared/hooks/useProductInfo";
import { productImagePath }   from "@/shared/utils/productImagePath";
import { useCart }            from "@/features/cart/hooks/useCart";
import type { Product }       from "@/shared/types/Product";

interface ProductCardProps { product: Product }

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23f1f5f9'/%3E%3Cpath d='M40 50h40v30H40z' fill='%23cbd5e1' rx='4'/%3E%3Ccircle cx='52' cy='45' r='6' fill='%23cbd5e1'/%3E%3C/svg%3E";

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { discountedPrice, oldPrice, stars } = useProductInfo(product);
  const { add }  = useCart();
  const [added,  setAdded]  = useState(false);

  const handleAddToCart = useCallback(() => {
    if (product.inStock === false) return;
    add(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [add, product]);

  const inStock = product.inStock !== false;

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg overflow-hidden w-full transition-shadow duration-300 group">

      {/* IMAGE */}
      <Link href={`/product/${product.id}`} className="relative flex-shrink-0 h-56 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        {product.discountRate && product.discountRate > 0 && (
          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            -{product.discountRate}%
          </span>
        )}
        {!inStock && (
          <span className="absolute top-2 right-2 z-10 bg-slate-400 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            Out of stock
          </span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImagePath(product.categoryName, product.imageName)}
          alt={product.name}
          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
            (e.currentTarget as HTMLImageElement).onerror = null;
          }}
        />
      </Link>

      {/* CONTENU */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">

        <Link href={`/product/${product.id}`}>
          <p className="text-gray-900 font-semibold line-clamp-2 text-base hover:text-indigo-600 transition-colors capitalize">
            {product.name}
          </p>
        </Link>

        <div className="flex items-center space-x-1" aria-label={`Rating: ${product.review ?? 0}/5`}>
          {stars.map((filled, idx) => (
            <svg key={idx} className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.538 1.118l-3.376-2.454a1 1 0 00-1.175 0l-3.376 2.454c-.783.57-1.838-.197-1.538-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.056 9.386c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.959z" />
            </svg>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-indigo-600 font-bold text-lg">{discountedPrice}€</span>
          {oldPrice && <span className="text-gray-400 line-through text-sm">{oldPrice}€</span>}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!inStock || added}
          className={`
            w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200
            flex items-center justify-center gap-2
            ${added
              ? "bg-emerald-500 text-white"
              : inStock
                ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow hover:shadow-md"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"}
          `}
        >
          {added ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Added ✓
            </>
          ) : inStock ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.16 14.26l.03.01L19 15a1 1 0 0 0 .98-.8l1.71-8.58A1 1 0 0 0 20.71 4H6.21l-.38-2H2v2h2l2.6 12.01a3.001 3.001 0 1 0 5.8.99h4.8a3.001 3.001 0 1 0 0-2H10.4a3 3 0 0 0-3.24-2.74Z" />
              </svg>
              Add to cart
            </>
          ) : (
            "Out of stock"
          )}
        </button>
      </div>
    </div>
  );
});

export default ProductCard;
