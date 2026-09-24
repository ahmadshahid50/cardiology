import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { doctors } from '@/data/doctors';

export function Cardiologists() {
  return (
    <section className="bg-frost-50 pb-16 sm:pb-20" aria-labelledby="cardiologists-heading">
      <Container size="wide">
        <SectionIntro
          id="cardiologists-heading"
          eyebrow="Our Team"
          title="Meet Our Cardiologists"
        />

        <ul className="mx-auto mt-11 grid max-w-5xl gap-6 md:grid-cols-2">
          {doctors.map((doctor, i) => (
            <li key={doctor.slug} className="flex">
              <Reveal delay={i * 90} className="flex w-full">
                <DoctorCard doctor={doctor} className="w-full" />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
