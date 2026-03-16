import Link from "next/link";

interface BreadcrumbItem { id: string; name: string; }

interface BreadcrumbProps {
  category?: BreadcrumbItem;
  product?:  string;
  className?: string;
}

export default function Breadcrumb({ category, product, className = "" }: BreadcrumbProps) {
  const sep = <span className="text-slate-300 mx-1.5 select-none">›</span>;

  return (
    <nav aria-label="Breadcrumb" className={`text-[13px] text-slate-400 flex items-center flex-wrap ${className}`}>

      <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>

      {category && (
        <>
          {sep}
          {product ? (
            <Link href={`/shop/${category.id}`} className="hover:text-indigo-600 transition-colors">
              {category.name}
            </Link>
          ) : (
            <span className="text-slate-600 font-medium">{category.name}</span>
          )}
        </>
      )}

      {product && (
        <>
          {sep}
          <span className="text-slate-600 font-medium truncate max-w-[220px]">{product}</span>
        </>
      )}
    </nav>
  );
}
