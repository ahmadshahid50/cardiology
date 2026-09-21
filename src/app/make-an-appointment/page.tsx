import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { JsonLd } from '@/components/ui/JsonLd';
import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { LocationCard } from '@/components/contact/LocationCard';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { patientJourney } from '@/data/patient-information';
import { locations, openingHours, telHref } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Make an Appointment',
  description:
    'Request an appointment with a cardiologist at Drummoyne Advanced Cardiology or Southern Highlands Heart Centre in Bowral. Call (02) 9819 7011 or (02) 4862 1855, or send an enquiry.',
  path: '/make-an-appointment',
});

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Make an Appointment', href: '/make-an-appointment' },
];

const bringItems = [
  'Your referral from your GP or specialist',
  'Your Medicare card and any private health fund details',
  'A list of your current medications',
  'Any previous test results, scans or reports',
];

export default function MakeAnAppointmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Appointments"
        title="Make an appointment"
        intro="Call the rooms closest to you, or send an enquiry and our reception team will be in touch during opening hours."
        crumbs={crumbs}
      />

      {/* Call the rooms directly */}
      <section className="border-b border-ink-100 bg-ink-50 py-12 sm:py-14" aria-labelledby="call-heading">
        <Container size="wide">
          <h2 id="call-heading" className="text-center font-serif text-2xl font-semibold text-ink-900">
            The quickest way to book is to call us
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[1.0625rem] text-ink-600">
            {openingHours.days}, {openingHours.hours}
          </p>

          <ul className="mx-auto mt-9 grid max-w-3xl gap-5 sm:grid-cols-2">
            {locations.map((location) => (
              <li
                key={location.slug}
                className="rounded-lg border border-ink-100 bg-white p-6 text-center shadow-subtle"
              >
                <p className="font-serif text-lg font-semibold text-ink-900">{location.name}</p>
                <p className="mt-1 text-sm text-ink-500">{location.addressLines.join(', ')}</p>
                <div className="mt-4 space-y-2">
                  {location.phones.map((phone) => (
                    <a
                      key={phone}
                      href={telHref(phone)}
                      className="flex items-center justify-center gap-2.5 rounded-md border border-ink-200 px-4 py-3 font-serif text-lg font-semibold text-ink-900 transition-colors hover:border-crimson-600 hover:bg-crimson-50 hover:text-crimson-700"
                    >
                      <Icon name="phone" size={18} className="text-crimson-600" />
                      {phone}
                    </a>
                  ))}
                </div>
                <a
                  href={`mailto:${location.email}`}
                  className="mt-3 inline-block rounded-sm text-[0.9375rem] break-all text-ink-600 underline-offset-4 hover:text-crimson-700 hover:underline"
                >
                  {location.email}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Request form */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="request-heading">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading
                  id="request-heading"
                  eyebrow="Appointment request"
                  title="Request an appointment online"
                  description={
                    <p>
                      Send us your details and we will contact you to confirm a time. Requests are
                      not automatically confirmed — an appointment is only booked once our reception
                      team has been in touch.
                    </p>
                  }
                />

                <div className="mt-8 rounded-lg border border-ink-100 bg-ink-50 p-6">
                  <h3 className="font-serif text-lg font-semibold text-ink-900">
                    What to bring to your appointment
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {bringItems.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-ink-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-600">
                          <Icon name="check" size={12} strokeWidth={2.5} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-ink-500">
                    If you are unsure whether you need a referral, please call us and we will let you
                    know.
                  </p>
                </div>

                <div className="mt-6 rounded-lg border border-crimson-200 bg-crimson-50 p-5">
                  <p className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-crimson-900">
                    <Icon name="shield" size={19} className="mt-0.5 shrink-0" />
                    <span>
                      This form is not monitored outside opening hours. If you are experiencing chest
                      pain or other urgent symptoms, call{' '}
                      <strong className="font-semibold">000</strong> or attend your nearest emergency
                      department.
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

      {/* What happens next */}
      <section className="bg-ink-50 py-16 sm:py-20" aria-labelledby="next-steps-heading">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              id="next-steps-heading"
              align="center"
              eyebrow="What happens next"
              title="From enquiry to follow-up"
            />
          </Reveal>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {patientJourney.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 70} className="h-full">
                  <div className="flex h-full flex-col rounded-lg border border-ink-100 bg-white p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-crimson-200 bg-crimson-50 font-serif text-lg font-semibold text-crimson-700">
                      {i + 1}
                    </span>
                    <h3 className="mt-5 font-serif text-lg font-semibold text-ink-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Locations */}
      <section className="py-16 sm:py-20" aria-labelledby="appointment-locations-heading">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              id="appointment-locations-heading"
              align="center"
              eyebrow="Where to find us"
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

      <JsonLd data={breadcrumbSchema(crumbs)} id="schema-breadcrumb-appointment" />
    </>
  );
}
