"use client";

export const CALENDLY_URL =
  "https://calendly.com/corpshoresolutions/book-a-discovery-call-meeting-with-corpshore-solutions";

function loadCalendlyAndOpen() {
  if (typeof window === "undefined") return;

  const open = () => {
    (window as any).Calendly?.initPopupWidget({ url: CALENDLY_URL });
  };

  if ((window as any).Calendly) {
    open();
    return;
  }

  if (!document.getElementById("calendly-css")) {
    const link = document.createElement("link");
    link.id = "calendly-css";
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }

  if (!document.getElementById("calendly-js")) {
    const script = document.createElement("script");
    script.id = "calendly-js";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = open;
    document.head.appendChild(script);
  }
}

interface CalendlyButtonProps {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "onDark" | "outline";
  icon?: boolean;
}

const SIZE = {
  sm: "h-8 px-3.5 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-6 text-sm",
};

const VARIANT = {
  primary: "bg-[var(--color-marine-800)] text-white hover:bg-[var(--color-marine-700)]",
  accent:  "bg-[var(--color-vermeil-500)] text-white hover:bg-[var(--color-vermeil-600)]",
  onDark:  "bg-white/10 text-white border border-white/25 hover:bg-white/20",
  outline: "border border-[var(--color-marine-800)] text-[var(--color-marine-800)] hover:bg-[var(--color-marine-50)]",
};

export function CalendlyButton({
  label,
  className = "",
  size = "md",
  variant = "primary",
  icon = true,
}: CalendlyButtonProps) {
  return (
    <button
      type="button"
      onClick={loadCalendlyAndOpen}
      className={`inline-flex items-center gap-2 font-semibold rounded-full transition-colors cursor-pointer ${SIZE[size]} ${VARIANT[variant]} ${className}`}
    >
      {icon && <span aria-hidden="true">📅</span>}
      {label ?? "Réserver un appel"}
    </button>
  );
}
