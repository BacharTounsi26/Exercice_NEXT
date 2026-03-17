"use client";

import { useHeroSlider } from "../hooks/useHeroSlider";
import Button            from "@/shared/ui/Button";

interface Props {
  count: number;
}

/**
 * Contrôles interactifs du carrousel — CSR.
 * Gère l'index courant, l'autoplay, les boutons prev/next.
 * Le défilement est appliqué via CSS variable sur le conteneur SSR.
 */
export default function HeroSliderClient({ count }: Props) {
  const { current, next, prev } = useHeroSlider(count);

  // Injecte le transform directement sur le conteneur des slides via un élément CSS
  // en utilisant une balise <style> dynamique (pas de portal nécessaire)
  return (
    <>
      <style>{`
        .hero-track { transform: translateX(-${current * 100}%); }
      `}</style>

      <Button
        onClick={prev}
        variant="plain"
        size="none"
        radius="md"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded text-xl z-10"
        aria-label="Previous slide"
      >
        ‹
      </Button>
      <Button
        onClick={next}
        variant="plain"
        size="none"
        radius="md"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded text-xl z-10"
        aria-label="Next slide"
      >
        ›
      </Button>
    </>
  );
}
