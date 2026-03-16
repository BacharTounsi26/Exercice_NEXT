import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "dangerGhost"
  | "plain";

type ButtonSize   = "sm" | "md" | "lg" | "xl" | "icon" | "iconSm" | "none";
type ButtonRadius = "md" | "lg" | "xl" | "full" | "none";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  radius?:    ButtonRadius;
  fullWidth?: boolean;
}

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-slate-300",
  secondary:
    "bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300",
  outline:
    "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400",
  ghost:       "bg-transparent text-slate-600 hover:bg-slate-50",
  dangerGhost: "bg-transparent text-slate-400 hover:text-red-500 hover:bg-red-50",
  plain:       "",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm:     "px-3 py-1.5 text-sm",
  md:     "px-4 py-2 text-sm",
  lg:     "px-5 py-2.5 text-sm",
  xl:     "px-8 py-3 text-sm",
  icon:   "w-10 h-10",
  iconSm: "w-7 h-7",
  none:   "",
};

const RADIUS_CLASSES: Record<ButtonRadius, string> = {
  md:   "rounded-md",
  lg:   "rounded-lg",
  xl:   "rounded-xl",
  full: "rounded-full",
  none: "",
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant  = "primary",
    size     = "md",
    radius   = "md",
    fullWidth = false,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={joinClasses(
        BASE_CLASSES,
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        RADIUS_CLASSES[radius],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
