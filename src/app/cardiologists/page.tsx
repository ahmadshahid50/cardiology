import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { CallToAction } from '@/components/home/CallToAction';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { doctors } from '@/data/doctors';

export const metadata: Metadata = pageMetadata({
  title: 'Our Cardiologists',
  description:
    'Meet the consultant cardiologists at Drummoyne Advanced Cardiology and Southern Highlands Heart Centre: Dr Imran Kassam and Dr Probal Roy.',
  path: '/cardiologists',
});

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Our Cardiologists', href: '/cardiologists' },
];

export default function CardiologistsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our team"
        title="Our cardiologists"
        intro="Our cardiologists are affiliated with public and private hospitals, and hold teaching appointments at Australian universities."
        crumbs={crumbs}
      />

      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 sm:gap-8">
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

      <CallToAction
        title="Arrange a consultation"
        description="Contact the rooms closest to you and our reception team will arrange an appointment with the cardiologist best suited to your needs."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} id="schema-breadcrumb-cardiologists" />
    </>
  );
}
