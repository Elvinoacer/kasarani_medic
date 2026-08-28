"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { PREP } from "@/lib/data";

export function VisitPrep() {
  const [open, setOpen] = useState<string | null>(PREP[0].id);

  return (
    <section id="prep" className="relative overflow-hidden bg-pine-900 py-20 sm:py-28">
      <div className="absolute inset-0 dot-grid opacity-25" aria-hidden="true" />
      <div
        className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-pine-500/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Sticky intro */}
        <div className="reveal lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-sun-300">
              Before you travel
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-cream-50 sm:text-4xl">
              Come prepared, leave faster
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream-100/75">
              A few small preparations make your visit dramatically smoother — better
              diagnostic accuracy, faster registration and zero wasted trips. Tap each
              department for its checklist.
            </p>

            <div className="glass mt-8 flex items-start gap-4 rounded-3xl p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sun-400/20 text-sun-300">
                <Icon name="star" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-cream-50">The golden rule</p>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-cream-100/70">
                  Always carry your <strong>ID</strong>, your <strong>SHA details</strong>{" "}
                  and any <strong>medical cards or booklets</strong> you already have.
                  That trio solves 90% of front-desk delays.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-4">
            {PREP.map((p, i) => {
              const isOpen = open === p.id;
              return (
                <div
                  key={p.id}
                  className={`reveal overflow-hidden rounded-[1.6rem] border transition-colors duration-300 ${
                    isOpen
                      ? "border-pine-400/40 bg-white/[0.07]"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : p.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold transition-colors ${
                          isOpen
                            ? "bg-sun-400 text-pine-950"
                            : "bg-white/10 text-cream-100"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="font-display text-lg font-semibold text-cream-50 sm:text-xl">
                        {p.dept}
                      </span>
                    </span>
                    <Icon
                      name="chevron-down"
                      className={`h-5 w-5 shrink-0 text-pine-200 transition-transform duration-500 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div className="acc-panel" data-open={isOpen}>
                    <div>
                      <div className="px-6 pb-6 pl-20">
                        <ul className="flex flex-col gap-3">
                          {p.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-[0.92rem] text-cream-100/85"
                            >
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine-400/25 text-pine-200">
                                <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 border-l-2 border-sun-400/60 pl-4 text-[0.83rem] italic leading-relaxed text-cream-100/60">
                          Why: {p.why}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
