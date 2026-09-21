import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/services/ServiceCard';
import { featuredServiceSlugs, getService, services } from '@/data/services';

const featured = featuredServiceSlugs
  .map((slug) => getService(slug))
  .filter((service): service is NonNullable<typeof service> => Boolean(service));

const featuredSlugs = new Set<string>(featuredServiceSlugs);
const remaining = services.filter((service) => !featuredSlugs.has(service.slug));

export function Services() {
  return (
    <section className="bg-ink-50 py-18 sm:py-22 lg:py-26" aria-labelledby="services-heading">
      <Container size="wide">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="services-heading"
            eyebrow="Our services"
            title="Cardiac assessment, diagnostics and procedures"
            description={
              <p>
                We offer a full range of cardiac investigations and procedures across our Drummoyne
                and Bowral rooms.
              </p>
            }
          />
          <Button href="/services" variant="secondary" className="shrink-0 self-start sm:self-auto">
            View all services
            <Icon name="arrow-right" size={17} />
          </Button>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => (
            <li key={service.slug} className="flex">
              <Reveal delay={i * 70} className="flex w-full">
                <ServiceCard service={service} className="w-full" />
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Remaining services as a compact, scannable list. */}
        <Reveal className="mt-10 rounded-lg border border-ink-200 bg-white p-6 sm:p-8">
          <h3 className="font-serif text-lg font-semibold text-ink-900">
            Also available at our rooms
          </h3>
          <ul className="mt-5 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {remaining.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-center gap-3 rounded-md py-2.5 transition-colors"
                >
                  <Icon
                    name={service.icon}
                    size={19}
                    className="shrink-0 text-crimson-600 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-[0.9375rem] text-ink-700 underline-offset-4 group-hover:text-ink-900 group-hover:underline">
                    {service.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
