import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { LocationCard } from '@/components/contact/LocationCard';
import { locations } from '@/data/site';

export function Locations() {
  return (
    <section className="bg-ink-50 py-20 sm:py-24 lg:py-28" aria-labelledby="locations-heading">
      <Container size="wide">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] font-semibold tracking-[0.16em] text-crimson-600 uppercase">
            Our Locations
          </p>
          <h2 id="locations-heading" className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
            Specialist care, conveniently located
          </h2>
          <span aria-hidden="true" className="mx-auto mt-6 block h-0.5 w-14 bg-crimson-600" />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {locations.map((location, i) => (
            <Reveal key={location.slug} delay={i * 90} className="flex">
              <LocationCard location={location} className="w-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
