import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { PracticeValues } from '@/components/home/PracticeValues';
import { Introduction } from '@/components/home/Introduction';
import { Services } from '@/components/home/Services';
import { Cardiologists } from '@/components/home/Cardiologists';
import { Locations } from '@/components/home/Locations';
import { PatientInfo } from '@/components/home/PatientInfo';
import { CallToAction } from '@/components/home/CallToAction';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Advanced Cardiology | Cardiologists in Drummoyne & Bowral',
  description:
    'Specialist cardiology care across Drummoyne and Bowral. Cardiac consultation, echocardiography, ECG, stress testing, Holter monitoring and cardiac procedures, with expertise in each of the major disciplines of cardiology.',
  path: '/',
});

/**
 * The homepage is deliberately light on copy: each section gives a patient just
 * enough to choose a next step. Detailed clinical information lives on the
 * service, cardiologist and patient information pages.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PracticeValues />
      <Introduction />
      <Services />
      <Cardiologists />
      <Locations />
      <PatientInfo />
      <CallToAction />
    </>
  );
}
