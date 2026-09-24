import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/ui/PageHeader';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { JsonLd } from '@/components/ui/JsonLd';
import { CallToAction } from '@/components/home/CallToAction';
import { breadcrumbSchema, faqSchema, pageMetadata } from '@/lib/seo';
import { faqs, patientInfoSections, patientJourney } from '@/data/patient-information';

export const metadata: Metadata = pageMetadata({
  title: 'Patient Information',
  description:
    'Information for patients of Advanced Cardiology: who should see a cardiologist, what happens during a cardiac consultation, and what echocardiograms, stress echocardiograms and Holter monitors involve.',
  path: '/patient-information',
});

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Patient Information', href: '/patient-information' },
];

export default function PatientInformationPage() {
  return (
    <>
      <PageHeader
        eyebrow="For patients"
        title="Patient information"
        intro="Plain-language information about seeing a cardiologist and the tests we most commonly perform."
        crumbs={crumbs}
      />

      <div className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* On-this-page navigation */}
            <aside className="lg:col-span-3">
              <nav aria-labelledby="on-this-page" className="lg:sticky lg:top-28">
                <h2
                  id="on-this-page"
                  className="font-sans text-[0.8125rem] font-semibold tracking-[0.14em] text-ink-500 uppercase"
                >
                  On this page
                </h2>
                <ul className="mt-4 space-y-1 border-l border-ink-200">
                  {patientInfoSections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="-ml-px block border-l-2 border-transparent py-2 pl-4 text-[0.9375rem] text-ink-600 transition-colors hover:border-crimson-600 hover:text-ink-900"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#appointment-process"
                      className="-ml-px block border-l-2 border-transparent py-2 pl-4 text-[0.9375rem] text-ink-600 transition-colors hover:border-crimson-600 hover:text-ink-900"
                    >
                      Arranging an appointment
                    </a>
                  </li>
                  <li>
                    <a
                      href="#patient-faqs"
                      className="-ml-px block border-l-2 border-transparent py-2 pl-4 text-[0.9375rem] text-ink-600 transition-colors hover:border-crimson-600 hover:text-ink-900"
                    >
                      Frequently asked questions
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Content */}
            <div className="lg:col-span-9">
              <div className="space-y-14">
                {patientInfoSections.map((section) => (
                  <section key={section.id} aria-labelledby={section.id}>
                    <Reveal>
                      <h2 id={section.id} className="scroll-mt-28 text-2xl sm:text-3xl">
                        {section.heading}
                      </h2>
                      <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-ink-600">
                        {section.body.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>

                      {section.subsections?.map((sub) => {
                        /* Short, parallel lines read better as a list than as prose. */
                        const asList = sub.body.every((line) => line.length < 140);

                        return (
                          <div
                            key={sub.heading}
                            className="mt-7 rounded-lg border border-ink-100 bg-frost-50 p-6 sm:p-7"
                          >
                            <h3 className="font-serif text-lg font-semibold text-ink-900">
                              {sub.heading}
                            </h3>
                            {asList ? (
                              <ul className="mt-4 space-y-3">
                                {sub.body.map((line) => (
                                  <li
                                    key={line}
                                    className="flex items-start gap-3 text-[1.0625rem] text-ink-700"
                                  >
                                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-crimson-100 text-crimson-700">
                                      <Icon name="check" size={12} strokeWidth={2.5} />
                                    </span>
                                    {line}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-ink-600">
                                {sub.body.map((paragraph, i) => (
                                  <p key={i}>{paragraph}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </Reveal>
                  </section>
                ))}

                {/* Appointment process */}
                <section aria-labelledby="appointment-process">
                  <Reveal>
                    <h2 id="appointment-process" className="scroll-mt-28 text-2xl sm:text-3xl">
                      Arranging an appointment
                    </h2>
                    <ol className="mt-6 space-y-5">
                      {patientJourney.map((step, i) => (
                        <li key={step.title} className="flex gap-5">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-crimson-200 bg-crimson-50 font-serif font-semibold text-crimson-700">
                            {i + 1}
                          </span>
                          <div>
                            <h3 className="font-serif text-lg font-semibold text-ink-900">
                              {step.title}
                            </h3>
                            <p className="mt-1.5 text-[1.0625rem] leading-relaxed text-ink-600">
                              {step.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <Link
                      href="/make-an-appointment"
                      className="mt-7 inline-flex items-center gap-2 rounded-sm font-semibold text-crimson-700 underline-offset-4 hover:underline"
                    >
                      Make an appointment
                      <Icon name="arrow-right" size={18} />
                    </Link>
                  </Reveal>
                </section>

                {/* FAQs */}
                <section aria-labelledby="patient-faqs">
                  <Reveal>
                    <SectionHeading
                      id="patient-faqs"
                      className="scroll-mt-28"
                      title="Frequently asked questions"
                    />
                    <Accordion items={faqs} className="mt-8" defaultOpen={null} />
                  </Reveal>
                </section>

                {/* Medical disclaimer */}
                <Reveal
                  as="aside"
                  className="rounded-lg border border-ink-200 bg-white p-6 sm:p-7"
                >
                  <h2 className="flex items-center gap-2.5 font-serif text-lg font-semibold text-ink-900">
                    <Icon name="shield" size={20} className="text-crimson-500" />
                    Please note
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                    The information on this page is general in nature and is not a substitute for
                    individual medical advice. Your cardiologist will discuss what is appropriate for
                    your circumstances. If you are experiencing chest pain or other urgent symptoms,
                    call <strong className="font-semibold text-ink-800">000</strong> or attend your
                    nearest emergency department.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <CallToAction />
      <JsonLd data={breadcrumbSchema(crumbs)} id="schema-breadcrumb-patient-info" />
      <JsonLd data={faqSchema(faqs)} id="schema-faq-patient-info" />
    </>
  );
}
