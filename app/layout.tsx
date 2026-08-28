import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CLINIC } from "@/lib/data";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kasaranimedical.co.ke"),
  title: {
    default:
      "Hospital Kasarani Medical Clinic — Quality care, close to home | Kasarani, Nairobi",
    template: "%s · Hospital Kasarani Medical Clinic",
  },
  description:
    "KMPDC-licensed Level 2 private medical clinic on the Mwiki–Kasarani road, past Queen Land Towers. General outpatient, laboratory, maternal & child health, minor surgery (kutahiri) and pharmacy. SHA accepted, M-Pesa ready. Book online or call +254 797 679 101.",
  keywords: [
    "hospitali ya kibinafsi Kasarani",
    "clinic Kasarani",
    "hospital Mwiki",
    "vipimo vya damu",
    "kutahiri Nairobi",
    "SHA clinic Nairobi",
    "Queen Land Towers clinic",
    "Kasarani medical clinic",
  ],
  openGraph: {
    title: "Hospital Kasarani Medical Clinic",
    description:
      "Quality care, close to home. Level 2 private clinic past Queen Land Towers, Mwiki–Kasarani Road. Book online or call +254 797 679 101.",
    locale: "en_KE",
    type: "website",
    images: [{ url: "/images/hero.png", width: 1440, height: 720 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0D3A32",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: CLINIC.name,
  slogan: CLINIC.tagline,
  telephone: CLINIC.phoneDisplay,
  medicalSpecialty: ["PrimaryCare", "Obstetric", "Pediatric"],
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.address,
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
