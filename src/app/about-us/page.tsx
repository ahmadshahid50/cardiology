import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { JsonLd } from '@/components/ui/JsonLd';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { PracticeValues } from '@/components/home/PracticeValues';
import { CallToAction } from '@/components/home/CallToAction';
import { LocationCard } from '@/components/contact/LocationCard';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { doctors } from '@/data/doctors';
import { locations } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description:
    'Drummoyne Advanced Cardiology and Southern Highlands Heart Centre have expertise in each of the major disciplines of cardiology. Our cardiologists are affiliated with public and private hospitals.',
  path: '/about-us',
});

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our practice"
        title="About Advanced Cardiology"
        intro="Patient focused, high quality clinical care delivered with warmth and compassion, across our Drummoyne and Bowral rooms."
        crumbs={crumbs}
      />

      {/* Practice overview */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="overview-heading">
        <Container size="wide">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <SectionHeading
                id="overview-heading"
                eyebrow="Who we are?"
                title="Comprehensive cardiac care across two practices"
              />

              <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-ink-600">
                <p>
                  Our goal is to provide patient focused high quality clinical care with warmth and
                  compassion.
                </p>
                <p>
                  At Drummoyne Advanced Cardiology and Southern Highlands Heart Centre we have
                  expertise in each of the major disciplines of cardiology. Our cardiologists are
                  affiliated with public and private hospitals.
                </p>
                <p>
                  With on-site state of the art facilities and friendly staff we strive to make your
                  experience as pleasant as possible. We look forward to providing you comprehensive
                  cardiac care.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/services" size="lg">
                  Our services
                  <Icon name="arrow-right" size={18} />
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Contact the practice
                </Button>
              </div>
            </Reveal>

            <Reveal delay={90} className="lg:col-span-5">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/images/general/cardiology-practice-care.webp"
                  alt="Cardiologist reviewing a patient's cardiac assessment"
                  width={978}
                  height={1150}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <PracticeValues />

      {/* Cardiologists */}
      <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="our-cardiologists-heading">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              id="our-cardiologists-heading"
              align="center"
              eyebrow="Our cardiologists"
              title="The specialists who will care for you"
              description={
                <p>
                  Both of our cardiologists hold hospital appointments and university teaching roles
                  alongside their work in our rooms.
                </p>
              }
            />
          </Reveal>

          <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 sm:gap-8">
            {doctors.map((doctor, i) => (
              <li key={doctor.slug} className="flex">
                <Reveal delay={i * 90} className="flex w-full">
                  <DoctorCard doctor={doctor} className="w-full" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Locations */}
      <section className="bg-frost-50 py-16 sm:py-20 lg:py-24" aria-labelledby="about-locations-heading">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              id="about-locations-heading"
              align="center"
              eyebrow="Where to find us"
              title="Our consulting rooms"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {locations.map((location, i) => (
              <Reveal key={location.slug} delay={i * 90} className="flex">
                <LocationCard location={location} className="w-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CallToAction />
      <JsonLd data={breadcrumbSchema(crumbs)} id="schema-breadcrumb-about" />
    </>
  );
}
