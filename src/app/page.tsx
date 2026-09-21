import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Introduction } from '@/components/home/Introduction';
import { Services } from '@/components/home/Services';
import { PracticeValues } from '@/components/home/PracticeValues';
import { PatientJourney } from '@/components/home/PatientJourney';
import { Faq } from '@/components/home/Faq';
import { Locations } from '@/components/home/Locations';
import { CallToAction } from '@/components/home/CallToAction';
import { JsonLd } from '@/components/ui/JsonLd';
import { faqSchema, pageMetadata } from '@/lib/seo';
import { faqs } from '@/data/patient-information';

export const metadata: Metadata = pageMetadata({
  title: 'Advanced Cardiology | Cardiologists in Drummoyne & Bowral',
  description:
    'Drummoyne Advanced Cardiology and Southern Highlands Heart Centre provide patient focused cardiac care, with expertise across every major discipline of cardiology. Consultations, echocardiography, ECG, Holter monitoring and cardiac procedures.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <Services />
      <PracticeValues />
      <PatientJourney />
      <Faq />
      <Locations />
      <CallToAction />
      <JsonLd data={faqSchema(faqs)} id="schema-faq-home" />
    </>
  );
}
