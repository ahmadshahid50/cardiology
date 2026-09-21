import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LocationCard } from '@/components/contact/LocationCard';
import { locations } from '@/data/site';

export function Locations() {
  return (
    <section className="py-18 sm:py-22 lg:py-26" aria-labelledby="locations-heading">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            id="locations-heading"
            align="center"
            eyebrow="Our rooms"
            title="Two locations across New South Wales"
            description={
              <p>
                Consulting rooms in Drummoyne, in Sydney&rsquo;s inner west, and in Bowral in the
                Southern Highlands.
              </p>
            }
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
  );
}
