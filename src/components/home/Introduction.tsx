import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

export function Introduction() {
  return (
    <section className="py-20 sm:py-24 lg:py-28" aria-labelledby="introduction-heading">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/general/cardiac-care-technology.webp"
                alt="Cardiologist reviewing cardiac imaging"
                width={1060}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-6">
            <p className="rule-crimson text-[0.8125rem] font-semibold tracking-[0.16em] text-crimson-600 uppercase">
              Our Practice
            </p>

            <h2
              id="introduction-heading"
              className="mt-6 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem]"
            >
              Specialist cardiology care across two locations
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-ink-600">
              We have expertise in each of the major disciplines of cardiology, and our
              cardiologists are affiliated with public and private hospitals.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              On-site facilities and friendly staff at both our Drummoyne and Bowral rooms.
            </p>

            <Button href="/about-us" variant="secondary" size="lg" className="mt-9">
              Learn About Us
              <Icon name="arrow-right" size={18} />
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
