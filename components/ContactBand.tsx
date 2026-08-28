import { Icon } from "@/components/Icon";
import { CLINIC } from "@/lib/data";

/** First-contact band — every channel, one tap away */
export function ContactBand() {
  return (
    <section id="contact" className="relative overflow-hidden bg-pine-800 py-20 sm:py-24">
      <div
        className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-pine-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-sun-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="reveal font-display text-3xl font-semibold leading-tight text-cream-50 sm:text-5xl">
          The first hello matters most.
        </h2>
        <p className="reveal mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream-100/80 sm:text-lg">
          However you reach us — a call, a message, or a walk past Queen Land Towers —
          a real person answers, in the language you&apos;re most comfortable with.
        </p>

        <div className="reveal mt-10 grid gap-4 sm:grid-cols-3">
          <a
            href={CLINIC.phoneHref}
            className="group flex flex-col items-center gap-3 rounded-[1.75rem] bg-white/[0.06] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-ember-500 p-3.5 text-white shadow-lift transition-transform group-hover:scale-110">
              <Icon name="phone" className="h-6 w-6" />
            </span>
            <span className="text-sm font-bold text-cream-50">Call the desk</span>
            <span className="text-sm font-semibold text-sun-300">{CLINIC.phoneDisplay}</span>
          </a>

          <a
            href={CLINIC.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-[1.75rem] bg-white/[0.06] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#25D366] p-3.5 text-white shadow-lift transition-transform group-hover:scale-110">
              <Icon name="whatsapp" className="h-6 w-6" />
            </span>
            <span className="text-sm font-bold text-cream-50">WhatsApp us</span>
            <span className="text-sm font-semibold text-pine-200">Replies within hours</span>
          </a>

          <a
            href="/#book"
            className="group flex flex-col items-center gap-3 rounded-[1.75rem] bg-white/[0.06] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-sun-400 p-3.5 text-pine-950 shadow-lift transition-transform group-hover:scale-110">
              <Icon name="calendar" className="h-6 w-6" />
            </span>
            <span className="text-sm font-bold text-cream-50">Book online</span>
            <span className="text-sm font-semibold text-pine-200">60 seconds, no queue</span>
          </a>
        </div>

        <p className="reveal mt-8 text-sm text-cream-100/60">
          {CLINIC.address} · {CLINIC.city} · Plus Code{" "}
          <span className="font-mono text-sun-300">{CLINIC.plusCode}</span>
        </p>
      </div>
    </section>
  );
}
