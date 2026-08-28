import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_SERVICES = new Set(["opd", "lab", "mch", "surgery"]);
const VALID_PAYMENTS = new Set(["sha", "mpesa", "cash"]);
const KENYA_PHONE = /^(?:\+?254|0)?[17]\d{8}$/;
const digits = (s: unknown) => String(s ?? "").replace(/[\s-]/g, "");

function reference() {
  // Unambiguous charset — no 0/O, 1/I
  const chars = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  const bytes = randomBytes(6);
  let out = "";
  for (const b of bytes) out += chars[b % chars.length];
  return `KMC-${out}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const service = String(body.service ?? "");
    const time = String(body.time ?? "").slice(0, 20);
    const date = /^\d{4}-\d{2}-\d{2}$/.test(String(body.date ?? ""))
      ? String(body.date)
      : "";

    const errors: string[] = [];
    if (!VALID_SERVICES.has(service)) errors.push("invalid service");
    if (!date) errors.push("invalid date");
    if (!time) errors.push("invalid time");
    if (String(body.fullName ?? "").trim().length < 3) errors.push("invalid name");
    if (!String(body.idNumber ?? "").trim()) errors.push("missing ID");
    if (!KENYA_PHONE.test(digits(body.phone))) errors.push("invalid phone");
    if (body.payment === "sha" && !String(body.shaNumber ?? "").trim())
      errors.push("missing SHA number");
    if (body.consent !== true) errors.push("consent required");

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, error: errors.join("; ") }, { status: 400 });
    }

    const ref = reference();
    const record = {
      reference: ref,
      createdAt: new Date().toISOString(),
      service,
      date,
      time,
      patient: {
        fullName: String(body.fullName).trim().slice(0, 120),
        idType: String(body.idType ?? "National ID").slice(0, 40),
        idNumber: String(body.idNumber).trim().slice(0, 40),
        phone: digits(body.phone).slice(0, 16),
        residence: String(body.residence ?? "").slice(0, 40),
        nextOfKin: {
          name: String(body.kinName ?? "").trim().slice(0, 120),
          phone: body.kinPhone ? digits(body.kinPhone).slice(0, 16) : "",
        },
      },
      payment: {
        method: String(body.payment ?? "cash"),
        shaNumber: body.shaNumber ? String(body.shaNumber).trim().slice(0, 40) : "",
      },
      urgencyFlags: Array.isArray(body.urgency) ? body.urgency.slice(0, 10).map(String) : [],
      notes: String(body.notes ?? "").trim().slice(0, 600),
    };

    // Persist to data/bookings.json (JSON array, validated above)
    const dir = path.join(process.cwd(), "data");
    const file = path.join(dir, "bookings.json");
    await fs.mkdir(dir, { recursive: true });

    let bookings: unknown[] = [];
    try {
      const parsed: unknown = JSON.parse(await fs.readFile(file, "utf8"));
      if (Array.isArray(parsed)) bookings = parsed;
    } catch {
      bookings = [];
    }
    bookings.push(record);
    await fs.writeFile(file, JSON.stringify(bookings, null, 2), "utf8");

    return NextResponse.json({ ok: true, reference: ref });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
