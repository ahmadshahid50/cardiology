import type { Doctor } from '@/lib/types';

/**
 * Consultant cardiologists.
 *
 * Names, post-nominals, hospital appointments, university roles and biographies
 * are published VERBATIM as supplied by the practice. Both biographies, and the
 * subspecialty, expertise, qualification and registration details below them,
 * are the practice's own replacement copy. Only punctuation and sentence spacing
 * have been normalised. Do not edit any clinical or credential wording without
 * written confirmation from the practice.
 */

export const doctors: Doctor[] = [
  {
    slug: 'dr-imran-kassam',
    name: 'Dr Imran Kassam',
    postNominals: 'MBBS, FRACP, FCSANZ',
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
    subspecialties: ['Electrophysiology'],
    areasOfExpertise: ['Cardiac Pacing', 'ECG (Electrocardiogram)'],
    qualifications: ['MBBS University of Karachi 1999'],
    registration: { body: 'AHPRA', number: 'MED0001194229' },
    bio: [
      'Dr Imran Kassam is a Consultant Cardiologist and Electrophysiologist with specialist expertise in heart rhythm disorders, device therapy, and general cardiology. He is a Conjoint Lecturer at University of New South Wales and a Visiting Medical Officer and Clinical Senior Lecturer at Macquarie University Hospital.',
      'Dr Kassam completed his cardiology training at St Vincent’s Hospital Sydney, where his specialist training included advanced fellowships in heart failure, cardiac transplantation, electrophysiology, and cardiac device therapy. During his training, he contributed to multiple clinical trials and published research in peer-reviewed medical journals.',
      'His clinical practice includes general cardiology and advanced electrophysiology, with particular expertise in the diagnosis and treatment of heart rhythm disorders. He performs specialist procedures including pacemaker and defibrillator implantation, electrophysiological studies, and catheter ablation therapies for arrhythmias.',
      'Dr Kassam undertakes his procedural work at Macquarie University Hospital and is also a Visiting Medical Officer at Griffith Base Hospital, where he contributes to medical education through teaching students and supervising doctors in training.',
    ],
    image: {
      src: '/images/doctors/dr-imran-kassam-cardiologist.webp',
      alt: 'Dr Imran Kassam, Consultant Cardiologist and Electrophysiologist',
    },
  },
  {
    slug: 'dr-probal-roy',
    name: 'Dr Probal Roy',
    postNominals: 'B.Sc.(Med), M.B.B.S (Hons), MPH, FRACP, FCSANZ',
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
    subspecialties: ['Interventional Cardiology'],
    areasOfExpertise: [
      'Pulmonary Hypertension',
      'Unstable Angina',
      'Palpitations',
      'Low Blood Pressure',
      'Hypertrophic Cardiomyopathy',
      'Heart Muscle Disease',
      'Heart Attack',
      'Chest Pain',
      'Bradycardia',
      'Atrial Tachycardia',
    ],
    bio: [
      'Dr Probal Roy is a Consultant and Interventional Cardiologist with expertise in general cardiology and coronary intervention (angioplasty/stent insertion).',
      'He is a Staff Specialist Interventional Cardiologist at Concord Repatriation General Hospital and Visiting Medical Officer at Macquarie University Hospital. He holds academic appointments as Conjoint Senior Lecturer at University of Sydney and Clinical Associate Professor at Macquarie University. He has been working as a consultant cardiologist across both public and private sectors for the past 17 years.',
      'Dr Roy graduated in medicine from University of New South Wales with Honours and completed his cardiology training at Concord Repatriation General Hospital in Sydney. He subsequently undertook interventional cardiology fellowships at Royal Melbourne Hospital and Washington Hospital Centre, Washington DC, USA, further developing his expertise in catheter-based cardiac procedures.',
      'His clinical practice covers the full spectrum of cardiovascular care, with particular interest in coronary artery disease and interventional coronary procedures. He provides evidence-based management tailored to each patient’s cardiovascular needs.',
      'Dr Roy has a strong academic and research background, holding a Master of Public Health in Clinical Research Methods from Johns Hopkins University. He has authored multiple publications in peer-reviewed medical journals and for many years is strongly committed to medical education and mentorship.',
      'Alongside his clinical responsibilities, Dr Roy is dedicated to medical education and training. He supervises medical students at Macquarie University Hospital rotating through cardiology. He has been the Director of Prevocational Education and Training at Concord Hospital since 2012, overseeing the training and wellbeing of junior doctors. In addition, he is a Royal Australasian College of Physicians supervisor of advanced trainees in cardiology and is involved in the assessment of overseas trained cardiologists seeking to work in Australia.',
      'His approach combines experienced advanced expertise in cardiology with a commitment to high-quality, patient-focused care.',
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
