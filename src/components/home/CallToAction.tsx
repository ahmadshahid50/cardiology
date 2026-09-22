import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { locations, telHref } from '@/data/site';

interface CallToActionProps {
  title?: string;
  description?: string;
}

export function CallToAction({
  title = 'Your heart deserves expert care',
  description = 'Call the rooms closest to you, or send an enquiry and our team will be in touch.',
}: CallToActionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900" aria-labelledby="cta-heading">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/heart-rhythm-diagnostics-hero.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink-950/80" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(186,19,29,0.32),transparent_62%)]"
        />
      </div>

      <Container size="wide" className="py-20 sm:py-24 lg:py-28">
        <Reveal className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2
              id="cta-heading"
              className="text-3xl leading-[1.1] text-white sm:text-4xl lg:text-[3rem]"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-200">{description}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/make-an-appointment" size="lg">
                <Icon name="calendar" size={18} />
                Book an Appointment
              </Button>
              <Button href="/contact" size="lg" variant="onDark">
                Contact Us
                <Icon name="arrow-right" size={18} />
              </Button>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {locations.map((location) => (
              <li
                key={location.slug}
                className="rounded-xl border border-white/12 bg-white/5 p-6 backdrop-blur-sm"
              >
                <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-ink-400 uppercase">
                  {location.shortName}
                </p>
                <a
                  href={telHref(location.phones[0]!)}
                  className="mt-2.5 inline-flex items-center gap-2.5 rounded-sm font-serif text-2xl font-semibold text-white transition-colors hover:text-crimson-300"
                >
                  <Icon name="phone" size={19} className="text-crimson-400" />
                  {location.phones[0]}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
