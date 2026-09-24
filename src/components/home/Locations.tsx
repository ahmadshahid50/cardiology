import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { LocationCard } from '@/components/contact/LocationCard';
import { locations } from '@/data/site';

export function Locations() {
  return (
    <section className="bg-frost-50 pb-16 sm:pb-20" aria-labelledby="locations-heading">
      <Container size="wide">
        <SectionIntro
          id="locations-heading"
          eyebrow="Our Locations"
          title="Two Convenient Locations"
        />

        <div className="mt-11 grid gap-6 lg:grid-cols-2">
          {locations.map((location, i) => (
            <Reveal key={location.slug} delay={i * 90} className="flex">
              <LocationCard location={location} layout="row" className="w-full" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
