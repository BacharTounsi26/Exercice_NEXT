import { imagePath }       from "@/shared/utils/imagePath";
import type { Category }   from "@/shared/types/Category";

type Props = {
  categories: Category[];
};

export default function BrandStrip({ categories }: Props) {
  if (categories.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-slate-500">
        No brands available at the moment.
      </div>
    );
  }

  return (
    <div className="py-10 grid grid-cols-2 md:grid-cols-5 gap-6">
      {categories.map((c) => (
        <div
          key={c.id}
          className="flex items-center justify-center bg-white rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePath(c.image)}
            alt={c.name}
            className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
          />
        </div>
      ))}
    </div>
  );
}
