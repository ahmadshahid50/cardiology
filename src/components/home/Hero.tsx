import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { locations, openingHours, telHref } from '@/data/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-heading">
      <div className="relative lg:grid lg:min-h-[min(78vh,680px)] lg:grid-cols-12 lg:items-center">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-6 xl:col-span-5">
          <Container className="py-14 sm:py-18 lg:mr-0 lg:ml-auto lg:max-w-152 lg:py-20 lg:pr-12 xl:py-24">
            <p className="rule-crimson text-[0.8125rem] font-semibold tracking-[0.14em] text-crimson-600 uppercase">
              Drummoyne &amp; Southern Highlands
            </p>

            <h1
              id="hero-heading"
              className="mt-6 text-[2.5rem] leading-[1.08] tracking-[-0.022em] sm:text-5xl xl:text-[3.5rem]"
            >
              Comprehensive cardiac care,{' '}
              <span className="text-crimson-700">close to home</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-ink-600">
              Our goal is to provide patient focused high quality clinical care with warmth and
              compassion. We have expertise in each of the major disciplines of cardiology, and our
              cardiologists are affiliated with public and private hospitals.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/make-an-appointment" size="lg">
                <Icon name="calendar" size={18} />
                Book an Appointment
              </Button>
              <Button href="/services" size="lg" variant="secondary">
                Explore our services
                <Icon name="arrow-right" size={18} />
              </Button>
            </div>

            <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-ink-100 pt-8 sm:grid-cols-2">
              {locations.map((location) => (
                <div key={location.slug}>
                  <dt className="text-[0.8125rem] font-semibold tracking-[0.08em] text-ink-500 uppercase">
                    {location.shortName}
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={telHref(location.phones[0]!)}
                      className="inline-flex items-center gap-2 rounded-sm font-serif text-xl font-semibold text-ink-900 underline-offset-4 transition-colors hover:text-crimson-700 hover:underline"
                    >
                      <Icon name="phone" size={17} className="text-crimson-600" />
                      {location.phones[0]}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>

        {/* Photograph */}
        <div className="relative lg:col-span-6 lg:h-full xl:col-span-7">
          <div className="relative aspect-4/3 w-full sm:aspect-video lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
            <Image
              src="/images/hero/cardiologist-holding-heart-hero.webp"
              alt="A cardiac clinician in scrubs and stethoscope holding a model of a human heart"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[68%_center] lg:object-[60%_center]"
            />
            {/* Blends the photograph into the copy column without dimming the subject. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden bg-linear-to-r from-white via-white/55 to-transparent lg:block lg:w-2/5"
            />
          </div>
        </div>
      </div>

      {/* Quick facts strip */}
      <div className="relative z-10 border-t border-ink-100 bg-ink-50">
        <Container size="wide">
          <ul className="grid divide-ink-200 sm:grid-cols-3 sm:divide-x">
            {[
              {
                icon: 'clock' as const,
                label: openingHours.days,
                value: openingHours.hours,
              },
              {
                icon: 'pin' as const,
                label: 'Two locations',
                value: `${locations[0]!.suburb} & ${locations[1]!.suburb}`,
                href: '/contact',
              },
              {
                icon: 'users' as const,
                label: 'Consultant cardiologists',
                value: 'General, interventional & electrophysiology',
                href: '/cardiologists',
              },
            ].map((item) => {
              const content = (
                <>
                  <Icon name={item.icon} size={22} className="shrink-0 text-crimson-600" />
                  <span className="min-w-0">
                    <span className="block text-[0.8125rem] font-semibold tracking-[0.08em] text-ink-500 uppercase">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block font-medium text-ink-900">{item.value}</span>
                  </span>
                </>
              );

              return (
                <li key={item.label} className="border-b border-ink-200 sm:border-b-0">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center gap-3.5 px-1 py-5 transition-colors hover:bg-white sm:px-6"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3.5 px-1 py-5 sm:px-6">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </section>
  );
}
