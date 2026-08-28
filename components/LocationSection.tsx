import Image from "next/image";
import { Icon } from "@/components/Icon";
import { CLINIC, HOURS } from "@/lib/data";

export function LocationSection() {
  return (
    <section id="visit" className="relative bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: address + transit + hours */}
          <div className="reveal lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-pine-600">
              Finding us is easy
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-pine-950 sm:text-5xl">
              Past Queen Land Towers,
              <br />
              off Mwiki–Kasarani Road
            </h2>

            <div className="mt-8 overflow-hidden rounded-[2rem] shadow-lift">
              <div className="relative">
                <Image
                  src="/images/location.png"
                  alt="Street view of the clinic along Mwiki–Kasarani road"
                  width={1344}
                  height={768}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[21/9] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-950/70 via-transparent to-transparent" />
                <div className="glass absolute bottom-4 left-4 flex items-center gap-2.5 rounded-full px-4 py-2.5">
                  <Icon name="map-pin" className="h-4 w-4 text-sun-300" />
                  <span className="text-sm font-bold text-cream-50">
                    Plus Code <span className="font-mono">{CLINIC.plusCode}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Transit steps */}
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-start gap-4 rounded-3xl bg-white p-5 shadow-lift">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pine-100 text-pine-700">
                  <Icon name="bus" className="h-5.5 w-5.5" />
                </span>
                <div>
                  <p className="font-bold text-pine-950">By matatu from the CBD</p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-500">
                    Board route <strong className="text-pine-700">17B</strong> or{" "}
                    <strong className="text-pine-700">17A</strong> along the
                    Kasarani–Mwiki arterial road. Alight at the{" "}
                    <strong>Queen Land Towers stage</strong> — a 50-metre walk down the
                    access street and you&apos;re at our door.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl bg-white p-5 shadow-lift">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pine-100 text-pine-700">
                  <Icon name="accessible" className="h-5.5 w-5.5" />
                </span>
                <div>
                  <p className="font-bold text-pine-950">Step-free &amp; stretcher-ready</p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-500">
                    Single-level ground-floor entry with a wheelchair ramp, plus a
                    dedicated drop-off bay where ambulances and boda bodas unload
                    directly at the triage doors.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={CLINIC.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-pine-700 px-6 py-4 text-sm font-bold text-cream-50 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-pine-600"
              >
                <Icon name="navigation" className="h-4.5 w-4.5" />
                Open GPS directions
              </a>
              <a
                href={CLINIC.phoneHref}
                className="flex items-center justify-center gap-2.5 rounded-2xl border-2 border-pine-200 bg-white px-6 py-4 text-sm font-bold text-pine-700 transition-colors hover:bg-pine-50"
              >
                <Icon name="phone" className="h-4.5 w-4.5" />
                Call for directions
              </a>
            </div>
          </div>

          {/* Right: map + hours table */}
          <div className="reveal lg:col-span-6" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <iframe
                title="Map — Hospital Kasarani Medical Clinic, Plus Code QW9C+XJ3"
                src={CLINIC.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full border-0 sm:h-[340px]"
                allowFullScreen
              />
            </div>

            <div className="mt-6 overflow-hidden rounded-[2rem] bg-pine-950 shadow-lift">
              <div className="flex items-center justify-between px-6 py-5 sm:px-7">
                <h3 className="font-display text-xl font-semibold text-cream-50">
                  Opening hours
                </h3>
                <span className="flex items-center gap-2 rounded-full bg-pine-400/15 px-3.5 py-1.5 text-xs font-bold text-pine-200">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  Closed Sundays
                </span>
              </div>
              <ul className="divide-y divide-white/8 border-t border-white/10">
                {HOURS.map((h) => (
                  <li key={h.days} className="flex items-start justify-between gap-4 px-6 py-4 sm:px-7">
                    <div>
                      <p className="text-[0.9rem] font-bold text-cream-50">{h.days}</p>
                      {h.note && (
                        <p className="mt-0.5 text-[0.75rem] text-cream-100/55">{h.note}</p>
                      )}
                    </div>
                    <p className="text-right text-[0.8rem] font-semibold leading-snug text-sun-300">
                      {h.hours}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
