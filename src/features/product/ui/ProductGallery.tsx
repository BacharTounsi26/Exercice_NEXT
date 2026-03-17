import { productImagePath }  from "@/shared/utils/productImagePath";
import FallbackImage         from "@/shared/ui/FallbackImage";
import GalleryThumbnails     from "./GalleryThumbnails";

interface Props {
  imageName:    string;
  categoryName: string;
  productName:  string;
}

const THUMB_COUNT = 3;

/**
 * Galerie produit — SSR (Server Component).
 * L'image principale est rendue côté serveur.
 * Les miniatures interactives sont déléguées à GalleryThumbnails (CSR).
 */
export default function ProductGallery({ imageName, categoryName, productName }: Props) {
  const src = productImagePath(categoryName, imageName);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[320px] md:min-h-[400px] overflow-hidden group">
        <div className="absolute inset-6">
          <FallbackImage
            src={src}
            alt={productName}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Miniatures cliquables — client island */}
      <GalleryThumbnails src={src} productName={productName} thumbCount={THUMB_COUNT} />
    </div>
  );
}
