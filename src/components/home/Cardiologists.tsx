import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { doctors } from '@/data/doctors';

export function Cardiologists() {
  return (
    <section className="py-20 sm:py-24 lg:py-28" aria-labelledby="cardiologists-heading">
      <Container size="wide">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.8125rem] font-semibold tracking-[0.16em] text-crimson-600 uppercase">
            Our Team
          </p>
          <h2 id="cardiologists-heading" className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
            Meet our cardiologists
          </h2>
          <span aria-hidden="true" className="mx-auto mt-6 block h-0.5 w-14 bg-crimson-600" />
        </Reveal>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {doctors.map((doctor, i) => (
            <li key={doctor.slug} className="flex">
              <Reveal delay={i * 90} className="flex w-full">
                <DoctorCard doctor={doctor} className="w-full" />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 text-center">
          <Button href="/cardiologists" variant="secondary" size="lg">
            All cardiologists
            <Icon name="arrow-right" size={18} />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
