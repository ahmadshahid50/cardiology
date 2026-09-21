import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { patientJourney } from '@/data/patient-information';

export function PatientJourney() {
  return (
    <section className="py-18 sm:py-22 lg:py-26" aria-labelledby="journey-heading">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading
                id="journey-heading"
                eyebrow="What to expect"
                title="Arranging your appointment"
                description={
                  <p>
                    A straightforward path from your first call through to assessment and follow-up,
                    with your referring doctor kept informed.
                  </p>
                }
              />
              <Button href="/patient-information" variant="secondary" size="lg" className="mt-8">
                Patient information
                <Icon name="arrow-right" size={18} />
              </Button>
            </Reveal>

            <Reveal delay={120} className="mt-10 hidden lg:block">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/images/services/cardiac-consultation.webp"
                  alt="Clinician in scrubs forming a heart shape with gloved hands"
                  width={900}
                  height={600}
                  sizes="40vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ol className="relative">
              {patientJourney.map((step, i) => {
                const isLast = i === patientJourney.length - 1;
                return (
                  <li key={step.title} className="relative flex gap-5 pb-9 last:pb-0 sm:gap-7">
                    {/* Connector */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute top-12 bottom-0 left-[1.375rem] w-px bg-ink-200 sm:left-[1.625rem]"
                      />
                    )}
                    <Reveal delay={i * 80} className="flex gap-5 sm:gap-7">
                      <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-crimson-200 bg-crimson-50 font-serif text-lg font-semibold text-crimson-700 sm:h-13 sm:w-13 sm:text-xl">
                        {i + 1}
                      </span>
                      <div className="pt-1 sm:pt-2">
                        <h3 className="font-serif text-xl font-semibold text-ink-900">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink-600">
                          {step.description}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
