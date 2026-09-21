import { NextResponse } from 'next/server';
import { escapeHtml, sanitiseHeaderValue, validateEnquiry } from '@/lib/enquiry';
import { locations } from '@/data/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Enquiry endpoint.
 *
 * Validates the submission server-side, then delivers it by email. Delivery is
 * configured entirely through environment variables so no credential is ever
 * present in the bundle:
 *
 *   RESEND_API_KEY   API key for resend.com (the transport used here)
 *   ENQUIRY_FROM     verified sender, e.g. "Website <website@yourdomain.com.au>"
 *   ENQUIRY_TO       optional override; defaults to the chosen location's inbox
 *
 * With no key configured the endpoint reports that online enquiry is
 * unavailable and the UI falls back to the phone numbers, rather than silently
 * discarding a patient's message.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  /* Keep the map from growing without bound on a long-lived instance. */
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return (forwarded?.split(',')[0] ?? request.headers.get('x-real-ip') ?? 'unknown').trim();
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, message: 'Too many enquiries have been sent from this connection. Please call us instead.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  const { errors, value } = validateEnquiry(body as Record<string, unknown>);

  /* Honeypot — silently accept so a bot gets no signal, but send nothing. */
  if (value.company) {
    return NextResponse.json({ ok: true });
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const location = locations.find((l) => l.slug === value.location);
  if (!location) {
    return NextResponse.json({ ok: false, message: 'Invalid location.' }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  const to = process.env.ENQUIRY_TO ?? location.email;

  if (!apiKey || !from) {
    console.warn('[enquiry] RESEND_API_KEY or ENQUIRY_FROM is not configured; enquiry not sent.');
    return NextResponse.json(
      {
        ok: false,
        code: 'not_configured',
        message:
          'Online enquiries are not available at the moment. Please call us and our reception team will help you.',
      },
      { status: 503 }
    );
  }

  const safe = {
    name: sanitiseHeaderValue(value.name),
    email: sanitiseHeaderValue(value.email),
    phone: sanitiseHeaderValue(value.phone, 40),
    enquiryType: sanitiseHeaderValue(value.enquiryType, 60),
    service: value.service ? sanitiseHeaderValue(value.service, 120) : 'Not specified',
  };

  const rows: [string, string][] = [
    ['Name', safe.name],
    ['Email', safe.email],
    ['Phone', safe.phone],
    ['Preferred rooms', location.name],
    ['Enquiry type', safe.enquiryType],
    ['Service of interest', safe.service],
  ];

  const html = `
    <h2 style="font:600 18px system-ui,sans-serif;color:#13263a">Website enquiry — ${escapeHtml(location.name)}</h2>
    <table style="font:14px system-ui,sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([label, val]) =>
            `<tr><td style="padding:6px 16px 6px 0;color:#5a7387">${escapeHtml(label)}</td><td style="padding:6px 0;color:#13263a"><strong>${escapeHtml(val)}</strong></td></tr>`
        )
        .join('')}
    </table>
    <h3 style="font:600 15px system-ui,sans-serif;color:#13263a;margin-top:24px">Message</h3>
    <p style="font:14px/1.6 system-ui,sans-serif;color:#2a475e;white-space:pre-wrap">${escapeHtml(value.message)}</p>
    <p style="font:12px system-ui,sans-serif;color:#8194a4;margin-top:28px">
      Sent from the Advanced Cardiology website. The patient consented to being contacted about this enquiry.
    </p>
  `;

  const text = [
    `Website enquiry — ${location.name}`,
    '',
    ...rows.map(([label, val]) => `${label}: ${val}`),
    '',
    'Message:',
    value.message,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: safe.email,
        subject: `Website enquiry — ${safe.enquiryType} — ${safe.name}`,
        html,
        text,
      }),
    });

    if (!response.ok) {
      /* Never surface the provider's response to the browser. */
      console.error('[enquiry] Delivery failed:', response.status, await response.text());
      return NextResponse.json(
        {
          ok: false,
          message:
            'We could not send your enquiry just now. Please call us and our reception team will help you.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[enquiry] Unexpected error:', error);
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not send your enquiry just now. Please call us and our reception team will help you.',
      },
      { status: 502 }
    );
  }
}
