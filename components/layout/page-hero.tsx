import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeroProps {
  label?: string;
  heading: string;
  sub?: string;
  children?: ReactNode;
  className?: string;
  tone?: "marine" | "dark";
  image?: string;
}

export function PageHero({ label, heading, sub, children, className, tone = "marine", image }: PageHeroProps) {
  const bg = tone === "marine" ? "bg-[var(--color-marine-800)]" : "bg-[var(--color-encre)]";

  return (
    <section className={cn(bg, "relative text-white pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden", className)}>
      {image && (
        <Image
          src={image}
          alt=""
          fill
          className="object-cover opacity-20 mix-blend-luminosity"
          priority
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">
        <Container>
          {label && (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50 mb-3">{label}</p>
          )}
          <h1 className="max-w-3xl">{heading}</h1>
          {sub && <p className="mt-4 text-lg text-white/70 max-w-2xl leading-relaxed">{sub}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Container>
        <div className="tricolore-strip mt-10" />
      </div>
    </section>
  );
}
