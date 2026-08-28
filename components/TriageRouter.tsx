"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { CLINIC, TRIAGE } from "@/lib/data";

/* ---------- Emergency override overlay ---------- */

function EmergencyOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label="Emergency — call now"
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
    >
      <div className="absolute inset-0 bg-ember-800/45 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-deep">
        <div className="relative bg-gradient-to-br from-ember-600 to-ember-800 px-6 pb-16 pt-7 text-center sm:px-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
            <Icon name="alert" className="h-7 w-7" />
          </span>
          <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
            Stop — this looks like an emergency
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ember-100">
            Online booking is not safe for your situation. Please call the triage desk
            now, or come straight in — no forms, no queue.
          </p>
        </div>

        <div className="-mt-10 flex flex-col gap-3 px-5 pb-6 sm:px-8">
          <a
            href={CLINIC.phoneHref}
            className="pulse-ring flex items-center justify-center gap-3 rounded-2xl bg-ember-500 px-6 py-5 text-lg font-extrabold text-white shadow-deep ring-4 ring-white/70 transition-transform hover:-translate-y-0.5"
          >
            <Icon name="phone" className="h-6 w-6" />
            Call {CLINIC.phoneDisplay}
          </a>
          <a
            href={CLINIC.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-2xl bg-pine-700 px-6 py-4 text-base font-bold text-cream-50 transition-colors hover:bg-pine-600"
          >
            <Icon name="navigation" className="h-5 w-5" />
            GPS directions · {CLINIC.plusCode}
          </a>
          <p className="pt-1 text-center text-xs leading-relaxed text-ink-500">
            Ground-floor triage doors with ramp access &amp; dedicated drop-off bay ·
            Past Queen Land Towers, off Mwiki–Kasarani Road
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Urgent walk-in panel ---------- */

function UrgentPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="reveal is-visible mt-6 rounded-3xl border border-sun-200 bg-sun-50 p-5 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sun-400/25 text-sun-700">
          <Icon name="alert" className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <h4 className="font-display text-lg font-semibold text-pine-950">
            Come in now — you don&apos;t need an appointment
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-ink-700">
            Mention your symptom at the reception window and our team will notify the
            nursing desk right away. Target: first clinical evaluation within{" "}
            <strong>15 minutes</strong> of arrival.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <a
            href={CLINIC.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-pine-700 px-5 py-3 text-sm font-bold text-cream-50 transition-colors hover:bg-pine-600"
          >
            <Icon name="navigation" className="h-4 w-4" />
            Directions
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2 text-xs font-semibold text-ink-500 underline-offset-2 hover:underline"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main section ---------- */

const ACCENTS = {
  red: {
    chip: "bg-ember-100 text-ember-700 hover:bg-ember-500 hover:text-white",
    bar: "bg-ember-500",
    badge: "bg-ember-500/15 text-ember-300",
    cardCta: "bg-ember-500 text-white hover:bg-ember-400",
  },
  yellow: {
    chip: "bg-sun-100 text-sun-700 hover:bg-sun-400 hover:text-pine-950",
    bar: "bg-sun-400",
    badge: "bg-sun-400/15 text-sun-300",
    cardCta: "bg-sun-400 text-pine-950 hover:bg-sun-300",
  },
  green: {
    chip: "bg-pine-100 text-pine-700 hover:bg-pine-500 hover:text-white",
    bar: "bg-pine-500",
    badge: "bg-pine-400/15 text-pine-300",
    cardCta: "bg-pine-500 text-white hover:bg-pine-400",
  },
} as const;

export function TriageRouter() {
  const [emergency, setEmergency] = useState(false);
  const [urgent, setUrgent] = useState(false);

  const handle = (id: "red" | "yellow" | "green") => {
    if (id === "red") setEmergency(true);
    else if (id === "yellow") {
      setUrgent(true);
      document.getElementById("triage")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="triage" className="relative overflow-hidden bg-pine-950 py-20 sm:py-28">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div
        className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-pine-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-ember-700/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sun-300">
            Start here
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-cream-50 sm:text-5xl">
            How urgent is it today?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream-100/75 sm:text-lg">
            Be honest with the checklist — it routes you the same way our triage desk
            does. Emergencies get a phone line, not a form.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {TRIAGE.map((t) => {
            const a = ACCENTS[t.id];
            return (
              <article
                key={t.id}
                className="glass group relative flex flex-col overflow-hidden rounded-[1.75rem] p-6 transition-transform duration-500 hover:-translate-y-1.5 sm:p-7"
              >
                <span className={`absolute inset-x-0 top-0 h-1.5 ${a.bar}`} />
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${a.badge}`}
                  >
                    <Icon
                      name={t.id === "red" ? "alert" : t.id === "yellow" ? "clock" : "calendar"}
                      className="h-3.5 w-3.5"
                    />
                    {t.sw}
                  </span>
                  <span className="font-display text-4xl font-semibold text-white/15">
                    {t.id === "red" ? "I" : t.id === "yellow" ? "II" : "III"}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-cream-50 sm:text-2xl">
                  {t.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-cream-100/80">{t.headline}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {t.symptoms.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handle(t.id)}
                      className={`rounded-full px-3.5 py-2 text-left text-[0.8rem] font-semibold transition-all ${a.chip}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <p className="mt-5 flex-1 text-[0.83rem] leading-relaxed text-cream-100/60">
                  {t.action}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-wider text-cream-100/50">
                    {t.sla}
                  </span>
                  <button
                    type="button"
                    onClick={() => handle(t.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${a.cardCta}`}
                  >
                    {t.id === "red" ? "Call now" : t.id === "yellow" ? "Walk in" : "Book"}
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {urgent && <UrgentPanel onClose={() => setUrgent(false)} />}
      </div>

      {emergency && <EmergencyOverlay onClose={() => setEmergency(false)} />}
    </section>
  );
}
