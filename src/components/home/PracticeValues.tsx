import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { practiceValues } from '@/data/patient-information';

export function PracticeValues() {
  return (
    <section className="border-y border-ink-100 py-16 sm:py-20" aria-labelledby="values-heading">
      <Container size="wide">
        <h2 id="values-heading" className="sr-only">
          Why patients choose our practice
        </h2>

        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {practiceValues.map((value, i) => (
            <li key={value.title}>
              <Reveal delay={i * 70}>
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-crimson-50 text-crimson-500">
                  <Icon name={value.icon} size={22} />
                </span>
                <h3 className="mt-5 font-serif text-lg font-semibold text-ink-900">{value.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                  {value.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
