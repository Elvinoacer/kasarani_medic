import Image from "next/image";
import { Icon } from "@/components/Icon";
import { SERVICES } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="relative bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pine-600">
            Five units · one building
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-pine-950 sm:text-5xl">
            Everything a family needs,
            <br className="hidden sm:block" /> without crossing town
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">
            As a KMPDC-licensed Level 2 clinic we provide exactly what primary care
            should — outpatient consultations, diagnostics, maternal care, minor
            surgery and a dispensing pharmacy.
          </p>
        </div>

        {/* Service cards — editorial alternating layout */}
        <div className="mt-14 flex flex-col gap-14 sm:mt-20 sm:gap-20">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              className="reveal group grid items-center gap-7 lg:grid-cols-12 lg:gap-10"
              style={{ ["--reveal-delay" as string]: `${(i % 2) * 80}ms` }}
            >
              {/* Image */}
              <div
                className={`relative lg:col-span-5 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
                  <Image
                    src={s.image}
                    alt={s.name}
                    width={864}
                    height={648}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-950/55 via-transparent to-transparent" />
                  {/* Hours chip */}
                  <div className="glass absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-[0.78rem] font-semibold text-cream-50">
                    <Icon name="clock" className="h-4 w-4 text-sun-300" />
                    {s.hours}
                  </div>
                </div>
                {/* Floating index */}
                <span
                  className="pointer-events-none absolute -top-5 font-display text-7xl font-semibold text-pine-100 [data-flip]:-right-3"
                  aria-hidden="true"
                  style={i % 2 === 1 ? { right: "-0.75rem" } : { left: "-0.75rem" }}
                >
                  0{i + 1}
                </span>
              </div>

              {/* Copy */}
              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-pine-100 px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-pine-700">
                    {s.sw}
                  </span>
                  {!s.bookable && (
                    <span className="rounded-full bg-sun-100 px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-sun-700">
                      Walk-in · no booking
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-pine-950 sm:text-[2rem]">
                  {s.name}
                </h3>
                <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-ink-500">
                  {s.summary}
                </p>

                <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-[0.88rem] text-ink-700">
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-pine-500/12 text-pine-600">
                        <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>

                {s.prep && (
                  <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-cream-100 p-4 text-[0.83rem] leading-relaxed text-ink-700">
                    <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-sun-600" />
                    <span>
                      <strong className="font-semibold text-pine-900">Before you come: </strong>
                      {s.prep}
                    </span>
                  </p>
                )}

                {s.bookable && (
                  <a
                    href={`/#book?service=${s.id}`}
                    className="group/btn mt-6 inline-flex items-center gap-2 rounded-2xl border-2 border-pine-700 px-5 py-3 text-sm font-bold text-pine-700 transition-all hover:bg-pine-700 hover:text-cream-50"
                  >
                    Book {s.name.split(" (")[0].toLowerCase()}
                    <Icon
                      name="arrow-right"
                      className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                    />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
