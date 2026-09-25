import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { JsonLd } from '@/components/ui/JsonLd';
import { LocationCard } from '@/components/contact/LocationCard';
import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { locations, openingHours, telHref } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Contact Drummoyne Advanced Cardiology on (02) 9819 7011 or Southern Highlands Heart Centre in Bowral on (02) 4862 1855. Addresses, opening hours, maps and enquiry form.',
  path: '/contact',
});

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact our practice"
        intro="Our reception team is available Monday to Friday, 8:30am to 5:00pm, at both our Drummoyne and Bowral rooms."
        crumbs={crumbs}
      />

      {/* Quick contact strip */}
      <section className="border-b border-ink-100 bg-frost-50" aria-label="Contact details at a glance">
        <Container size="wide">
          <ul className="grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <li key={location.slug} className="py-7 sm:pr-8">
                <p className="text-[0.8125rem] font-semibold tracking-[0.1em] text-ink-500 uppercase">
                  {location.name}
                </p>
                <div className="mt-2.5 space-y-1">
                  {location.phones.map((phone) => (
                    <a
                      key={phone}
                      href={telHref(phone)}
                      className="flex items-center gap-2.5 rounded-sm font-serif text-xl font-semibold text-ink-900 underline-offset-4 transition-colors hover:text-crimson-700 hover:underline"
                    >
                      <Icon name="phone" size={18} className="text-crimson-500" />
                      {phone}
                    </a>
                  ))}
                </div>
                <p className="flex items-center gap-2.5 rounded-sm font-serif text-xl font-semibold text-ink-900 underline-offset-4 transition-colors hover:text-crimson-700 hover:underline">
                  <Icon name="fax" size={18} className="shrink-0 text-crimson-500" />
                  <span>
                    {/* <span className="sr-only">Fax </span>
                    <span aria-hidden="true" className="font-medium">
                      Fax
                    </span>{' '} */}
                    {location.fax}
                  </span>
                </p>
                <a
                  href={`mailto:${location.email}`}
                  className="mt-2 inline-flex items-center gap-2.5 rounded-sm text-[0.9375rem] break-all text-ink-600 underline-offset-4 hover:text-crimson-700 hover:underline"
                >
                  <Icon name="mail" size={17} className="shrink-0 text-crimson-500" />
                  {location.email}
                </a>
              </li>
            ))}
            <li className="py-7 sm:col-span-2 lg:col-span-1">
              <p className="text-[0.8125rem] font-semibold tracking-[0.1em] text-ink-500 uppercase">
                Opening hours
              </p>
              <p className="mt-2.5 flex items-center gap-2.5 font-serif text-xl font-semibold text-ink-900">
                <Icon name="clock" size={18} className="text-crimson-500" />
                {openingHours.hours}
              </p>
              <p className="mt-2 text-[0.9375rem] text-ink-600">{openingHours.days}</p>
            </li>
          </ul>
        </Container>
      </section>

      {/* Enquiry form */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="enquiry-heading">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  id="enquiry-heading"
                  eyebrow="Send us a message"
                  title="Got a question or comment?"
                  description={
                    <p>
                      Complete the form and our reception team will respond during opening hours. For
                      anything urgent, please call us directly.
                    </p>
                  }
                />

                <div className="mt-8 rounded-lg border border-crimson-200 bg-crimson-50 p-5">
                  <p className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-crimson-900">
                    <Icon name="shield" size={19} className="mt-0.5 shrink-0" />
                    <span>
                      This form is not monitored outside opening hours and should not be used for
                      medical emergencies. If you are experiencing chest pain or other urgent
                      symptoms, call <strong className="font-semibold">000</strong> or attend your
                      nearest emergency department.
                    </span>
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={90} className="rounded-lg border border-ink-100 bg-white p-6 shadow-subtle sm:p-8">
                <EnquiryForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Locations with maps */}
      <section className="bg-frost-50 py-16 sm:py-20 lg:py-24" aria-labelledby="contact-locations-heading">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              id="contact-locations-heading"
              align="center"
              eyebrow="Find us"
              title="Our consulting rooms"
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {locations.map((location, i) => (
              <Reveal key={location.slug} delay={i * 90} className="flex">
                <LocationCard location={location} withMap className="w-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} id="schema-breadcrumb-contact" />
    </>
  );
}
