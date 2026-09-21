import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/data/patient-information';
import { locations, telHref } from '@/data/site';

export function Faq() {
  return (
    <section className="bg-ink-50 py-18 sm:py-22 lg:py-26" aria-labelledby="faq-heading">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                id="faq-heading"
                eyebrow="Common questions"
                title="Questions patients ask us"
                description={
                  <p>
                    If your question is not answered here, our reception team is happy to help.
                  </p>
                }
              />

              <div className="mt-8 rounded-lg border border-ink-200 bg-white p-6">
                <p className="font-serif text-lg font-semibold text-ink-900">Speak with our team</p>
                <ul className="mt-4 space-y-3">
                  {locations.map((location) => (
                    <li key={location.slug}>
                      <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-ink-500 uppercase">
                        {location.shortName}
                      </p>
                      <a
                        href={telHref(location.phones[0]!)}
                        className="mt-1 inline-flex items-center gap-2 rounded-sm font-medium text-ink-900 underline-offset-4 hover:text-crimson-700 hover:underline"
                      >
                        <Icon name="phone" size={16} className="text-crimson-600" />
                        {location.phones[0]}
                      </a>
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant="secondary" size="sm" className="mt-5 w-full">
                  All contact details
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={90}>
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
