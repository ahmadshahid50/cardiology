import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { CallToAction } from '@/components/home/CallToAction';
import { absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { doctors, getDoctor } from '@/data/doctors';
import { locations, telHref } from '@/data/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return doctors.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctor(slug);

  if (!doctor) {
    return { title: 'Cardiologist not found', robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: `${doctor.name} — ${doctor.title}`,
    description: `${doctor.name}, ${doctor.qualifications}. ${doctor.title} at Drummoyne Advanced Cardiology and Southern Highlands Heart Centre.`,
    path: `/cardiologists/${doctor.slug}`,
    image: doctor.image.src,
  });
}

export default async function DoctorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const doctor = getDoctor(slug);

  if (!doctor) notFound();

  const others = doctors.filter((d) => d.slug !== doctor.slug);
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Our Cardiologists', href: '/cardiologists' },
    { label: doctor.name, href: `/cardiologists/${doctor.slug}` },
  ];

  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    honorificSuffix: doctor.qualifications,
    jobTitle: doctor.title,
    medicalSpecialty: 'Cardiovascular',
    url: absoluteUrl(`/cardiologists/${doctor.slug}`),
    image: absoluteUrl(doctor.image.src),
    worksFor: { '@id': absoluteUrl('/#organization') },
    knowsAbout: doctor.areasOfPractice,
  };

  return (
    <>
      {/* Profile header */}
      <div className="border-b border-ink-100 bg-frost-50">
        <Container size="wide" className="py-10 lg:py-14">
          <Breadcrumbs items={crumbs} />

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="overflow-hidden rounded-lg border border-ink-100 bg-white shadow-card">
                <div className="relative aspect-4/5 bg-ink-100">
                  <Image
                    src={doctor.image.src}
                    alt={doctor.image.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 300px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              <p className="rule-crimson text-[0.8125rem] font-semibold tracking-[0.2em] text-crimson-500 uppercase">
                {doctor.title}
              </p>
              <h1 className="mt-5 text-4xl sm:text-5xl">{doctor.name}</h1>
              <p className="mt-3 font-sans text-[0.9375rem] font-semibold tracking-[0.06em] text-ink-500 uppercase">
                {doctor.qualifications}
              </p>

              <ul className="mt-7 space-y-2.5 border-t border-ink-200 pt-7">
                {doctor.appointments.map((appointment) => (
                  <li key={appointment} className="flex items-start gap-3 text-ink-700">
                    <Icon
                      name="check"
                      size={15}
                      strokeWidth={2.25}
                      className="mt-1.5 shrink-0 text-crimson-500"
                    />
                    {appointment}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/make-an-appointment" size="lg">
                  <Icon name="calendar" size={18} />
                  Request an appointment
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Contact our rooms
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Biography */}
      <section className="py-16 sm:py-20" aria-labelledby="biography-heading">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <h2 id="biography-heading" className="text-2xl sm:text-3xl">
                Biography
              </h2>
              <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-ink-600">
                {doctor.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-subtle sm:p-7">
                <h2 className="font-serif text-lg font-semibold text-ink-900">Areas of practice</h2>
                <ul className="mt-5 space-y-3">
                  {doctor.areasOfPractice.map((area) => (
                    <li key={area} className="flex items-start gap-3 text-[0.9375rem] text-ink-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-500">
                        <Icon name="check" size={12} strokeWidth={2.5} />
                      </span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-lg border border-ink-100 bg-frost-50 p-6 sm:p-7">
                <h2 className="font-serif text-lg font-semibold text-ink-900">
                  Arrange an appointment
                </h2>
                <ul className="mt-5 space-y-4">
                  {locations.map((location) => (
                    <li key={location.slug}>
                      <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-ink-500 uppercase">
                        {location.shortName}
                      </p>
                      <a
                        href={telHref(location.phones[0]!)}
                        className="mt-1 inline-flex items-center gap-2 rounded-sm font-medium text-ink-900 underline-offset-4 hover:text-crimson-700 hover:underline"
                      >
                        <Icon name="phone" size={16} className="text-crimson-500" />
                        {location.phones[0]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Other cardiologists */}
      {others.length > 0 && (
        <section className="bg-frost-50 py-16 sm:py-20" aria-labelledby="other-cardiologists-heading">
          <Container size="wide">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="other-cardiologists-heading" className="text-2xl sm:text-3xl">
                Also at our practice
              </h2>
              <Link
                href="/cardiologists"
                className="inline-flex items-center gap-1.5 rounded-sm font-semibold text-crimson-700 underline-offset-4 hover:underline"
              >
                All cardiologists
                <Icon name="arrow-right" size={17} />
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:max-w-2xl">
              {others.map((other) => (
                <li key={other.slug} className="flex">
                  <DoctorCard doctor={other} className="w-full" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CallToAction />
      <JsonLd data={physicianSchema} id={`schema-physician-${doctor.slug}`} />
      <JsonLd data={breadcrumbSchema(crumbs)} id={`schema-breadcrumb-${doctor.slug}`} />
    </>
  );
}
