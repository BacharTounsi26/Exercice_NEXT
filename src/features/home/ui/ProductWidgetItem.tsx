import Link                 from "next/link";
import FallbackImage        from "@/shared/ui/FallbackImage";
import type { Product }     from "@/shared/types/Product";
import { productImagePath } from "@/shared/utils/productImagePath";

interface Props { product: Product }

export default function ProductWidgetItem({ product }: Props) {
  const discountedPrice = product.discountRate
    ? +(product.price * (1 - product.discountRate / 100)).toFixed(2)
    : product.price;

  return (
    <Link
      href={`/product/${product.id}`}
      className="w-48 md:w-52 flex-shrink-0 flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
    >
      <div className="h-48 bg-slate-50 flex items-center justify-center p-3 overflow-hidden">
        <div className="relative w-full h-full">
          <FallbackImage
            src={productImagePath(product.categoryName, product.imageName)}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            sizes="208px"
          />
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <p className="text-[13px] font-semibold text-gray-800 line-clamp-2 capitalize">
          {product.name}
        </p>
        <p className="text-indigo-600 font-bold text-sm">{discountedPrice} €</p>
      </div>
    </Link>
  );
}
