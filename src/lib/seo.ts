import type { Metadata } from 'next';
import { locations, openingHours, site } from '@/data/site';

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, site.url).toString();
}

interface PageMetaInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services". */
  path: string;
  /** Site-relative path to the social sharing image. */
  image?: string;
  noIndex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  image = '/images/hero/cardiologist-holding-heart-hero.webp',
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: site.legalName,
      locale: site.locale,
      title,
      description,
      url,
      images: [{ url: absoluteUrl(image), width: 1920, height: 777, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(image)],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * schema.org graph describing the practice.
 *
 * Every value is taken from the practice's published contact details, opening
 * hours and clinician list. Nothing is inferred: no ratings, awards,
 * accreditations or patient numbers are declared, because the source site
 * provides none.
 */
export function organizationSchema() {
  const physicians = [
    {
      '@type': 'Physician',
      '@id': absoluteUrl('/cardiologists/dr-imran-kassam#physician'),
      name: 'Dr Imran Kassam',
      medicalSpecialty: 'Cardiovascular',
      url: absoluteUrl('/cardiologists/dr-imran-kassam'),
    },
    {
      '@type': 'Physician',
      '@id': absoluteUrl('/cardiologists/dr-probal-roy#physician'),
      name: 'Dr Probal Roy',
      medicalSpecialty: 'Cardiovascular',
      url: absoluteUrl('/cardiologists/dr-probal-roy'),
    },
  ];

  const clinics = locations.map((location) => ({
    '@type': ['MedicalClinic', 'MedicalBusiness'],
    '@id': absoluteUrl(`/contact#${location.slug}`),
    name: location.name,
    url: absoluteUrl('/contact'),
    telephone: location.phones[0],
    email: location.email,
    medicalSpecialty: 'Cardiovascular',
    parentOrganization: { '@id': absoluteUrl('/#organization') },
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      addressLocality: location.locality,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: openingHours.schemaDays,
        opens: openingHours.opens,
        closes: openingHours.closes,
      },
    ],
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['MedicalOrganization', 'MedicalBusiness'],
        '@id': absoluteUrl('/#organization'),
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        logo: absoluteUrl('/images/branding/advanced-cardiology-logo.png'),
        image: absoluteUrl('/images/hero/cardiologist-holding-heart-hero.webp'),
        description: site.shortDescription,
        medicalSpecialty: 'Cardiovascular',
        employee: physicians,
        location: clinics.map((clinic) => ({ '@id': clinic['@id'] })),
        contactPoint: locations.map((location) => ({
          '@type': 'ContactPoint',
          contactType: 'Reception',
          name: location.name,
          telephone: location.phones[0],
          email: location.email,
          areaServed: 'AU',
          availableLanguage: 'English',
        })),
      },
      ...clinics,
      ...physicians,
      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#website'),
        url: site.url,
        name: site.legalName,
        publisher: { '@id': absoluteUrl('/#organization') },
        inLanguage: 'en-AU',
      },
    ],
  };
}

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
