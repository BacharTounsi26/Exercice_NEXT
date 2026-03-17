import Image               from "next/image";
import type { Slide }     from "../api/fetchSlides";
import { imagePath }      from "@/shared/utils/imagePath";
import HeroSliderClient   from "./HeroSliderClient";

type Props = {
  slides: Slide[];
};

/**
 * Carrousel SSR : toutes les images sont rendues côté serveur.
 * - 1ère image : priority (préchargée, LCP optimisé)
 * - Images suivantes : loading="lazy"
 * - Contrôles prev/next : délégués au client island HeroSliderClient
 */
export default function HeroSlider({ slides }: Props) {
  if (slides.length === 0) {
    return (
      <div className="h-64 md:h-96 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 text-sm">
        No highlighted content available right now.
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {/* Le client island injecte la classe .hero-track { transform } via <style> */}
      <div className="hero-track flex transition-transform duration-700 ease-in-out">
        {slides.map((s, index) => (
          <div key={s.id} className="relative min-w-full h-64 md:h-96">
            <Image
              src={imagePath(s.image)}
              alt={s.title ?? "Slide"}
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Contrôles interactifs — client island */}
      <HeroSliderClient count={slides.length} />
    </div>
  );
}
