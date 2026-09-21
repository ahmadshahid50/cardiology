import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { practiceValues } from '@/data/patient-information';
import type { IconName } from '@/lib/types';

export function PracticeValues() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-18 sm:py-22 lg:py-26" aria-labelledby="values-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(186,19,29,0.22),transparent_58%)]"
      />

      <Container size="wide" className="relative">
        <Reveal>
          <SectionHeading
            id="values-heading"
            tone="dark"
            eyebrow="Our approach"
            title="Why patients are referred to our practice"
            description={
              <p>
                Everything below reflects how the practice describes its own care: expertise across
                cardiology, hospital-affiliated clinicians, and a patient-focused approach.
              </p>
            }
          />
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {practiceValues.map((value, i) => (
            <li key={value.title} className="bg-ink-900">
              <Reveal delay={i * 70} className="h-full">
                <div className="flex h-full flex-col p-7 transition-colors duration-300 hover:bg-ink-800">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-crimson-600/15 text-crimson-300">
                    <Icon name={value.icon as IconName} size={24} />
                  </span>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-300">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
