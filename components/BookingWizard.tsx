"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon, LogoMark } from "@/components/Icon";
import { BOOKABLE_SERVICES, CLINIC, serviceSlots } from "@/lib/data";

/* ---------------- helpers ---------------- */

const RED_FLAGS = [
  "Difficulty breathing",
  "Severe chest pain",
  "Heavy active bleeding",
  "Unconsciousness / confusion",
  "Child convulsions / fits",
];

const URGENT_FLAGS = [
  "High fever (over 38.5°C)",
  "Severe abdominal pain",
  "Persistent vomiting / dehydration",
  "Open cut needing stitches",
];

const RESIDENCES = ["Kasarani", "Mwiki", "Clay City", "Zimmerman", "Korogocho", "Other"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function prettyDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${DAYS[new Date(y, m - 1, d).getDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

const KENYA_PHONE = /^(?:\+?254|0)?[17]\d{8}$/;
const digits = (s: string) => s.replace(/[\s-]/g, "");

const STEPS = ["Service", "Date & time", "Your details", "Confirm"] as const;

type Form = {
  service: string;
  urgency: string[];
  date: string;
  time: string;
  fullName: string;
  gender: string;
  dob: string;
  idType: string;
  idNumber: string;
  phone: string;
  residence: string;
  kinName: string;
  kinPhone: string;
  payment: string;
  shaNumber: string;
  notes: string;
  consent: boolean;
};

const INITIAL: Form = {
  service: "",
  urgency: [],
  date: "",
  time: "",
  fullName: "",
  gender: "",
  dob: "",
  idType: "National ID",
  idNumber: "",
  phone: "",
  residence: "",
  kinName: "",
  kinPhone: "",
  payment: "sha",
  shaNumber: "",
  notes: "",
  consent: false,
};

/* ================= component ================= */

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(INITIAL);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [emergency, setEmergency] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  // Preselect service from ?service= query
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("service");
    if (q && BOOKABLE_SERVICES.some((s) => s.id === q)) {
      setForm((f) => ({ ...f, service: q }));
    }
  }, []);

  // Emergency flag override
  useEffect(() => {
    if (form.urgency.some((u) => RED_FLAGS.includes(u))) setEmergency(true);
  }, [form.urgency]);

  /* ---------- date & slots ---------- */
  const dates = useMemo(() => {
    const out: Date[] = [];
    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      out.push(d);
    }
    return out;
  }, []);

  const slots = useMemo(() => {
    if (!form.service || !form.date) return [];
    const [y, m, d] = form.date.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    let list = serviceSlots(form.service, date);
    // If today, drop slots less than 1 hour away
    const now = new Date();
    if (form.date === iso(now)) {
      const cutoff = now.getHours() * 60 + now.getMinutes() + 60;
      list = list.filter((s) => {
        const [hm, ampm] = [s.split(" ")[0], s.split(" ")[1]];
        let [h, mi] = hm.split(":").map(Number);
        if (ampm === "PM" && h !== 12) h += 12;
        if (ampm === "AM" && h === 12) h = 0;
        return h * 60 + mi >= cutoff;
      });
    }
    return list;
  }, [form.service, form.date]);

  /* ---------- step guards ---------- */
  const service = BOOKABLE_SERVICES.find((s) => s.id === form.service);

  function next() {
    setError("");
    if (step === 0 && !form.service) return setError("Choose a service to continue.");
    if (step === 1 && (!form.date || !form.time))
      return setError("Pick a day and a time slot.");
    if (step === 2) {
      if (!form.fullName.trim() || form.fullName.trim().length < 3)
        return setError("Please enter your full legal name.");
      if (!form.idNumber.trim()) return setError("ID / passport / birth-notice number is required.");
      if (!KENYA_PHONE.test(digits(form.phone)))
        return setError("Enter a valid Kenyan mobile number, e.g. 0712 345 678.");
      if (!form.residence) return setError("Select your residential area.");
      if (form.payment === "sha" && !form.shaNumber.trim())
        return setError("Enter your SHA number, or switch payment to M-Pesa / cash.");
    }
    setStep((s) => Math.min(s + 1, 3));
  }

  async function submit() {
    setError("");
    if (!form.consent)
      return setError("We need your consent to process the booking (Data Protection Act 2019).");
    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Booking failed");
      setReference(data.reference);
    } catch (e) {
      setError(
        "Could not reach the booking desk. Please try again — or call us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ================= confirmation ================= */
  if (reference && service) {
    return (
      <div className="reveal is-visible mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-deep">
          <div className="bg-gradient-to-br from-pine-700 to-pine-900 px-7 pb-8 pt-9 text-center sm:px-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sun-400 text-pine-950">
              <Icon name="check" className="h-8 w-8" strokeWidth={2.6} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-cream-50 sm:text-3xl">
              You&apos;re booked, {form.fullName.split(" ")[0]}
            </h3>
            <p className="mt-2 text-sm text-cream-100/80">
              A confirmation SMS will follow from reception.
            </p>
            <p className="mt-5 inline-block rounded-2xl border border-dashed border-cream-100/40 px-6 py-3 font-mono text-xl font-bold tracking-wider text-sun-300">
              {reference}
            </p>
          </div>

          <div className="px-7 py-7 sm:px-10">
            <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              {[
                ["Service", service.name],
                ["When", `${prettyDate(form.date)} · ${form.time}`],
                ["Patient", `${form.fullName} · ${form.idType}`],
                ["Payment", form.payment === "sha" ? `SHA · ${form.shaNumber}` : form.payment === "mpesa" ? "M-Pesa at cashier" : "Cash at cashier"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-cream-100 px-4 py-3">
                  <dt className="text-[0.68rem] font-bold uppercase tracking-wider text-ink-500">
                    {k}
                  </dt>
                  <dd className="mt-0.5 font-semibold text-pine-950">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-2xl border border-pine-100 bg-pine-50 p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-pine-800">
                <Icon name="info" className="h-4 w-4" />
                Bring with you
              </p>
              <ul className="mt-3 grid gap-2 text-[0.86rem] text-ink-700 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <Icon name="check" className="h-3.5 w-3.5 text-pine-600" /> ID / birth
                  notification
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check" className="h-3.5 w-3.5 text-pine-600" /> This reference
                  number
                </li>
                {form.service === "lab" && (
                  <li className="flex items-center gap-2">
                    <Icon name="check" className="h-3.5 w-3.5 text-pine-600" /> 8–12 hr fast if
                    fasting tests
                  </li>
                )}
                {form.service === "surgery" && (
                  <li className="flex items-center gap-2">
                    <Icon name="check" className="h-3.5 w-3.5 text-pine-600" /> 4-hr fast before
                    procedure
                  </li>
                )}
                {form.service === "mch" && (
                  <li className="flex items-center gap-2">
                    <Icon name="check" className="h-3.5 w-3.5 text-pine-600" /> Mother-Child
                    booklet
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <Icon name="check" className="h-3.5 w-3.5 text-pine-600" /> Medical cards /
                  SHA card
                </li>
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={CLINIC.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-pine-700 px-5 py-3.5 text-sm font-bold text-cream-50 hover:bg-pine-600"
              >
                <Icon name="navigation" className="h-4 w-4" /> Get directions
              </a>
              <a
                href={CLINIC.phoneHref}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-pine-200 px-5 py-3.5 text-sm font-bold text-pine-700 hover:bg-pine-50"
              >
                <Icon name="phone" className="h-4 w-4" /> {CLINIC.phoneDisplay}
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setForm(INITIAL);
                setReference("");
                setStep(0);
              }}
              className="mt-5 w-full text-center text-xs font-semibold text-ink-500 underline-offset-2 hover:underline"
            >
              Make another booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= wizard ================= */
  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-1.5 sm:gap-2.5">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col gap-2">
            <span
              className={`h-1.5 rounded-full transition-colors duration-500 ${
                i <= step ? "bg-sun-400" : "bg-pine-950/10"
              }`}
            />
            <span
              className={`hidden text-[0.7rem] font-bold uppercase tracking-wider sm:block ${
                i === step ? "text-pine-900" : "text-ink-500/70"
              }`}
            >
              {i + 1}. {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="rounded-[2rem] bg-white p-6 shadow-lift sm:p-9">
        {/* ---- STEP 0: service + urgency ---- */}
        {step === 0 && (
          <div>
            <h3 className="font-display text-2xl font-semibold text-pine-950">
              What do you need?
            </h3>
            <p className="mt-1.5 text-sm text-ink-500">
              Pharmacy refills don&apos;t need a booking — just walk in.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {BOOKABLE_SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => set("service", s.id)}
                  aria-pressed={form.service === s.id}
                  className={`group flex items-start gap-3.5 rounded-2xl border-2 p-4 text-left transition-all ${
                    form.service === s.id
                      ? "border-pine-600 bg-pine-50 shadow-lift"
                      : "border-cream-200 bg-cream-50 hover:border-pine-300"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      form.service === s.id
                        ? "border-pine-600 bg-pine-600 text-white"
                        : "border-cream-300 bg-white text-transparent"
                    }`}
                  >
                    <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-bold text-pine-950">
                      {s.name}
                    </span>
                    <span className="mt-0.5 block text-xs italic text-ink-500">{s.sw}</span>
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-8 text-sm font-bold text-pine-950">
              Any of these describe how you&apos;re feeling?{" "}
              <span className="font-normal text-ink-500">(optional — tick all that apply)</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[...URGENT_FLAGS, ...RED_FLAGS].map((sym) => {
                const active = form.urgency.includes(sym);
                const isRed = RED_FLAGS.includes(sym);
                return (
                  <button
                    key={sym}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      set(
                        "urgency",
                        active
                          ? form.urgency.filter((u) => u !== sym)
                          : [...form.urgency, sym]
                      )
                    }
                    className={`rounded-full px-4 py-2 text-[0.8rem] font-semibold transition-all ${
                      active
                        ? isRed
                          ? "bg-ember-500 text-white shadow-lift"
                          : "bg-sun-400 text-pine-950 shadow-lift"
                        : isRed
                          ? "bg-ember-50 text-ember-700 hover:bg-ember-100"
                          : "bg-cream-100 text-ink-700 hover:bg-cream-200"
                    }`}
                  >
                    {sym}
                  </button>
                );
              })}
            </div>

            {form.urgency.some((u) => URGENT_FLAGS.includes(u)) && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-sun-200 bg-sun-50 p-4">
                <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-sun-600" />
                <p className="text-[0.83rem] leading-relaxed text-ink-700">
                  <strong>Urgent?</strong> You&apos;re welcome to walk in right away — urgent
                  cases are evaluated within 15 minutes of arrival, no appointment needed.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ---- STEP 1: date & time ---- */}
        {step === 1 && (
          <div>
            <h3 className="font-display text-2xl font-semibold text-pine-950">
              Pick a day &amp; time
            </h3>
            <p className="mt-1.5 text-sm text-ink-500">
              {service?.name} · {service?.hours}
            </p>

            <div className="nice-scroll mt-6 flex gap-2.5 overflow-x-auto pb-3">
              {dates.map((d) => {
                const dIso = iso(d);
                const active = form.date === dIso;
                const closed = d.getDay() === 0;
                return (
                  <button
                    key={dIso}
                    type="button"
                    disabled={closed}
                    onClick={() => {
                      set("date", dIso);
                      set("time", "");
                    }}
                    className={`flex w-[4.4rem] shrink-0 flex-col items-center rounded-2xl border-2 px-2 py-3 transition-all ${
                      closed
                        ? "cursor-not-allowed border-cream-100 bg-cream-50 opacity-45"
                        : active
                          ? "border-pine-600 bg-pine-700 text-cream-50 shadow-lift"
                          : "border-cream-200 bg-white hover:border-pine-300"
                    }`}
                  >
                    <span
                      className={`text-[0.68rem] font-bold uppercase tracking-wider ${
                        active ? "text-pine-200" : "text-ink-500"
                      }`}
                    >
                      {DAYS[d.getDay()]}
                    </span>
                    <span className="mt-0.5 font-display text-xl font-semibold">
                      {d.getDate()}
                    </span>
                    <span
                      className={`text-[0.65rem] font-semibold ${
                        active ? "text-pine-200" : "text-ink-500"
                      }`}
                    >
                      {closed ? "closed" : MONTHS[d.getMonth()]}
                    </span>
                  </button>
                );
              })}
            </div>

            {!form.date ? (
              <p className="mt-4 rounded-2xl bg-cream-100 p-4 text-sm text-ink-500">
                Select a day above to see available slots. Sundays are closed for booked
                visits — emergencies always walk in.
              </p>
            ) : slots.length === 0 ? (
              <p className="mt-4 rounded-2xl border border-ember-100 bg-ember-50 p-4 text-sm text-ink-700">
                {service?.name} doesn&apos;t run on this day. The Minor Surgery Unit operates
                Tue, Thu &amp; Sat only — or pick another day.
              </p>
            ) : (
              <div className="nice-scroll mt-4 grid max-h-56 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
                {slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={form.time === s}
                    onClick={() => set("time", s)}
                    className={`rounded-xl border-2 py-2.5 text-sm font-semibold transition-all ${
                      form.time === s
                        ? "border-pine-600 bg-pine-600 text-white shadow-lift"
                        : "border-cream-200 bg-white text-ink-700 hover:border-pine-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---- STEP 2: details ---- */}
        {step === 2 && (
          <div>
            <h3 className="font-display text-2xl font-semibold text-pine-950">
              Your details
            </h3>
            <p className="mt-1.5 text-sm text-ink-500">
              This is the same information our front desk registers — done in advance,
              it saves you 10 minutes on arrival.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full legal name *" className="sm:col-span-2">
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  placeholder="As written on your ID"
                  autoComplete="name"
                  className={inputCls}
                />
              </Field>

              <Field label="ID type">
                <select
                  value={form.idType}
                  onChange={(e) => set("idType", e.target.value)}
                  className={inputCls}
                >
                  {["National ID", "Passport", "Birth notification (child)"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="ID / document number *">
                <input
                  type="text"
                  value={form.idNumber}
                  onChange={(e) => set("idNumber", e.target.value)}
                  placeholder="e.g. 12345678"
                  className={inputCls}
                />
              </Field>

              <Field label="Mobile number *">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="0712 345 678"
                  autoComplete="tel"
                  className={inputCls}
                />
              </Field>
              <Field label="Residential area *">
                <select
                  value={form.residence}
                  onChange={(e) => set("residence", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select area…</option>
                  {RESIDENCES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </Field>

              <Field label="Next of kin — name">
                <input
                  type="text"
                  value={form.kinName}
                  onChange={(e) => set("kinName", e.target.value)}
                  placeholder="Emergency contact"
                  className={inputCls}
                />
              </Field>
              <Field label="Next of kin — phone">
                <input
                  type="tel"
                  value={form.kinPhone}
                  onChange={(e) => set("kinPhone", e.target.value)}
                  placeholder="0712 345 678"
                  className={inputCls}
                />
              </Field>
            </div>

            <p className="mt-7 text-sm font-bold text-pine-950">How will you pay?</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                { id: "sha", label: "SHA", sub: "Capitation · KES 900" },
                { id: "mpesa", label: "M-Pesa", sub: "Till / Paybill" },
                { id: "cash", label: "Cash", sub: "Receipt issued" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={form.payment === p.id}
                  onClick={() => set("payment", p.id)}
                  className={`rounded-2xl border-2 p-3.5 text-left transition-all ${
                    form.payment === p.id
                      ? "border-pine-600 bg-pine-50"
                      : "border-cream-200 hover:border-pine-300"
                  }`}
                >
                  <span className="block text-sm font-bold text-pine-950">{p.label}</span>
                  <span className="mt-0.5 block text-xs text-ink-500">{p.sub}</span>
                </button>
              ))}
            </div>

            {form.payment === "sha" && (
              <div className="mt-4">
                <Field label="SHA membership number *">
                  <input
                    type="text"
                    value={form.shaNumber}
                    onChange={(e) => set("shaNumber", e.target.value)}
                    placeholder="Found on your SHA card / portal"
                    className={inputCls}
                  />
                </Field>
              </div>
            )}

            <div className="mt-4">
              <Field label="Anything the doctor should know? (optional)">
                <textarea
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  rows={3}
                  placeholder="Symptoms, allergies, ongoing medication…"
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>
          </div>
        )}

        {/* ---- STEP 3: review ---- */}
        {step === 3 && service && (
          <div>
            <h3 className="font-display text-2xl font-semibold text-pine-950">
              Check &amp; confirm
            </h3>

            <div className="mt-6 overflow-hidden rounded-2xl border border-cream-200">
              <div className="flex items-center gap-4 bg-cream-50 p-4 sm:p-5">
                <LogoMark className="h-11 w-11 shrink-0 rounded-xl" />
                <div>
                  <p className="font-display text-lg font-semibold text-pine-950">
                    {service.name}
                  </p>
                  <p className="text-sm text-ink-500">
                    {form.date ? prettyDate(form.date) : ""} · {form.time}
                  </p>
                </div>
              </div>
              <dl className="grid gap-x-6 gap-y-2.5 p-4 text-sm sm:grid-cols-2 sm:p-5">
                {[
                  ["Patient", form.fullName],
                  ["Contact", form.phone],
                  ["ID", `${form.idType} · ${form.idNumber}`],
                  ["Residence", form.residence],
                  ...(form.kinName
                    ? ([["Next of kin", `${form.kinName} ${form.kinPhone ? `· ${form.kinPhone}` : ""}`]] as [string, string][])
                    : []),
                  [
                    "Payment",
                    form.payment === "sha"
                      ? `SHA · ${form.shaNumber}`
                      : form.payment === "mpesa"
                        ? "M-Pesa at cashier"
                        : "Cash at cashier",
                  ],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-cream-100 pb-2">
                    <dt className="text-ink-500">{k}</dt>
                    <dd className="text-right font-semibold text-pine-950">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* DPA consent */}
            <label className="mt-6 flex cursor-pointer items-start gap-3.5 rounded-2xl border border-pine-100 bg-pine-50 p-4">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-pine-700"
              />
              <span className="text-[0.8rem] leading-relaxed text-ink-700">
                I consent to <strong>Kasarani Medical Clinic</strong> collecting and
                processing these details to register and manage my visit, as required
                under the <strong>Data Protection Act 2019</strong>. Records are
                encrypted, access-restricted to my care team, and shared only with the
                SHA portal for insurance verification — never sold or used for
                advertising.
              </span>
            </label>
          </div>
        )}

        {/* Error */}
        {error && (
          <p
            role="alert"
            className="mt-5 flex items-center gap-2.5 rounded-2xl bg-ember-50 px-4 py-3 text-sm font-medium text-ember-700"
          >
            <Icon name="alert" className="h-4.5 w-4.5 shrink-0" />
            {error}
          </p>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => {
                setError("");
                setStep((s) => s - 1);
              }}
              className="flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold text-ink-500 transition-colors hover:bg-cream-100"
            >
              <Icon name="arrow-left" className="h-4 w-4" /> Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="group flex items-center gap-2 rounded-2xl bg-pine-700 px-7 py-3.5 text-sm font-bold text-cream-50 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-pine-600"
            >
              Continue
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="flex items-center gap-2.5 rounded-2xl bg-sun-400 px-7 py-3.5 text-sm font-extrabold text-pine-950 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-sun-300 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-pine-950/30 border-t-pine-950" />
                  Booking…
                </>
              ) : (
                <>
                  <Icon name="check" className="h-4 w-4" strokeWidth={2.8} />
                  Confirm booking
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Emergency override */}
      {emergency && <EmergencyBlock onClose={() => setEmergency(false)} />}
    </div>
  );
}

/* ---------- shared bits ---------- */

const inputCls =
  "w-full rounded-xl border-2 border-cream-200 bg-white px-4 py-3 text-[0.92rem] text-pine-950 placeholder:text-ink-500/50 transition-colors focus:border-pine-500 focus:outline-none";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function EmergencyBlock({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label="Emergency — call now"
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
    >
      <div className="absolute inset-0 bg-ember-800/45 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-[2rem] bg-white p-7 text-center shadow-deep sm:p-9">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ember-100 text-ember-600">
          <Icon name="alert" className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-display text-2xl font-semibold text-pine-950">
          Please don&apos;t wait for an appointment
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          The symptom you selected can be a medical emergency. Call the triage desk now
          or come straight in — our doors have ramp access and a drop-off bay.
        </p>
        <a
          href={CLINIC.phoneHref}
          className="pulse-ring mt-6 flex items-center justify-center gap-3 rounded-2xl bg-ember-500 px-6 py-4.5 text-lg font-extrabold text-white shadow-deep"
        >
          <Icon name="phone" className="h-6 w-6" />
          Call {CLINIC.phoneDisplay}
        </a>
        <div className="mt-3 flex gap-3">
          <a
            href={CLINIC.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-pine-700 px-4 py-3 text-sm font-bold text-cream-50"
          >
            <Icon name="navigation" className="h-4 w-4" /> Directions
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-2xl px-4 py-3 text-sm font-bold text-ink-500 hover:bg-cream-100"
          >
            I understand
          </button>
        </div>
      </div>
    </div>
  );
}
