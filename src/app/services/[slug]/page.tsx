import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { CallToAction } from '@/components/home/CallToAction';
import { absoluteUrl, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { getService, serviceGroups, services } from '@/data/services';
import { locations, openingHours, telHref } from '@/data/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: 'Service not found', robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: service.name,
    description: `${service.summary} Available at Drummoyne Advanced Cardiology and Southern Highlands Heart Centre.`,
    path: `/services/${service.slug}`,
    ...(service.image ? { image: service.image.src } : {}),
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const group = serviceGroups.find((g) => g.category === service.category);
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug);

  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.name, href: `/services/${service.slug}` },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalTest',
    name: service.name,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    ...(service.image ? { image: absoluteUrl(service.image.src) } : {}),
    availableAtOrFrom: locations.map((location) => ({ '@id': absoluteUrl(`/contact#${location.slug}`) })),
  };

  return (
    <>
      <div className="border-b border-ink-100 bg-frost-50">
        <Container size="wide" className="py-10 lg:py-14">
          <Breadcrumbs items={crumbs} />

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="rule-crimson text-[0.8125rem] font-semibold tracking-[0.2em] text-crimson-500 uppercase">
                {group?.title ?? 'Our services'}
              </p>
              <h1 className="mt-5 text-4xl sm:text-5xl">{service.name}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                {service.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/make-an-appointment" size="lg">
                  <Icon name="calendar" size={18} />
                  Request an appointment
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  All services
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              {service.image ? (
                <div className="overflow-hidden rounded-lg shadow-card">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    width={900}
                    height={600}
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-3/2 items-center justify-center rounded-lg border border-ink-200 bg-white">
                  <Icon name={service.icon} size={92} className="text-crimson-500/25" strokeWidth={1} />
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>

      <section className="py-16 sm:py-20" aria-labelledby="about-service-heading">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <h2 id="about-service-heading" className="text-2xl sm:text-3xl">
                About this {service.category === 'consultation' ? 'consultation' : 'service'}
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-600">
                {service.description}
              </p>

              <div className="mt-10 rounded-lg border border-ink-100 bg-frost-50 p-6 sm:p-7">
                <h3 className="font-serif text-lg font-semibold text-ink-900">
                  Preparing for your appointment
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  Requirements vary between tests. When you book, our reception team will confirm
                  what to bring, whether you need a referral, and any preparation required. Please
                  bring any previous test results with you.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {locations.map((location) => (
                    <p key={location.slug} className="text-[0.9375rem]">
                      <span className="text-ink-500">{location.shortName}: </span>
                      <a
                        href={telHref(location.phones[0]!)}
                        className="rounded-sm font-semibold text-ink-900 underline-offset-4 hover:text-crimson-700 hover:underline"
                      >
                        {location.phones[0]}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-lg border border-ink-100 bg-white p-6 shadow-subtle sm:p-7">
                <h2 className="font-serif text-lg font-semibold text-ink-900">
                  Where this is available
                </h2>
                <ul className="mt-5 space-y-5">
                  {locations.map((location) => (
                    <li key={location.slug}>
                      <p className="font-medium text-ink-900">{location.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">
                        {location.addressLines.join(', ')}
                      </p>
                      <a
                        href={telHref(location.phones[0]!)}
                        className="mt-1.5 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-crimson-700 underline-offset-4 hover:underline"
                      >
                        <Icon name="phone" size={15} />
                        {location.phones[0]}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-start gap-2.5 border-t border-ink-100 pt-5 text-sm text-ink-600">
                  <Icon name="clock" size={16} className="mt-0.5 shrink-0 text-crimson-500" />
                  <span>
                    {openingHours.days}
                    <span className="mt-0.5 block font-medium text-ink-900">
                      {openingHours.hours}
                    </span>
                  </span>
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-frost-50 py-16 sm:py-20" aria-labelledby="related-services-heading">
          <Container size="wide">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-services-heading" className="text-2xl sm:text-3xl">
                Related services
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 rounded-sm font-semibold text-crimson-700 underline-offset-4 hover:underline"
              >
                All services
                <Icon name="arrow-right" size={17} />
              </Link>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full items-start gap-4 rounded-lg border border-ink-100 bg-white p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-crimson-50 text-crimson-500">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-serif font-semibold text-ink-900">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-600">
                        {item.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CallToAction />
      <JsonLd data={serviceSchema} id={`schema-service-${service.slug}`} />
      <JsonLd data={breadcrumbSchema(crumbs)} id={`schema-breadcrumb-${service.slug}`} />
    </>
  );
}
