import { Header } from "@/components/Header";
import { Hero, VernacularStrip } from "@/components/Hero";
import { TriageRouter } from "@/components/TriageRouter";
import { Services } from "@/components/Services";
import { BookingWizard } from "@/components/BookingWizard";
import { VisitPrep } from "@/components/VisitPrep";
import { Team } from "@/components/Team";
import { Payments } from "@/components/Payments";
import { LocationSection } from "@/components/LocationSection";
import { Trust } from "@/components/Trust";
import { Faq } from "@/components/Faq";
import { ContactBand } from "@/components/ContactBand";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { PageReveal } from "@/components/PageReveal";
import { Icon } from "@/components/Icon";

export default function Home() {
  return (
    <PageReveal>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <VernacularStrip />
        <TriageRouter />
        <Services />

        {/* ---------- Booking ---------- */}
        <section
          id="book"
          className="relative overflow-hidden bg-gradient-to-b from-cream-100/80 via-cream-50 to-cream-50 py-20 sm:py-28"
        >
          <div
            className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-pine-100/70 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-sun-100 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="reveal mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-pine-600">
                Skip the queue
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-pine-950 sm:text-5xl">
                Book your visit in about a minute
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">
                Register from home — the front desk will have your details ready when
                you walk in. Emergencies, as always,{" "}
                <a href="/#triage" className="font-bold text-ember-600 underline-offset-2 hover:underline">
                  skip this form entirely
                </a>
                .
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.78rem] font-semibold text-ink-500">
                <span className="flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-pine-600" strokeWidth={2.6} />
                  No payment needed to book
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-pine-600" strokeWidth={2.6} />
                  Free changes by phone
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="lock" className="h-3.5 w-3.5 text-pine-600" />
                  DPA 2019 protected
                </span>
              </div>
            </div>

            <div className="reveal mt-12">
              <BookingWizard />
            </div>
          </div>
        </section>

        <VisitPrep />
        <Team />
        <Payments />
        <LocationSection />
        <Trust />
        <Faq />
        <ContactBand />
      </main>
      <Footer />
      <StickyMobileBar />
    </PageReveal>
  );
}
