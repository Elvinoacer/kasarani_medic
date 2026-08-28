import { Icon, LogoMark } from "@/components/Icon";
import { CLINIC, HOURS, NAV_LINKS, SERVICES } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-pine-950 pb-28 pt-16 text-cream-100/70 md:pb-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" />
              <div>
                <p className="font-display text-lg font-semibold text-cream-50">
                  Kasarani Medical Clinic
                </p>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-pine-400">
                  Hospital · Level 2 · KMPDC Licensed
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[0.85rem] leading-relaxed">
              Community-owned healthcare for the Kasarani–Mwiki corridor. Transparent
              fees, licensed practitioners, and care that speaks your language.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["KMPDC Level 2", "ODPC Registered", "SHA Accredited", "DPA 2019"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[0.68rem] font-bold tracking-wide text-cream-100/80"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-sun-300">
                Explore
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-[0.85rem]">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition-colors hover:text-cream-50">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/#book" className="font-semibold text-sun-300 hover:text-sun-200">
                    Book a visit
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-sun-300">
                Services
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-[0.85rem]">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <a href={`/#services`} className="transition-colors hover:text-cream-50">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-sun-300">
                Hours
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5 text-[0.78rem]">
                {HOURS.map((h) => (
                  <li key={h.days}>
                    <span className="block font-semibold text-cream-100/85">{h.days}</span>
                    <span className="text-cream-100/55">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-sun-300">
              First contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3.5 text-[0.85rem]">
              <li>
                <a href={CLINIC.phoneHref} className="flex items-start gap-2.5 hover:text-cream-50">
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-pine-400" />
                  {CLINIC.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CLINIC.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-cream-50"
                >
                  <Icon name="whatsapp" className="mt-0.5 h-4 w-4 shrink-0 text-pine-400" />
                  WhatsApp the front desk
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-pine-400" />
                <span>
                  {CLINIC.address},<br />
                  {CLINIC.city}
                  <br />
                  <span className="font-mono text-xs text-pine-300">
                    Plus Code {CLINIC.plusCode}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="bus" className="mt-0.5 h-4 w-4 shrink-0 text-pine-400" />
                Matatu 17B / 17A · Queen Land Towers stage
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[0.75rem] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-cream-100/50">
            <Icon name="shield" className="h-3.5 w-3.5 text-pine-400" />
            Patient data protected under the Data Protection Act, 2019.
          </p>
        </div>
      </div>
    </footer>
  );
}
