"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/" as const, label: t("home") },
    { href: "/services" as const, label: t("services") },
    { href: "/industries" as const, label: t("industries") },
    { href: "/a-propos" as const, label: t("about") },
    { href: "/blog" as const, label: t("blog") },
    { href: "/etudes-de-cas" as const, label: t("cases") },
    { href: "/carrieres" as const, label: t("careers") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-200",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[var(--shadow-e1)] border-b border-[var(--color-border)]"
            : "bg-white/90 backdrop-blur-sm"
        )}
      >
        <div className="container-page">
          <nav className="flex items-center h-16 gap-4" aria-label="Navigation principale">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mr-4 shrink-0">
              <div className="w-8 h-8 bg-[var(--color-marine-800)] rounded-[var(--radius-sm)] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <span className="font-semibold text-[var(--color-encre)] text-sm leading-tight">
                Corpshore<br />
                <span className="text-[var(--color-marine-800)] font-bold">France</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-0.5 flex-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-colors",
                      pathname === href
                        ? "text-[var(--color-marine-800)] bg-[var(--color-marine-50)]"
                        : "text-[var(--color-granit)] hover:text-[var(--color-encre)] hover:bg-[var(--color-calcaire)]"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2 ml-auto">
              <LocaleSwitcher />
              <Link href="/contact" className={buttonVariants({ variant: "primary", size: "sm" })}>
                {t("quote")}
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden ml-auto p-2 text-[var(--color-granit)] hover:text-[var(--color-encre)]"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-30 bg-white flex flex-col pt-16 lg:hidden">
          <div className="container-page py-6 flex flex-col gap-1 flex-1 overflow-y-auto">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-3 px-4 text-base font-medium rounded-[var(--radius)] text-[var(--color-encre)] hover:bg-[var(--color-calcaire)] border-b border-[var(--color-border)]"
              >
                {label}
              </Link>
            ))}
            <div className="pt-6 flex flex-col gap-3">
              <LocaleSwitcher className="w-full justify-center" />
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
              >
                {t("quote")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
