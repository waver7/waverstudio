import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  service?: string;
  challenge?: string;
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  company?: string; // honeypot — must stay empty
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (clip(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    service: clip(body.service, 80),
    challenge: clip(body.challenge, 4000),
    name: clip(body.name, 120),
    business: clip(body.business, 160),
    email: clip(body.email, 200),
    phone: clip(body.phone, 60),
  };

  if (!lead.name || !lead.business || !emailRe.test(lead.email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, business and a valid email." },
      { status: 422 },
    );
  }

  const to = process.env.LEAD_TO_EMAIL || site.email;
  const from = process.env.LEAD_FROM_EMAIL || "WaverStudio <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `New AI audit request — ${lead.business}`;
  const text = [
    `Service: ${lead.service || "—"}`,
    `Name: ${lead.name}`,
    `Business: ${lead.business}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "—"}`,
    "",
    "What's taking too much time:",
    lead.challenge || "—",
  ].join("\n");

  // If Resend is configured, actually deliver the lead. Otherwise, log it so
  // the flow works in development and before keys are added.
  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: lead.email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error("Resend error:", res.status, detail);
        return NextResponse.json(
          { ok: false, error: "We couldn't send that just now. Please email us directly." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("Lead delivery failed:", err);
      return NextResponse.json(
        { ok: false, error: "We couldn't send that just now. Please email us directly." },
        { status: 502 },
      );
    }
  } else {
    console.info("[lead] (no RESEND_API_KEY set) —\n" + text);
  }

  return NextResponse.json({ ok: true });
}
