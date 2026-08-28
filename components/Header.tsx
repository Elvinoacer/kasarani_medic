"use client";

import { useEffect, useState } from "react";
import { Icon, LogoMark } from "@/components/Icon";
import { CLINIC, NAV_LINKS } from "@/lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:left-4 focus:top-4 focus:rounded-lg focus:bg-pine-800 focus:px-4 focus:py-2 focus:text-cream-50"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-header py-2" : "bg-transparent py-3.5"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <a href="/#top" className="group flex items-center gap-2.5" aria-label="Home">
            <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:rotate-6" />
            <span className="leading-none">
              <span
                className={`block font-display text-[1.05rem] font-semibold tracking-tight transition-colors sm:text-lg ${
                  scrolled ? "text-pine-950" : "text-cream-50"
                }`}
              >
                Kasarani Medical
              </span>
              <span
                className={`mt-0.5 block text-[0.6rem] font-semibold uppercase tracking-[0.22em] transition-colors ${
                  scrolled ? "text-pine-600" : "text-pine-200"
                }`}
              >
                Clinic · Level 2 · KMPDC
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-[0.83rem] font-medium transition-colors ${
                  scrolled
                    ? "text-ink-700 hover:bg-pine-100 hover:text-pine-800"
                    : "text-cream-100/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={CLINIC.phoneHref}
              className={`hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors md:flex ${
                scrolled
                  ? "text-pine-800 hover:bg-pine-100"
                  : "text-cream-50 hover:bg-white/10"
              }`}
            >
              <Icon name="phone" className="h-4 w-4" />
              {CLINIC.phoneDisplay}
            </a>
            <a
              href="/#book"
              className="hidden items-center gap-2 rounded-full bg-sun-400 px-5 py-2.5 text-sm font-bold text-pine-950 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-sun-300 sm:flex"
            >
              <Icon name="calendar" className="h-4 w-4" />
              Book a visit
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors lg:hidden ${
                scrolled
                  ? "bg-pine-100 text-pine-800"
                  : "bg-white/10 text-cream-50 backdrop-blur"
              }`}
            >
              <Icon name="menu" className="h-5.5 w-5.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-pine-950/60 backdrop-blur-sm transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col glass rounded-l-3xl p-6 transition-transform duration-500 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "color-mix(in oklab, #0D3A32 88%, transparent)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-lg font-semibold text-cream-50">
                Kasarani Medical
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cream-50"
            >
              <Icon name="x" className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[1.02rem] font-medium text-cream-100 transition-colors hover:bg-white/10"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {l.label}
                <Icon name="chevron-right" className="h-4 w-4 text-pine-300" />
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <a
              href="/#book"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-sun-400 px-5 py-4 text-base font-bold text-pine-950"
            >
              <Icon name="calendar" className="h-5 w-5" />
              Book a visit
            </a>
            <a
              href={CLINIC.phoneHref}
              className="flex items-center justify-center gap-2 rounded-2xl bg-ember-500 px-5 py-4 text-base font-bold text-white"
            >
              <Icon name="phone" className="h-5 w-5" />
              Emergency · {CLINIC.phoneDisplay}
            </a>
            <p className="pt-2 text-center text-xs text-pine-200">
              {CLINIC.address}, {CLINIC.city}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
