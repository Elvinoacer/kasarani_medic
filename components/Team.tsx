import Image from "next/image";
import { Icon } from "@/components/Icon";

const ROLES = [
  {
    title: "Attending Medical Practitioners",
    body: "KMPDC-licensed doctors lead every consultation, with active annual practice licenses verified at credentialing and kept on file at reception.",
    icon: "stethoscope" as const,
  },
  {
    title: "Surgical & Emergency Skills",
    body: "Clinicians hold specialized training certificates in outpatient minor surgery and emergency primary care — the two skills this community calls on most.",
    icon: "shield" as const,
  },
  {
    title: "Care in Your Language",
    body: "Our team is evaluated for fluency in English, Kiswahili and regional languages including Kikuyu — so your history, diagnosis and consent are never lost in translation.",
    icon: "user" as const,
  },
];

export function Team() {
  return (
    <section id="team" className="relative bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image side */}
          <div className="reveal relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-deep">
              <Image
                src="/images/team.png"
                alt="The Kasarani Medical Clinic care team"
                width={1344}
                height={768}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[7/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/45 via-transparent to-transparent" />
            </div>

            {/* Floating quote card */}
            <figure className="glass-light absolute -bottom-6 left-4 right-4 rounded-3xl p-5 sm:left-8 sm:right-auto sm:max-w-sm sm:p-6">
              <blockquote className="font-display text-[1.02rem] italic leading-relaxed text-pine-950">
                “We demystify the diagnosis. You leave knowing what you have, why it
                happened, and exactly what to do next.”
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pine-600">
                <Icon name="pulse" className="h-4 w-4 text-ember-500" />
                Our care philosophy
              </figcaption>
            </figure>
          </div>

          {/* Copy side */}
          <div className="reveal lg:col-span-6 lg:pl-4" style={{ ["--reveal-delay" as string]: "120ms" }}>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-pine-600">
              The people behind the care
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-pine-950 sm:text-5xl">
              Clinically rigorous. Genuinely human.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-500">
              Healthcare in Kasarani runs on trust. Our clinicians practice
              community-embedded medicine — transparent about costs, unhurried in
              consultation, and committed to explaining every option without jargon,
              because dignity is part of the treatment.
            </p>

            <div className="mt-9 flex flex-col gap-6">
              {ROLES.map((r) => (
                <div key={r.title} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pine-700 text-cream-50 shadow-lift">
                    <Icon name={r.icon} className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-pine-950">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-500">
                      {r.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
