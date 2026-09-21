/**
 * Shared domain types for the Advanced Cardiology site.
 *
 * All content flowing through these types is migrated from the practice's
 * existing website. Medical facts, credentials and contact details must not be
 * edited without client sign-off — see CONTENT-AUDIT.md.
 */

export type Slug = string;

/** A physical consulting location operated by the practice. */
export interface Location {
  slug: Slug;
  /** Trading name used for this site, e.g. "Drummoyne Advanced Cardiology". */
  name: string;
  /** Short label for compact UI (tabs, header strip). */
  shortName: string;
  suburb: string;
  addressLines: string[];
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  phones: string[];
  email: string;
  /** Google Maps embed URL captured from the existing site. */
  mapEmbedUrl: string;
  /** Link that opens the location in Google Maps. */
  mapLinkUrl: string;
  geo: { latitude: number; longitude: number };
}

export interface OpeningHours {
  label: string;
  days: string;
  hours: string;
  /** schema.org dayOfWeek values. */
  schemaDays: string[];
  opens: string;
  closes: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/** A diagnostic test, procedure or consultation offered by the practice. */
export interface Service {
  slug: Slug;
  name: string;
  /** One-line summary used on cards and in listings. */
  summary: string;
  /** Longer factual description. Migrated or factually neutral. */
  description: string;
  /** Grouping used for filtering and page structure. */
  category: ServiceCategory;
  icon: IconName;
  image?: { src: string; alt: string };
  /** True when the source site provided no description for this service. */
  needsClientCopy?: boolean;
}

export type ServiceCategory =
  | 'consultation'
  | 'diagnostic'
  | 'monitoring'
  | 'interventional'
  | 'electrophysiology';

export interface ServiceGroup {
  category: ServiceCategory;
  title: string;
  description: string;
}

export interface Doctor {
  slug: Slug;
  name: string;
  /** Post-nominals exactly as published by the practice. */
  qualifications: string;
  title: string;
  /** Appointments, lectureships and hospital affiliations, verbatim. */
  appointments: string[];
  /** Full biography, migrated from the existing About page. */
  bio: string[];
  /** Short pull-quote style summary for cards, drawn from the bio. */
  focus: string;
  areasOfPractice: string[];
  image: { src: string; alt: string };
}

export interface Faq {
  question: string;
  answer: string;
}

export interface JourneyStep {
  title: string;
  description: string;
}

export interface PatientInfoSection {
  id: string;
  heading: string;
  body: string[];
  subsections?: { heading: string; body: string[] }[];
}

export type IconName =
  | 'stethoscope'
  | 'ecg'
  | 'treadmill'
  | 'ultrasound'
  | 'ultrasound-stress'
  | 'blood-pressure'
  | 'holter'
  | 'artery'
  | 'device-check'
  | 'pacemaker'
  | 'defibrillator'
  | 'electrophysiology'
  | 'ablation'
  | 'heart-monitor'
  | 'patch'
  | 'calendar'
  | 'phone'
  | 'mail'
  | 'clock'
  | 'pin'
  | 'shield'
  | 'users'
  | 'clipboard';
