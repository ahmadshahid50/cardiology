import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { ServiceCard } from '@/components/services/ServiceCard';
import { featuredServiceSlugs, getService } from '@/data/services';

const featured = featuredServiceSlugs
  .map((slug) => getService(slug))
  .filter((service): service is NonNullable<typeof service> => Boolean(service));

export function Services() {
  return (
    <section className="bg-frost-50 py-16 sm:py-20" aria-labelledby="services-heading">
      <Container size="wide">
        <SectionIntro id="services-heading" eyebrow="Our Services" title="Our Cardiology Services" />

        <ul className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => (
            <li key={service.slug} className="flex">
              <Reveal delay={i * 60} className="flex w-full">
                <ServiceCard service={service} className="w-full" />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-sm text-[0.9375rem] font-semibold text-ink-900 underline decoration-ink-300 underline-offset-[6px] transition-colors hover:text-crimson-600 hover:decoration-crimson-400"
          >
            View all services
            <Icon name="arrow-right" size={17} />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
