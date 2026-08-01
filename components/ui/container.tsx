import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container-page", className)} {...props} />;
}

type SectionTone = "default" | "muted" | "dark" | "marine";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  as?: "section" | "div" | "article";
}

const toneClasses: Record<SectionTone, string> = {
  default: "bg-[var(--color-blanc)]",
  muted: "bg-[var(--color-calcaire)]",
  dark: "bg-[var(--color-encre)] text-white",
  marine: "bg-[var(--color-marine-800)] text-white",
};

export function Section({ tone = "default", as: Tag = "section", className, ...props }: SectionProps) {
  return (
    <Tag
      className={cn("py-16 md:py-24", toneClasses[tone], className)}
      {...props}
    />
  );
}

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-vermeil-500)] mb-3",
        className
      )}
      {...props}
    />
  );
}
