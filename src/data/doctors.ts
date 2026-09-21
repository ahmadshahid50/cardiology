import type { Doctor } from '@/lib/types';

/**
 * Consultant cardiologists.
 *
 * Names, post-nominals, hospital appointments, university roles and biographies
 * are migrated VERBATIM from the existing website's About Us page. Only
 * punctuation and sentence spacing have been normalised. Do not edit any
 * clinical or credential wording without written confirmation from the practice.
 */

export const doctors: Doctor[] = [
  {
    slug: 'dr-imran-kassam',
    name: 'Dr Imran Kassam',
    qualifications: 'MBBS, FRACP, FCSANZ',
    title: 'Consultant Cardiologist and Electrophysiologist',
    appointments: [
      'Conjoint Lecturer, University of New South Wales',
      'Visiting Medical Officer and Clinical Senior Lecturer, Macquarie University Hospital',
    ],
    focus: 'General cardiology and electrophysiology',
    areasOfPractice: [
      'General cardiology',
      'Electrophysiology',
      'Device implantation (pacemakers, defibrillators)',
      'Electrophysiological studies',
      'Ablative therapy',
    ],
    bio: [
      'Dr Kassam completed his training in cardiology at St Vincent’s Hospital, Sydney. His study in cardiology incorporated fellowships in heart failure, transplantation, electrophysiology and device therapy.',
      'During his training he has been involved in multiple clinical trials and has published papers in peer reviewed journals.',
      'Dr Kassam’s areas of practice include general cardiology and electrophysiology. He has expertise in device implantation (pacemakers, defibrillators), electrophysiological studies and ablative therapy. He is a visiting medical officer at Macquarie University Hospital where he performs his procedural work.',
      'Dr Kassam is also a Visiting Medical Officer at Griffith Base Hospital where he is involved in teaching medical students and supervising trainees.',
    ],
    image: {
      src: '/images/doctors/dr-imran-kassam-cardiologist.webp',
      alt: 'Dr Imran Kassam, Consultant Cardiologist and Electrophysiologist',
    },
  },
  {
    slug: 'dr-probal-roy',
    name: 'Dr Probal Roy',
    qualifications: 'B.Sc.(Med), M.B.B.S (Hons), MPH, FRACP, FCSANZ',
    title: 'Consultant and Interventional Cardiologist',
    appointments: [
      'Staff Specialist, Concord Repatriation General Hospital',
      'Conjoint Senior Lecturer, University of Sydney',
      'Clinical Associate Professor, Macquarie University',
    ],
    focus: 'General and interventional cardiology',
    areasOfPractice: [
      'General cardiology',
      'Interventional cardiology',
      'Coronary angioplasty and stenting',
    ],
    bio: [
      'Dr Roy is a medical graduate from the University of New South Wales and completed his cardiology training at Concord Repatriation General Hospital, Sydney. He subsequently undertook interventional cardiology fellowships at The Royal Melbourne Hospital, Victoria and Washington Hospital Center, Washington DC, USA.',
      'He is currently appointed at Concord Repatriation General Hospital as a Staff Specialist (Interventional Cardiologist) and at Macquarie University and Mater Hospitals as a Visiting Medical Officer.',
      'Dr Roy has academic interests. He has a Master of Public Health in clinical research methods from The Johns Hopkins University, Baltimore, USA. He has authored several publications in peer reviewed journals on topical issues in his field.',
      'Dr Roy is a senior lecturer at The University of Sydney and Clinical Associate Professor at Macquarie University, having an active role in medical student teaching. He is also involved in the training and welfare of junior doctors at Concord Hospital.',
      'Dr Roy’s clinical interests are in general and interventional (coronary angioplasty and stenting) cardiology.',
    ],
    image: {
      src: '/images/doctors/dr-probal-roy-cardiologist.webp',
      alt: 'Dr Probal Roy, Consultant and Interventional Cardiologist',
    },
  },
];

export function getDoctor(slug: string): Doctor | undefined {
  return doctors.find((d) => d.slug === slug);
}
