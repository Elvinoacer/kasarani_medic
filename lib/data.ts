/* ============================================================
   Hospital Kasarani Medical Clinic — single source of truth
   Content derived from research.md (operational assessment)
   ============================================================ */

export const CLINIC = {
  name: "Hospital Kasarani Medical Clinic",
  shortName: "Kasarani Medical",
  tagline: "Quality care, close to home",
  taglineSw: "Afya bora, karibu na nyumbani",
  level: "Level 2 Private Medical Clinic",
  phoneDisplay: "+254 797 679 101",
  phoneHref: "tel:+254797679101",
  whatsappHref: "https://wa.me/254797679101",
  address: "Past Queen Land Towers, Off Mwiki – Kasarani Road",
  city: "Nairobi County, Kenya",
  plusCode: "QW9C+XJ3",
  plusCodeQuery: "QW9C%2BXJ3%20Nairobi%2C%20Kenya",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=QW9C%2BXJ3%20Nairobi%2C%20Kenya",
  mapsEmbed:
    "https://maps.google.com/maps?q=QW9C%2BXJ3%2C%20Nairobi%2C%20Kenya&z=16&output=embed",
  matatuRoutes: ["17B", "17A"],
} as const;

export const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#triage", label: "Urgency check" },
  { href: "/#prep", label: "Visit prep" },
  { href: "/#payments", label: "Payments" },
  { href: "/#visit", label: "Find us" },
  { href: "/#faq", label: "FAQs" },
] as const;

/* ---------------- Opening hours ---------------- */

export type DayHours = {
  days: string;
  hours: string;
  note?: string;
};

export const HOURS: DayHours[] = [
  {
    days: "General Outpatient (OPD)",
    hours: "Mon – Sat · 8:00 AM – 8:00 PM",
    note: "Consultations, check-ups, prescriptions",
  },
  {
    days: "Emergency Triage & Observation",
    hours: "Daily · 12-hour window",
    note: "Walk-in stabilization & observation up to 12 hrs",
  },
  {
    days: "Diagnostic Laboratory",
    hours: "Mon – Sat · 8:00 AM – 7:00 PM",
    note: "Specimen collection & rapid testing",
  },
  {
    days: "Minor Surgery Unit",
    hours: "Tue, Thu & Sat · 9:00 AM – 4:00 PM",
    note: "Elective procedures & dressing changes",
  },
  {
    days: "Dispensing Pharmacy",
    hours: "Mon – Sat · 8:00 AM – 8:00 PM",
    note: "Prescriptions & over-the-counter supply",
  },
];

/* ---------------- Services ---------------- */

export type Service = {
  id: string;
  name: string;
  sw: string;
  summary: string;
  image: string;
  hours: string;
  includes: string[];
  prep?: string;
  bookable: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "opd",
    name: "General Outpatient (OPD)",
    sw: "Kuona daktari · matibabu ya kawaida",
    summary:
      "Everyday primary care for the whole family — from fever and flu to long-term conditions like hypertension and diabetes, handled with unhurried, plain-language consultations.",
    image: "/images/opd.png",
    hours: "Mon – Sat · 8:00 AM – 8:00 PM",
    includes: [
      "Acute illness diagnosis & treatment",
      "Chronic disease monitoring (BP, type 2 diabetes)",
      "Routine check-ups & physicals",
      "Prescription renewal & review",
    ],
    prep: "Bring your National ID or passport, your SHA details, and any previous medical cards or prescription logs.",
    bookable: true,
  },
  {
    id: "lab",
    name: "Diagnostic Laboratory",
    sw: "Vipimo vya damu na mkojo · lab",
    summary:
      "Fast, essential diagnostics on-site — so you see the doctor and get answers on the same visit, without being sent across town.",
    image: "/images/lab.png",
    hours: "Mon – Sat · 8:00 AM – 7:00 PM",
    includes: [
      "Complete blood count (CBC)",
      "Malaria rapid tests (RDT) & typhoid serology",
      "Urinalysis & basic stool exams",
      "Random & fasting blood glucose",
    ],
    prep: "For fasting blood tests, avoid all food and caloric drinks for 8–12 hours beforehand. Plain water is fine — and skip the morning gym session.",
    bookable: true,
  },
  {
    id: "mch",
    name: "Maternal & Child Health",
    sw: "Kliniki ya wajawazito · uzazi",
    summary:
      "Careful, continuous care for mothers and little ones — antenatal visits, immunizations and family planning, all tracked in your official Mother-Child booklet.",
    image: "/images/mch.png",
    hours: "Mon – Sat · 8:00 AM – 5:00 PM",
    includes: [
      "Antenatal care (ANC) & fetal monitoring",
      "Postnatal check-ups",
      "Child immunizations per national schedule",
      "Family planning counselling",
    ],
    prep: "Carry your official Mother-Child Health Booklet and a guardian ID for every visit.",
    bookable: true,
  },
  {
    id: "surgery",
    name: "Minor Surgery Unit",
    sw: "Kutahiri · operation ndogo",
    summary:
      "Safe, elective day procedures in a dedicated minor theatre — including wound care, suturing, abscess drainage and male circumcision (kutahiri) with proper consent and follow-up.",
    image: "/images/surgery.png",
    hours: "Tue, Thu & Sat · 9:00 AM – 4:00 PM",
    includes: [
      "Elective male circumcision (kutahiri)",
      "Wound care & laceration suturing",
      "Minor abscess drainage",
      "Scheduled dressing changes",
    ],
    prep: "Bring a National ID or guardian ID, fast from solids for 4 hours before your procedure, and complete pre-procedure screening & coagulation labs.",
    bookable: true,
  },
  {
    id: "pharmacy",
    name: "Dispensing Pharmacy",
    sw: "Dawa · duka la dawa",
    summary:
      "Genuine, essential medicines stocked to the Kenya Essential Medicines List for Level 2 facilities — dispensed with clear dosage explanation in the language you're comfortable in.",
    image: "/images/pharmacy.png",
    hours: "Mon – Sat · 8:00 AM – 8:00 PM",
    includes: [
      "Oral, topical & basic parenteral medicines",
      "Kenya Essential Medicines List stock",
      "Over-the-counter supply",
      "Dosage counselling — English or Kiswahili",
    ],
    bookable: false,
  },
];

/* ---------------- Triage (research-mandated routing) ---------------- */

export type TriageLevel = {
  id: "red" | "yellow" | "green";
  title: string;
  sw: string;
  headline: string;
  action: string;
  sla: string;
  symptoms: string[];
};

export const TRIAGE: TriageLevel[] = [
  {
    id: "red",
    title: "Emergency",
    sw: "Dharura",
    headline: "Call now — do not book online",
    action: "Tap-to-call our hotline and head straight to the clinic. Free ramp access and a dedicated drop-off bay are right at the triage doors.",
    sla: "Immediate clinical handoff on arrival",
    symptoms: [
      "Difficulty breathing",
      "Severe chest pain",
      "Heavy active bleeding",
      "Unconsciousness / confusion",
      "Child convulsions / fits",
      "Emergency pregnancy complication",
    ],
  },
  {
    id: "yellow",
    title: "Urgent — today",
    sw: "Haraka",
    headline: "Come in now — no appointment needed",
    action: "Skip the online queue and walk straight in. Our reception notifies the nursing desk the moment you mention an urgent symptom at the front desk.",
    sla: "First clinical evaluation within 15 minutes",
    symptoms: [
      "High fever (over 38.5°C)",
      "Severe abdominal pain",
      "Persistent vomiting / dehydration",
      "Open cut needing stitches",
      "Recent injury or trauma",
    ],
  },
  {
    id: "green",
    title: "Routine",
    sw: "Kawaida",
    headline: "Book a slot that suits you",
    action: "Pick a service, a day and a time below. We'll register you ahead of arrival so your consultation starts on schedule.",
    sla: "Consultation within 30–45 minutes of arrival",
    symptoms: [
      "Mild cold, cough or flu",
      "Prescription refill",
      "Routine check-up",
      "Circumcision consultation (kutahiri)",
      "Antenatal / wellness visit",
      "Blood test (vipimo vya damu)",
    ],
  },
];

/* ---------------- Booking ---------------- */

export const BOOKABLE_SERVICES = SERVICES.filter((s) => s.bookable);

export function serviceSlots(serviceId: string, date: Date): string[] {
  const day = date.getDay(); // 0 Sun … 6 Sat
  const isSunday = day === 0;
  if (isSunday) return [];

  const mins: number[] = [];
  const push = (from: number, to: number, step = 30) => {
    for (let t = from; t <= to; t += step) mins.push(t);
  };
  const h = (hour: number, min = 0) => hour * 60 + min;

  switch (serviceId) {
    case "opd":
      push(h(8, 30), h(19, 0));
      break;
    case "lab":
      push(h(8, 0), h(18, 0));
      break;
    case "mch":
      push(h(8, 30), h(16, 0));
      break;
    case "surgery":
      // Tue (2), Thu (4), Sat (6) only, 9:00 – 15:30
      if ([2, 4, 6].includes(day)) push(h(9, 0), h(15, 0));
      break;
    default:
      push(h(9, 0), h(16, 0));
  }
  return mins.map((t) => {
    const hh = Math.floor(t / 60);
    const mm = t % 60;
    const ampm = hh >= 12 ? "PM" : "AM";
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    return `${h12}:${String(mm).padStart(2, "0")} ${ampm}`;
  });
}

/* ---------------- Payments ---------------- */

export const PAYMENTS = [
  {
    id: "sha",
    name: "Social Health Authority (SHA)",
    sw: "Bima ya afya",
    badge: "Covers most visits",
    detail:
      "We are accredited under the SHA Primary Healthcare Fund. Your outpatient capitation (KES 900 per visit) covers the consultation, essential diagnostic tests and basic medicines for primary care.",
    points: [
      "Consultation, basic labs & essential medicines",
      "Verified digitally at reception in seconds",
      "Bring your SHA number to every visit",
    ],
    icon: "shield",
  },
  {
    id: "mpesa",
    name: "M-Pesa",
    sw: "Malipo ya simu",
    badge: "Till & Paybill",
    detail:
      "Out-of-pocket services, elective procedures and non-SHA pharmacy items are paid by Safaricom M-Pesa at the front-desk cashier — verified in real time, no cash-handling delays.",
    points: [
      "Till number & Paybill accepted",
      "Instant confirmation at the cashier desk",
      "Ideal for elective surgery balances",
    ],
    icon: "phone",
  },
  {
    id: "cash",
    name: "Direct Cash",
    sw: "Malipo ya pesa taslimu",
    badge: "Receipt issued",
    detail:
      "Cash is welcome for walk-in diagnostics and emergency out-of-pocket care. Our finance desk issues a computerized receipt for every transaction, so your records stay clean.",
    points: [
      "Computerized receipt for every payment",
      "Transparent price display at reception",
      "No hidden charges — ever",
    ],
    icon: "cash",
  },
];

/* ---------------- Visit preparation ---------------- */

export const PREP = [
  {
    id: "surgery-prep",
    dept: "Elective Minor Surgery · Kutahiri",
    items: [
      "Present an official National ID or guardian ID",
      "Fast from solids for 4 hours before the procedure",
      "Complete pre-procedure screening & coagulation labs",
      "Arrange a companion to accompany you home",
    ],
    why: "Validates legal consent, reduces aspiration risk under local anesthesia, and rules out bleeding disorders before we start.",
  },
  {
    id: "lab-prep",
    dept: "Fasting Blood Tests · Vipimo vya damu",
    items: [
      "Fast for 8–12 hours (no food, no caloric drinks)",
      "Plain water is allowed and encouraged",
      "Avoid strenuous morning exercise",
      "Book the first slots of the day for fastest results",
    ],
    why: "Eliminates post-meal glucose and lipid spikes so your metabolic baseline readings are accurate the first time.",
  },
  {
    id: "opd-prep",
    dept: "General Consultation · Kuona daktari",
    items: [
      "Bring your National ID or passport",
      "Have your active SHA membership details ready",
      "Carry previous medical cards & prescription logs",
      "Note down your symptoms and when they started",
    ],
    why: "Speeds up registration, verifies your insurance eligibility instantly, and gives the clinician your full history.",
  },
  {
    id: "mch-prep",
    dept: "Maternal & Child Health · Kliniki ya wajawazito",
    items: [
      "Carry the official Mother-Child Health Booklet",
      "Present legal guardian identification",
      "Note any changes since the last visit",
      "Arrive 10 minutes early for vitals",
    ],
    why: "Keeps the longitudinal vaccination schedule on track against national guidelines and confirms guardianship.",
  },
];

/* ---------------- Trust & compliance ---------------- */

export const TRUST = [
  {
    title: "KMPDC Licensed · Level 2",
    body: "Officially licensed by the Kenya Medical Practitioners and Dentists Council as a Level 2 Private Medical Clinic, renewed annually against statutory standards.",
    icon: "badge",
  },
  {
    title: "ODPC Registered Data Handler",
    body: "Fully registered with the Office of the Data Protection Commissioner — a mandatory credential we maintain alongside our facility license.",
    icon: "lock",
  },
  {
    title: "Your Data, Protected by Law",
    body: "Under the Data Protection Act 2019, your health records are encrypted, access is role-restricted to your care team, and nothing is shared without your explicit consent.",
    icon: "shield",
  },
  {
    title: "Licensed Practitioners Only",
    body: "Every doctor, clinical officer and visiting surgeon holds an active KMPDC annual practice license, verified at credentialing and kept on file.",
    icon: "stethoscope",
  },
];

export const FAQS = [
  {
    q: "Do you accept SHA?",
    qSw: "Mnaikubali SHA?",
    a: "Yes. We are accredited under the Social Health Authority's Primary Healthcare Fund. The standard outpatient capitation (KES 900 per visit) covers your consultation, essential diagnostic tests and basic medicines. Bring your SHA number — reception verifies it digitally in seconds.",
  },
  {
    q: "Nawezaje kupata vipimo vya damu?",
    qSw: "How do I get a blood test?",
    a: "Walk into the laboratory (Mon–Sat, 8:00 AM–7:00 PM) or book a slot online. If your test requires fasting — like blood glucose — avoid food and caloric drinks for 8–12 hours first, and book a morning slot. Plain water is fine.",
  },
  {
    q: "Do you do circumcision (kutahiri)?",
    qSw: "Mnafanya kutahiri?",
    a: "Yes. Elective male circumcision is performed in our Minor Surgery Unit on Tuesdays, Thursdays and Saturdays (9:00 AM–4:00 PM). Book a consultation first: you'll need an ID or guardian ID, a 4-hour fast before the procedure, and pre-procedure screening labs.",
  },
  {
    q: "How do I reach the clinic from town?",
    qSw: "Nawezaje kufika?",
    a: "Board matatu route 17B or 17A from the CBD along the Kasarani–Mwiki road. Alight at the Queen Land Towers stage — we are a 50-metre walk down the access street, past Queen Land Towers. You can also tap the Find us section for live GPS directions (Plus Code QW9C+XJ3).",
  },
  {
    q: "Is it an emergency? Should I book online?",
    qSw: "Ni dharura?",
    a: "No — if it's an emergency, skip every form. Tap the red Call Now button on this site or come straight in. Our ground-floor triage doors have ramp access and a dedicated vehicle drop-off bay, and emergencies are seen immediately on arrival.",
  },
  {
    q: "What are your closing hours?",
    qSw: "Mnafungwa saa ngapi?",
    a: "Outpatient and pharmacy run Mon–Sat, 8:00 AM–8:00 PM; the laboratory closes at 7:00 PM; the Minor Surgery Unit operates Tue/Thu/Sat, 9:00 AM–4:00 PM. Emergency triage runs within its daily 12-hour operational window.",
  },
];

/* ---------------- Vernacular marquee ---------------- */

export const VERNACULAR = [
  "hospitali ya kibinafsi Kasarani",
  "kuona daktari",
  "vipimo vya damu",
  "kutahiri",
  "kliniki ya wajawazito",
  "wagonjwa wa dharura",
  "kulazwa kwa muda",
  "dawa",
];
