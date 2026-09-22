import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { patientResources } from '@/data/patient-information';

export function PatientInfo() {
  return (
    <section className="py-20 sm:py-24 lg:py-28" aria-labelledby="patient-info-heading">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="rule-crimson text-[0.8125rem] font-semibold tracking-[0.16em] text-crimson-600 uppercase">
              Patient Information
            </p>
            <h2
              id="patient-info-heading"
              className="mt-6 text-3xl leading-[1.12] sm:text-4xl lg:text-[2.5rem]"
            >
              Everything you need before your visit
            </h2>
            <Button href="/patient-information" variant="secondary" size="lg" className="mt-8">
              Patient Information
              <Icon name="arrow-right" size={18} />
            </Button>
          </Reveal>

          <div className="lg:col-span-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {patientResources.map((resource, i) => (
                <li key={resource.href + resource.title} className="flex">
                  <Reveal delay={i * 60} className="flex w-full">
                    <Link
                      href={resource.href}
                      className="group flex w-full items-start gap-4 rounded-xl border border-ink-100 bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 ease-out-soft hover:-translate-y-1 hover:border-crimson-200 hover:shadow-card"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-crimson-50 text-crimson-600 transition-colors duration-300 group-hover:bg-crimson-600 group-hover:text-white">
                        <Icon name={resource.icon} size={21} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-lg leading-snug font-semibold text-ink-900">
                          {resource.title}
                        </span>
                        <span className="mt-1.5 block text-[0.9375rem] leading-relaxed text-ink-600">
                          {resource.description}
                        </span>
                      </span>
                      <Icon
                        name="arrow-right"
                        size={18}
                        className="mt-1 shrink-0 text-ink-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-crimson-600"
                      />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
