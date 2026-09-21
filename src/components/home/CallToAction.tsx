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
  title = 'Ready to arrange your appointment?',
  description = 'Call the rooms closest to you, or send us an enquiry and our reception team will be in touch.',
}: CallToActionProps) {
  return (
    <section className="relative overflow-hidden bg-ink-900" aria-labelledby="cta-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(186,19,29,0.30),transparent_60%)]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 w-full text-white/[0.05]"
      >
        <path
          d="M0 96h380l22-52 30 104 26-80 18 38h150l22-44 28 88 24-68 16 30h486"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <Container size="wide" className="relative py-16 sm:py-20 lg:py-24">
        <Reveal className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 id="cta-heading" className="text-3xl text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink-200">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/make-an-appointment" size="lg">
                <Icon name="calendar" size={18} />
                Book an Appointment
              </Button>
              <Button href="/contact" size="lg" variant="onDark">
                Contact our practice
                <Icon name="arrow-right" size={18} />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul className="grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-1">
              {locations.map((location) => (
                <li key={location.slug} className="bg-ink-900/60 p-6">
                  <p className="text-[0.8125rem] font-semibold tracking-[0.1em] text-ink-400 uppercase">
                    {location.name}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
                    {location.phones.map((phone) => (
                      <a
                        key={phone}
                        href={telHref(phone)}
                        className="inline-flex items-center gap-2 rounded-sm font-serif text-xl font-semibold text-white underline-offset-4 transition-colors hover:text-crimson-300 hover:underline"
                      >
                        <Icon name="phone" size={17} className="text-crimson-400" />
                        {phone}
                      </a>
                    ))}
                  </div>
                  <a
                    href={`mailto:${location.email}`}
                    className="mt-2 inline-block rounded-sm text-sm break-all text-ink-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {location.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
