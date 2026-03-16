import { fetchSlides }      from "@/features/home/api/fetchSlides";
import { fetchTopNew }      from "@/features/home/api/fetchTopNew";
import { fetchCategories }  from "@/features/layout/api/fetchCategories";
import HeroSlider           from "@/features/home/ui/HeroSlider";
import PromoStrip           from "@/features/home/ui/PromoStrip";
import BrandStrip           from "@/features/home/ui/BrandStrip";
import ProductWidgetSection from "@/features/home/ui/ProductWidgetSection";
import HomeClientSection    from "@/features/home/ui/HomeClientSection";

export default async function HomePage() {
  const [slides, topNew, categories] = await Promise.all([
    fetchSlides().catch(() => []),
    fetchTopNew().catch(() => []),
    fetchCategories().catch(() => []),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
      <HeroSlider slides={slides} />
      <PromoStrip />
      <BrandStrip categories={categories} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ProductWidgetSection
            title="New Arrivals"
            products={topNew}
            viewAllHref="/new-arrivals"
          />
        </div>
        <div className="md:col-span-2">
          <HomeClientSection />
        </div>
      </div>
    </div>
  );
}
