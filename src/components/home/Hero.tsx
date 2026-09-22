import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { heroValues, locations } from '@/data/site';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900" aria-labelledby="hero-heading">
      {/* Photograph fills the section; the copy sits over a scrim on the left. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/cardiologist-holding-heart-hero.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[72%_center] lg:object-[58%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-ink-950/92 via-ink-950/72 to-ink-950/25 lg:from-ink-950/94 lg:via-ink-950/70 lg:to-transparent"
        />
      </div>

      <Container size="wide">
        <div className="max-w-xl py-20 sm:py-28 lg:max-w-2xl lg:py-36">
          <p className="text-[0.8125rem] font-semibold tracking-[0.18em] text-crimson-300 uppercase">
            Cardiology Care
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-[2.5rem] leading-[1.06] tracking-[-0.025em] text-white sm:text-[3.25rem] lg:text-[4rem]"
          >
            Expert cardiology care,
            <span className="block text-crimson-300">with a personal approach</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-200">
            Specialist cardiac assessment, diagnostics and procedures across our Drummoyne and
            Bowral rooms.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/make-an-appointment" size="lg">
              <Icon name="calendar" size={18} />
              Book an Appointment
            </Button>
            <Button href="/services" size="lg" variant="onDark">
              View Our Services
              <Icon name="arrow-right" size={18} />
            </Button>
          </div>

          {/* Location pills */}
          <ul className="mt-9 flex flex-wrap gap-3">
            {locations.map((location) => (
              <li key={location.slug}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  <Icon name="pin" size={15} className="text-crimson-300" />
                  {location.suburb}
                </span>
              </li>
            ))}
          </ul>

          {/* Values strip. Separators are trailing, not leading, so a wrapped
              item never starts a line with an orphaned divider. */}
          <div className="mt-12 flex items-start gap-5 border-t border-white/15 pt-6">
            <span aria-hidden="true" className="mt-2 h-px w-10 shrink-0 bg-crimson-500" />
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[0.75rem] font-semibold tracking-[0.16em] text-ink-300 uppercase">
              {heroValues.map((value, i) => (
                <li key={value}>
                  {value}
                  {i < heroValues.length - 1 && (
                    <span aria-hidden="true" className="ml-4 text-white/25">
                      |
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
