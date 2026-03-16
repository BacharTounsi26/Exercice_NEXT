import type { ReactNode } from "react";

interface PageHeaderProps {
  title:          string;
  subtitle?:      ReactNode;
  className?:     string;
  titleClassName?: string;
}

export default function PageHeader({ title, subtitle, className = "", titleClassName = "" }: PageHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h1 className={`font-bold text-slate-800 text-2xl md:text-3xl ${titleClassName}`}>
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}
