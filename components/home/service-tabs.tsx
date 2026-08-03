"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

type ServiceItem = { key: string; icon: string; title: string; body: string };

export function ServiceTabs({ services, cta }: { services: ServiceItem[]; cta: string }) {
  const [active, setActive] = useState(0);
  const cur = services[active];

  const shortLabel = (title: string) => {
    const words = title.split(" ");
    return words.length <= 3 ? title : words.slice(0, 3).join(" ") + "…";
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {services.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              i === active
                ? "bg-[var(--color-marine-800)] text-white shadow-md scale-105"
                : "bg-white border border-[var(--color-border)] text-[var(--color-granit)] hover:border-[var(--color-marine-800)] hover:text-[var(--color-marine-800)]"
            }`}
            aria-pressed={i === active}
          >
            <span>{s.icon}</span>
            <span>{shortLabel(s.title)}</span>
          </button>
        ))}
      </div>

      <div key={active} className="card-base p-8 lg:p-12 text-center max-w-2xl mx-auto animate-tab-in">
        <div className="text-5xl mb-5">{cur.icon}</div>
        <h3 className="text-xl mb-4 font-bold">{cur.title}</h3>
        <p className="text-[var(--color-granit)] leading-relaxed mb-8">{cur.body}</p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 bg-[var(--color-marine-800)] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[var(--color-marine-700)] transition-colors"
        >
          {cta} →
        </Link>
      </div>
    </div>
  );
}
