import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { ServiceCard } from '@/components/services/ServiceCard';
import { featuredServiceSlugs, getService } from '@/data/services';

const featured = featuredServiceSlugs
  .map((slug) => getService(slug))
  .filter((service): service is NonNullable<typeof service> => Boolean(service));

export function Services() {
  return (
    <section className="bg-ink-50 py-20 sm:py-24 lg:py-28" aria-labelledby="services-heading">
      <Container size="wide">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] font-semibold tracking-[0.16em] text-crimson-600 uppercase">
            Our Services
          </p>
          <h2 id="services-heading" className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
            Comprehensive cardiology care
          </h2>
          <span aria-hidden="true" className="mx-auto mt-6 block h-0.5 w-14 bg-crimson-600" />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => (
            <li key={service.slug} className="flex">
              <Reveal delay={i * 60} className="flex w-full">
                <ServiceCard service={service} className="w-full" />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 text-center">
          <Button href="/services" variant="secondary" size="lg">
            View all services
            <Icon name="arrow-right" size={18} />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
