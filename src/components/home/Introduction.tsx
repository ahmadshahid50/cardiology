import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const highlights = [
  'Expertise in each of the major disciplines of cardiology',
  'Cardiologists affiliated with public and private hospitals',
  'On-site facilities and friendly staff',
];

export function Introduction() {
  return (
    <section className="py-18 sm:py-22 lg:py-26" aria-labelledby="introduction-heading">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-last lg:order-first">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/images/general/cardiac-care-technology.webp"
                alt="Cardiologist reviewing cardiac imaging on a tablet"
                width={1060}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Overlapping detail card — kept restrained, no glass effects. */}
            <div className="mx-4 -mt-14 rounded-lg border border-ink-100 bg-white p-6 shadow-card sm:mx-8 sm:-mt-16 sm:p-7 lg:absolute lg:right-0 lg:-bottom-8 lg:mx-0 lg:mt-0 lg:max-w-xs lg:translate-x-6">
              <p className="font-serif text-lg font-semibold text-ink-900">
                Comprehensive cardiac care
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                From consultation and diagnostic imaging through to interventional and
                electrophysiology procedures.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <SectionHeading
              id="introduction-heading"
              eyebrow="About the practice"
              title={
                <>
                  Drummoyne Advanced Cardiology &amp; Southern&nbsp;Highlands Heart&nbsp;Centre
                </>
              }
              description={
                <p>
                  At Drummoyne Advanced Cardiology and Southern Highlands Heart Centre we have
                  expertise in each of the major disciplines of cardiology. Our cardiologists are
                  affiliated with public and private hospitals.
                </p>
              }
            />

            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
              With on-site state of the art facilities and friendly staff we strive to make your
              experience as pleasant as possible. We look forward to providing you comprehensive
              cardiac care.
            </p>

            <ul className="mt-8 space-y-3.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-600">
                    <Icon name="check" size={14} strokeWidth={2.25} />
                  </span>
                  <span className="text-ink-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/about-us" variant="secondary" size="lg">
                About our practice
                <Icon name="arrow-right" size={18} />
              </Button>
              <Button href="/cardiologists" variant="ghost" size="lg">
                Meet our cardiologists
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
