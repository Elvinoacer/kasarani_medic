"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { FAQS } from "@/lib/data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pine-600">
            Asked at our front desk, daily
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-pine-950 sm:text-5xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-3.5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`reveal overflow-hidden rounded-[1.4rem] border-2 transition-colors duration-300 ${
                  isOpen
                    ? "border-pine-200 bg-white shadow-lift"
                    : "border-cream-200 bg-white/60 hover:border-pine-100"
                }`}
                style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left sm:px-6"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-[1.05rem] font-semibold text-pine-950">
                      {f.q}
                    </span>
                    <span className="mt-0.5 block text-xs italic text-pine-600">{f.qSw}</span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      isOpen
                        ? "bg-pine-700 text-cream-50"
                        : "bg-cream-100 text-pine-700"
                    }`}
                  >
                    <Icon
                      name="chevron-down"
                      className={`h-4.5 w-4.5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </span>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  className="acc-panel"
                  data-open={isOpen}
                >
                  <div>
                    <p className="px-5 pb-5 text-[0.9rem] leading-relaxed text-ink-700 sm:px-6">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
