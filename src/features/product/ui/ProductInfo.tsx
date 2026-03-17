import AddToCartControls from "@/features/product/ui/AddToCartControls";
import type { Product }  from "@/shared/types/Product";

interface Props {
  product: Product;
}

function computeProductInfo(product: Product) {
  const discountedPrice = product.discountRate
    ? +(product.price * (1 - product.discountRate / 100)).toFixed(2)
    : product.price;
  const oldPrice = product.discountRate ? product.price : null;
  const stars    = Array.from({ length: 5 }, (_, i) => i < (product.review || 0));
  return { discountedPrice, oldPrice, stars };
}

/**
 * Affichage des informations produit — SSR (Server Component).
 * Seule la zone quantité + panier est déléguée à AddToCartControls (CSR).
 */
export default function ProductInfo({ product }: Props) {
  const { discountedPrice, oldPrice, stars } = computeProductInfo(product);
  const inStock = product.inStock !== false;

  return (
    <div className="flex flex-col gap-5">

      <div>
        <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          {product.categoryName}
        </span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 capitalize leading-snug">
        {product.name}
      </h1>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {stars.map((filled, i) => (
            <svg key={i} className={`w-5 h-5 ${filled ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.538 1.118l-3.376-2.454a1 1 0 00-1.175 0l-3.376 2.454c-.783.57-1.838-.197-1.538-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.056 9.386c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.959z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-slate-500">{product.review ?? 0}/5</span>
      </div>

      <div className="flex items-baseline gap-3 py-3 border-y border-slate-100">
        <span className="text-3xl font-bold text-indigo-600">{discountedPrice}€</span>
        {oldPrice && (
          <>
            <span className="text-lg text-slate-400 line-through">{oldPrice}€</span>
            <span className="text-sm font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
              -{product.discountRate}%
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-red-400"}`} />
        <span className={`text-sm font-medium ${inStock ? "text-emerald-700" : "text-red-600"}`}>
          {inStock ? "In stock — Fast delivery" : "Out of stock"}
        </span>
      </div>

      {/* Sélection quantité + bouton panier — Client Component isolé */}
      <AddToCartControls product={product} />

    </div>
  );
}
