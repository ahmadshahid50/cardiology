import type { Location, NavItem, OpeningHours } from '@/lib/types';

/**
 * Practice identity, contact details and navigation.
 *
 * Every phone number, address and email below is migrated verbatim from the
 * practice's existing website (header strip, contact page and footer).
 */

export const site = {
  name: 'Advanced Cardiology',
  legalName: 'Drummoyne Advanced Cardiology and Southern Highlands Heart Centre',
  shortDescription:
    'At Advanced Cardiology and Southern Highlands Heart Centre we have expertise in each of the major disciplines of cardiology. Our cardiologists are affiliated with public and private hospitals.',
  tagline:
    'Our goal is to provide patient focused high quality clinical care with warmth and compassion.',
  /** Update to the production domain before launch. */
  url: 'https://www.advancedcardiology.com.au',
  locale: 'en_AU',
} as const;

export const openingHours: OpeningHours = {
  label: 'Working hours',
  days: 'Monday to Friday',
  hours: '8:30am – 5:00pm',
  schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  opens: '08:30',
  closes: '17:00',
};

export const locations: Location[] = [
  {
    slug: 'drummoyne',
    name: 'Drummoyne Advanced Cardiology',
    shortName: 'Drummoyne',
    suburb: 'Drummoyne',
    addressLines: ['L1 169 Victoria Rd', 'Drummoyne, NSW 2047'],
    streetAddress: 'L1 169 Victoria Rd',
    locality: 'Drummoyne',
    region: 'NSW',
    postalCode: '2047',
    country: 'AU',
    phones: ['(02) 9819 7011', '(02) 9181 5777'],
    email: 'info@advancedcardiology.com.au',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.454264383536!2d151.15262837555156!3d-33.852181973233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12af93abfb7859%3A0x94c7b1b1c25da9bc!2sl1%2F169%20Victoria%20Rd%2C%20Drummoyne%20NSW%202047%2C%20Australia!5e0!3m2!1sen!2s!4v1779248819009!5m2!1sen!2s',
    mapLinkUrl:
      'https://www.google.com/maps/search/?api=1&query=L1%20169%20Victoria%20Rd%2C%20Drummoyne%20NSW%202047%2C%20Australia',
    geo: { latitude: -33.852182, longitude: 151.152628 },
  },
  {
    slug: 'bowral',
    name: 'Southern Highlands Heart Centre',
    shortName: 'Bowral',
    suburb: 'Bowral',
    addressLines: ['Suite 3, 2A Walker St', 'Bowral, NSW 2576'],
    streetAddress: 'Suite 3, 2A Walker St',
    locality: 'Bowral',
    region: 'NSW',
    postalCode: '2576',
    country: 'AU',
    phones: ['(02) 4862 1855', '(02) 4862 1899'],
    email: 'reception@theshhc.com.au',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3288.769236566715!2d150.4132063755799!3d-34.48337787299768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b13a2bc443a9257%3A0xd2d9addd9a71a580!2sUnit%203%2F2A%20Walker%20St%2C%20Bowral%20NSW%202576%2C%20Australia!5e0!3m2!1sen!2s!4v1779248858439!5m2!1sen!2s',
    mapLinkUrl:
      'https://www.google.com/maps/search/?api=1&query=Suite%203%2C%202A%20Walker%20St%2C%20Bowral%20NSW%202576%2C%20Australia',
    geo: { latitude: -34.483378, longitude: 150.413206 },
  },
];

/** Strips formatting so a phone number can be used in a `tel:` href. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  { label: 'Our Cardiologists', href: '/cardiologists' },
  { label: 'Services', href: '/services' },
  { label: 'Patient Information', href: '/patient-information' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Practice',
    items: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about-us' },
      { label: 'Our Cardiologists', href: '/cardiologists' },
      { label: 'Patient Information', href: '/patient-information' },
      { label: 'Make an Appointment', href: '/make-an-appointment' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];
