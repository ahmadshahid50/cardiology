import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { JsonLd } from '@/components/ui/JsonLd';
import { ServiceCard } from '@/components/services/ServiceCard';
import { CallToAction } from '@/components/home/CallToAction';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { additionalServices, serviceGroups, servicesByCategory } from '@/data/services';
import { locations, telHref } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Our Services',
  description:
    'Cardiac consultation, ECG, stress ECG, echocardiography, stress echocardiography, 24-hour blood pressure and Holter monitoring, coronary angiography and stenting, device checks, pacemaker and defibrillator insertion, electrophysiology studies and ablation therapy.',
  path: '/services',
});

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we offer"
        title="Our services"
        intro="We have expertise in each of the major disciplines of cardiology, from consultation and diagnostic imaging through to interventional and electrophysiology procedures."
        crumbs={crumbs}
      />

      {serviceGroups.map((group, groupIndex) => {
        const groupServices = servicesByCategory(group.category);
        if (groupServices.length === 0) return null;

        const alt = groupIndex % 2 === 1;

        return (
          <section
            key={group.category}
            aria-labelledby={`${group.category}-heading`}
            className={alt ? 'bg-ink-50 py-16 sm:py-20' : 'py-16 sm:py-20'}
          >
            <Container size="wide">
              <Reveal>
                <SectionHeading
                  id={`${group.category}-heading`}
                  eyebrow={`0${groupIndex + 1}`}
                  title={group.title}
                  description={<p>{group.description}</p>}
                />
              </Reveal>

              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupServices.map((service, i) => (
                  <li key={service.slug} className="flex">
                    <Reveal delay={i * 70} className="flex w-full">
                      <ServiceCard
                        service={service}
                        variant={service.image ? 'feature' : 'compact'}
                        className="w-full"
                      />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        );
      })}

      {/* Additional monitoring options. The previous site carried no usable
          description for these, so only the names are published. */}
      <section className="pb-16 sm:pb-20" aria-labelledby="additional-heading">
        <Container size="wide">
          <Reveal className="rounded-lg border border-ink-200 bg-ink-50 p-7 sm:p-9">
            <h2 id="additional-heading" className="font-serif text-2xl font-semibold text-ink-900">
              Additional monitoring options
            </h2>
            <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
              Extended heart rhythm and blood pressure monitoring is also available. Please contact
              our rooms to discuss which option is appropriate for you.
            </p>

            <ul className="mt-7 flex flex-wrap gap-3">
              {additionalServices.map((item) => (
                <li
                  key={item.name}
                  className="inline-flex items-center gap-2.5 rounded-md border border-ink-200 bg-white px-4 py-2.5 text-[0.9375rem] font-medium text-ink-800"
                >
                  <Icon name="heart-monitor" size={18} className="text-crimson-600" />
                  {item.name}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink-200 pt-6">
              {locations.map((location) => (
                <p key={location.slug} className="text-[0.9375rem]">
                  <span className="text-ink-500">{location.shortName}: </span>
                  <a
                    href={telHref(location.phones[0]!)}
                    className="rounded-sm font-semibold text-ink-900 underline-offset-4 hover:text-crimson-700 hover:underline"
                  >
                    {location.phones[0]}
                  </a>
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <CallToAction
        title="Not sure which test you need?"
        description="Your referring doctor or our reception team can help. Contact the rooms closest to you to arrange a consultation."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} id="schema-breadcrumb-services" />
    </>
  );
}
