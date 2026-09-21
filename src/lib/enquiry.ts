import { locations } from '@/data/site';
import { services } from '@/data/services';

/**
 * Shared shape and validation for the enquiry form.
 *
 * The same rules run in the browser (for immediate feedback) and again on the
 * server, which is the only copy that is trusted.
 */

export const enquiryTypes = [
  'New appointment',
  'Existing appointment',
  'Test results',
  'Referral question',
  'General enquiry',
] as const;

export type EnquiryType = (typeof enquiryTypes)[number];

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  location: string;
  enquiryType: string;
  service: string;
  message: string;
  consent: boolean;
  /** Honeypot: must stay empty. Never shown to real users. */
  company?: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryPayload, string>>;

const MAX = { name: 120, email: 160, phone: 40, message: 4000, service: 120 } as const;

/** Deliberately permissive: enough to catch typos, not to reject valid addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Australian numbers, allowing spaces, brackets, hyphens and +61. */
const PHONE_RE = /^[+()\d][\d\s()+-]{5,}$/;

const locationSlugs = new Set(locations.map((l) => l.slug));
const serviceNames = new Set<string>(services.map((s) => s.name));

export function validateEnquiry(input: Partial<EnquiryPayload>): {
  errors: EnquiryErrors;
  value: EnquiryPayload;
} {
  const errors: EnquiryErrors = {};

  const name = String(input.name ?? '').trim();
  const email = String(input.email ?? '').trim();
  const phone = String(input.phone ?? '').trim();
  const location = String(input.location ?? '').trim();
  const enquiryType = String(input.enquiryType ?? '').trim();
  const service = String(input.service ?? '').trim();
  const message = String(input.message ?? '').trim();
  const consent = Boolean(input.consent);
  const company = String(input.company ?? '').trim();

  if (name.length < 2) errors.name = 'Please enter your full name.';
  else if (name.length > MAX.name) errors.name = 'Please shorten your name.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (email.length > MAX.email || !EMAIL_RE.test(email))
    errors.email = 'Please enter a valid email address.';

  if (!phone) errors.phone = 'Please enter a contact phone number.';
  else if (phone.length > MAX.phone || !PHONE_RE.test(phone))
    errors.phone = 'Please enter a valid phone number.';

  if (!location) errors.location = 'Please choose which rooms you would like to attend.';
  else if (!locationSlugs.has(location)) errors.location = 'Please choose a valid location.';

  if (!enquiryType) errors.enquiryType = 'Please choose the type of enquiry.';
  else if (!enquiryTypes.includes(enquiryType as EnquiryType))
    errors.enquiryType = 'Please choose a valid enquiry type.';

  if (service && service !== 'Not sure' && !serviceNames.has(service))
    errors.service = 'Please choose a valid service.';

  if (message.length < 10) errors.message = 'Please tell us a little more (at least 10 characters).';
  else if (message.length > MAX.message) errors.message = 'Please shorten your message.';

  if (!consent) errors.consent = 'Please confirm you agree to us contacting you about this enquiry.';

  return {
    errors,
    value: { name, email, phone, location, enquiryType, service, message, consent, company },
  };
}

/**
 * Strips characters that could be used to inject extra headers into the email,
 * and caps the length, before any value is interpolated into a message.
 */
export function sanitiseHeaderValue(value: string, max = 160): string {
  return value.replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim().slice(0, max);
}

/** Escapes a value for safe inclusion in the HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
