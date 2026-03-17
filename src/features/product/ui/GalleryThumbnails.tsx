"use client";

import { useState }   from "react";
import FallbackImage  from "@/shared/ui/FallbackImage";

interface Props {
  src:         string;
  productName: string;
  thumbCount:  number;
}

/**
 * Miniatures cliquables — CSR (interactivité pure).
 * Le rendu de l'image principale reste SSR dans ProductGallery.
 */
export default function GalleryThumbnails({ src, productName, thumbCount }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-3">
      {Array.from({ length: thumbCount }, (_, i) => (
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          className={[
            "relative w-20 h-20 rounded-xl border-2 bg-white transition-all duration-200 overflow-hidden",
            activeIndex === i
              ? "border-indigo-500 shadow-md"
              : "border-slate-200 hover:border-indigo-300",
          ].join(" ")}
          aria-label={`View ${i + 1}`}
        >
          <div className="absolute inset-2">
            <FallbackImage
              src={src}
              alt={`${productName} — view ${i + 1}`}
              fill
              className="object-contain"
              sizes="80px"
            />
          </div>
        </button>
      ))}
    </div>
  );
}
