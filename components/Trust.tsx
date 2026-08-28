import { Icon, type IconName } from "@/components/Icon";
import { TRUST } from "@/lib/data";

export function Trust() {
  return (
    <section id="trust" className="relative overflow-hidden bg-pine-950 py-20 sm:py-28">
      <div className="absolute inset-0 dot-grid opacity-25" aria-hidden="true" />
      <div
        className="absolute right-0 top-0 h-72 w-72 rounded-full bg-pine-600/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-sun-300">
            Regulated. Audited. Accountable.
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-cream-50 sm:text-5xl">
            Trust you can verify
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream-100/75 sm:text-lg">
            We hold ourselves to Kenya&apos;s strictest clinical and data-protection
            standards — not because we have to, but because community healthcare runs
            on trust.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <article
              key={t.title}
              className="glass reveal flex flex-col rounded-[1.6rem] p-6 transition-transform duration-500 hover:-translate-y-1.5"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun-400/20 text-sun-300">
                <Icon name={t.icon as IconName} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-cream-50">
                {t.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[0.85rem] leading-relaxed text-cream-100/70">
                {t.body}
              </p>
            </article>
          ))}
        </div>

        {/* Safeguards strip */}
        <div className="reveal mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <h3 className="text-center font-display text-lg font-semibold text-cream-50">
            How your medical data is protected · Data Protection Act 2019
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                k: "Role-based access",
                v: "Reception sees only demographics; clinical notes stay with your care team.",
              },
              {
                k: "Encryption everywhere",
                v: "AES-256 at rest, TLS 1.3 in transit — hospital-grade standards.",
              },
              {
                k: "Explicit consent",
                v: "Nothing is shared — SHA, referrals — without your signed consent.",
              },
              {
                k: "72-hour breach rule",
                v: "Any incident is reported to the ODPC within 72 hours, by law.",
              },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-white/[0.04] p-4">
                <p className="flex items-center gap-2 text-[0.82rem] font-bold text-sun-300">
                  <Icon name="lock" className="h-4 w-4 shrink-0" />
                  {s.k}
                </p>
                <p className="mt-1.5 text-[0.78rem] leading-relaxed text-cream-100/60">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
