import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-semibold text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-marine-800)] text-white hover:bg-[var(--color-marine-700)] shadow-[var(--shadow-e1)] hover:shadow-[var(--shadow-e2)]",
        secondary:
          "border-2 border-[var(--color-marine-800)] text-[var(--color-marine-800)] hover:bg-[var(--color-marine-800)] hover:text-white",
        accent:
          "bg-[var(--color-vermeil-500)] text-white hover:bg-[var(--color-vermeil-700)] shadow-[var(--shadow-e1)]",
        ghost:
          "text-[var(--color-marine-800)] hover:bg-[var(--color-marine-50)]",
        onDark:
          "border-2 border-white text-white hover:bg-white hover:text-[var(--color-marine-800)]",
        link:
          "text-[var(--color-marine-800)] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
