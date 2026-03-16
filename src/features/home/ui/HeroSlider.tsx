"use client";

import type { Slide }     from "../api/fetchSlides";
import { imagePath }      from "@/shared/utils/imagePath";
import { useHeroSlider }  from "../hooks/useHeroSlider";
import Button             from "@/shared/ui/Button";

type Props = {
  slides:   Slide[];
  loading?: boolean;
};

export default function HeroSlider({ slides, loading = false }: Props) {
  const { current, next, prev } = useHeroSlider(slides.length);

  if (loading)
    return <div className="h-64 md:h-96 bg-slate-200 animate-pulse rounded" />;

  if (slides.length === 0) {
    return (
      <div className="h-64 md:h-96 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 text-sm">
        No highlighted content available right now.
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s) => (
          <div key={s.id} className="min-w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePath(s.image)}
              alt={s.title ?? "Slide"}
              className="h-64 w-full object-cover md:h-96"
            />
          </div>
        ))}
      </div>

      <Button
        onClick={prev}
        variant="plain"
        size="none"
        radius="md"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded text-xl"
      >
        ‹
      </Button>

      <Button
        onClick={next}
        variant="plain"
        size="none"
        radius="md"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded text-xl"
      >
        ›
      </Button>
    </div>
  );
}
