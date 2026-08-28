import Image from "next/image";
import { Icon } from "@/components/Icon";
import { CLINIC, VERNACULAR } from "@/lib/data";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-pine-950">
      {/* Background imagery */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Nurse welcoming a mother and child at the Kasarani Medical Clinic reception"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
        {/* Legibility gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-pine-950/92 via-pine-950/55 to-pine-950/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-transparent to-pine-950/40" />
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-44 pt-32 sm:px-6 sm:pb-48 lg:px-8 lg:pb-40">
        <div className="max-w-2xl">
          {/* Trust chip */}
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine-300 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pine-300" />
            </span>
            KMPDC Licensed · {CLINIC.level}
          </div>

          <h1 className="mt-6 font-display text-[2.65rem] font-semibold leading-[1.04] tracking-tight text-cream-50 sm:text-6xl lg:text-[4.35rem]">
            Good healthcare,
            <br />
            <span className="text-sun-300">close to home.</span>
          </h1>

          <p className="mt-4 font-display text-lg italic text-pine-200 sm:text-xl">
            {CLINIC.taglineSw} — Karibu Kasarani Medical Clinic.
          </p>

          <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-cream-100/85">
            The community clinic for Kasarani and Mwiki — consultations, lab tests,
            maternal &amp; child health, minor surgery and pharmacy under one roof.
            Speak with doctors who explain everything in plain English{" "}
            <span className="italic">au Kiswahili</span>.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="/#book"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-sun-400 px-7 py-4 text-base font-bold text-pine-950 shadow-deep transition-all hover:-translate-y-0.5 hover:bg-sun-300"
            >
              <Icon name="calendar" className="h-5 w-5" />
              Book a visit
              <Icon
                name="arrow-right"
                className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={CLINIC.phoneHref}
              className="pulse-ring inline-flex items-center justify-center gap-2.5 rounded-2xl bg-ember-500 px-7 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-ember-400"
            >
              <Icon name="phone" className="h-5 w-5" />
              Emergency · Tap to call
            </a>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-cream-100/70">
            <Icon name="info" className="h-4 w-4 shrink-0" />
            Emergencies skip every queue — this line reaches our triage desk directly.
          </p>
        </div>
      </div>

      {/* Floating glass fact cards — desktop */}
      <div className="absolute right-8 top-[24%] z-10 hidden w-64 flex-col gap-3 lg:flex">
        <div className="glass drift rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pine-400/25 text-pine-200">
              <Icon name="clock" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-pine-300">
                Open today
              </p>
              <p className="text-sm font-semibold text-cream-50">8:00 AM – 8:00 PM</p>
            </div>
          </div>
        </div>
        <div className="glass drift-late rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sun-400/25 text-sun-300">
              <Icon name="map-pin" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-sun-300">
                Landmark
              </p>
              <p className="text-sm font-semibold text-cream-50">
                Past Queen Land Towers · {CLINIC.plusCode}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom info strip */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-pine-950/55 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            {
              icon: "stethoscope" as const,
              label: "5 clinical units",
              sub: "OPD · Lab · MCH · Surgery · Pharmacy",
            },
            {
              icon: "shield" as const,
              label: "SHA accredited",
              sub: "KES 900 capitation per visit",
            },
            {
              icon: "accessible" as const,
              label: "Step-free access",
              sub: "Ramp entry & drop-off bay",
            },
            {
              icon: "bus" as const,
              label: "Matatu 17B / 17A",
              sub: "Queen Land Towers stage",
            },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3 px-3 py-4 sm:px-5 sm:first:pl-0">
              <Icon name={f.icon} className="h-5 w-5 shrink-0 text-sun-300" />
              <div className="min-w-0">
                <p className="truncate text-[0.8rem] font-bold text-cream-50">{f.label}</p>
                <p className="truncate text-[0.7rem] text-cream-100/60">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Whisper-quiet marquee of the phrases our community actually searches */
export function VernacularStrip() {
  const items = [...VERNACULAR, ...VERNACULAR];
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-pine-100 bg-cream-100/70 py-3.5"
    >
      <div className="marquee-track flex w-max items-center gap-8 pr-8">
        {items.map((v, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-sm italic text-pine-700">“{v}”</span>
            <span className="h-1 w-1 rounded-full bg-sun-400" />
          </span>
        ))}
      </div>
    </div>
  );
}
