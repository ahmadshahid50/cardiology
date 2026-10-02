import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { ScriptMark } from '@/components/ui/ScriptMark';
import { heroValues, locations } from '@/data/site';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white" aria-labelledby="hero-heading">
      {/* Photograph fills the section. It is a bright clinical image, so the copy
          sits over a white wash on the left rather than a dark scrim. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/cardiac-care-hands-heart-hero.jpeg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[68%_center] lg:object-[62%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-white/94 via-white/80 to-white/20 sm:from-white/92 sm:via-white/62 sm:to-transparent lg:from-white/95 lg:via-white/55 lg:to-transparent"
        />
      </div>

      {/* Brand phrase, set over the right of the photograph. It is positioned
          against the section rather than the container so it sits out near the
          edge of the frame, as the design does. */}
      <ScriptMark
        lines={['Healthier', 'Hearts', 'Brighter', 'Tomorrows']}
        className="pointer-events-none absolute top-1/2 right-[3.5%] hidden -translate-y-1/2 text-[1.75rem] xl:block xl:text-[2rem]"
      />

      <Container size="wide">
        <div className="relative py-12 sm:py-14 lg:py-16">
          <div className="max-w-xl lg:max-w-[40rem]">
            <h1
              id="hero-heading"
              className="text-[2rem] leading-[1.14] font-bold tracking-[-0.02em] text-ink-900 sm:text-[2.5rem] lg:text-[2.875rem]"
            >
              Experienced Comprehensive Care
              <span className="block">in Drummoyne &amp; Bowral</span>
            </h1>

            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-ink-600">
              Comprehensive cardiac assessment, diagnostics and specialist care with warmth, clarity
              and compassion.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/make-an-appointment" size="lg">
                <Icon name="calendar" size={18} />
                Book an Appointment
              </Button>
              <Button href="/services" size="lg" variant="secondary">
                View Our Services
                <Icon name="arrow-right" size={18} />
              </Button>
            </div>

            {/* Location pills */}
            <ul className="mt-6 flex flex-wrap gap-3">
              {locations.map((location) => (
                <li key={location.slug}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-800 shadow-subtle">
                    <Icon name="pin" size={15} className="text-crimson-500" />
                    {location.suburb}
                  </span>
                </li>
              ))}
            </ul>

            {/* Values strip. Separators are trailing, not leading, so a wrapped
                item never starts a line with an orphaned divider. */}
            <div className="mt-10 flex items-center gap-5">
              <span aria-hidden="true" className="h-0.5 w-12 shrink-0 rounded-full bg-crimson-500" />
              <ul className="flex flex-wrap gap-x-3 gap-y-2 text-[0.6875rem] font-semibold tracking-[0.22em] text-ink-500 uppercase">
                {heroValues.map((value, i) => (
                  <li key={value}>
                    {value}
                    {i < heroValues.length - 1 && (
                      <span aria-hidden="true" className="ml-3 text-ink-300">
                        |
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
