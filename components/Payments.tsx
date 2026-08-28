import { Icon, type IconName } from "@/components/Icon";
import { PAYMENTS } from "@/lib/data";

export function Payments() {
  return (
    <section id="payments" className="relative bg-cream-100/60 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-pine-600">
            No surprises at the counter
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-pine-950 sm:text-5xl">
            Pay the way that suits you
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">
            SHA capitation, M-Pesa or cash — every price is displayed openly at
            reception, and every payment gets a receipt. That&apos;s our promise on fee
            transparency.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PAYMENTS.map((p, i) => (
            <article
              key={p.id}
              className="reveal group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white p-7 shadow-lift transition-all duration-500 hover:-translate-y-1.5 hover:shadow-deep"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pine-50 transition-transform duration-700 group-hover:scale-[1.8]"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pine-700 text-cream-50">
                    <Icon name={p.icon as IconName} className="h-5.5 w-5.5" />
                  </span>
                  <span className="rounded-full bg-sun-100 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-sun-700">
                    {p.badge}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-pine-950">
                  {p.name}
                </h3>
                <p className="text-xs font-semibold italic text-pine-600">{p.sw}</p>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-500">
                  {p.detail}
                </p>

                <ul className="mt-5 flex flex-col gap-2.5 border-t border-cream-200 pt-5">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2.5 text-[0.84rem] font-medium text-ink-700"
                    >
                      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-pine-500/12 text-pine-600">
                        <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="reveal mt-8 text-center text-[0.8rem] text-ink-500">
          Elective procedures such as circumcision (kutahiri) and non-formulary items
          fall outside the SHA package and are quoted transparently before treatment.
        </p>
      </div>
    </section>
  );
}
