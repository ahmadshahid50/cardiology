import type { Service, ServiceCategory, ServiceGroup } from '@/lib/types';

/**
 * Services offered by the practice.
 *
 * The service NAMES are migrated verbatim from the existing website's
 * "Service we provide" list. The source site published names only — it carried
 * no description for most services — so summaries here are limited to plain,
 * procedural descriptions of what each test or procedure involves.
 *
 * They contain no efficacy, outcome or superiority claims. Anything marked
 * `needsClientCopy` is awaiting the practice's own wording; see CONTENT-AUDIT.md.
 */

export const serviceGroups: ServiceGroup[] = [
  {
    category: 'consultation',
    title: 'Consultation',
    description: 'Assessment and ongoing review with a consultant cardiologist.',
  },
  {
    category: 'diagnostic',
    title: 'Diagnostic testing',
    description: 'Tests used to assess the structure and function of the heart.',
  },
  {
    category: 'monitoring',
    title: 'Ambulatory monitoring',
    description:
      'Portable recording of heart rhythm and blood pressure during everyday activity.',
  },
  {
    category: 'interventional',
    title: 'Interventional cardiology',
    description: 'Catheter-based assessment and treatment of the coronary arteries.',
  },
  {
    category: 'electrophysiology',
    title: 'Electrophysiology and devices',
    description: 'Investigation and treatment of heart rhythm disorders, and cardiac devices.',
  },
];

export const services: Service[] = [
  {
    slug: 'cardiac-consultation',
    name: 'Cardiac Consultation',
    tagline: 'Assessment and review with a cardiologist.',
    summary:
      'A consultation with a cardiologist to assess your heart health and plan any further testing.',
    description:
      'A cardiac consultation usually includes an interview about your symptoms and history, a physical examination, any further tests that are required, and a discussion of your condition. Depending on what is found, your cardiologist may discuss lifestyle changes, medications, cardiac rehabilitation, or procedures such as angioplasty or coronary artery bypass grafting.',
    category: 'consultation',
    icon: 'consultation',
    image: {
      src: '/images/services/cardiac-consultation.webp',
      alt: 'Clinician in scrubs forming a heart shape with gloved hands',
    },
  },
  {
    slug: 'ecg',
    name: 'ECG',
    tagline: 'A recording of your heart’s electrical activity.',
    summary: 'A recording of the electrical activity of your heart, taken at rest.',
    description:
      'An electrocardiogram (ECG) records the electrical activity of the heart through small electrodes placed on the chest, arms and legs. The test is painless, takes only a few minutes, and is performed while you rest.',
    category: 'diagnostic',
    icon: 'ecg',
    image: {
      src: '/images/services/ecg-electrocardiogram.webp',
      alt: 'Patient having an ECG recorded with chest electrodes attached',
    },
    needsClientCopy: true,
  },
  {
    slug: 'stress-ecg',
    name: 'Stress ECG',
    tagline: 'An ECG recorded while you exercise.',
    summary: 'An ECG recorded while you exercise on a treadmill or exercise bike.',
    description:
      'A stress ECG records the electrical activity of the heart while you exercise, usually on a treadmill or exercise bike. Your heart rhythm, blood pressure and symptoms are monitored throughout the test by clinical staff.',
    category: 'diagnostic',
    icon: 'treadmill',
    image: {
      src: '/images/services/stress-ecg-exercise-test.webp',
      alt: 'Cardiac technician monitoring a patient during an exercise stress ECG',
    },
    needsClientCopy: true,
  },
  {
    slug: 'echocardiogram',
    name: 'Echocardiogram',
    tagline: 'An ultrasound scan of your heart.',
    summary: 'An ultrasound scan that shows the structure and function of your heart.',
    description:
      'An echocardiogram is an ultrasound scan of the heart. It is a diagnostic tool that allows the chambers, valves and pumping function of the heart to be assessed. The scan uses ultrasound rather than radiation, and is performed by a sonographer using a probe on the chest.',
    category: 'diagnostic',
    icon: 'heart',
    image: {
      src: '/images/services/echocardiogram-heart-ultrasound.webp',
      alt: 'Sonographer performing an echocardiogram on a patient',
    },
  },
  {
    slug: 'stress-echocardiogram',
    name: 'Stress Echocardiogram',
    tagline: 'Heart imaging at rest and under stress.',
    summary: 'An echocardiogram performed at rest and again under stress.',
    description:
      'Echocardiography at rest and during stress allows visualisation of left ventricular function, and of valvular structure and function. Echocardiography can be performed during or after several different types of physical stress. The test allows the heart to be assessed both at rest and while it is working harder.',
    category: 'diagnostic',
    icon: 'ultrasound-stress',
    image: {
      src: '/images/services/cardiac-imaging-assessment.webp',
      alt: 'Cardiologist reviewing a cardiac imaging assessment',
    },
  },
  {
    slug: '24-hour-blood-pressure-monitoring',
    name: '24hr Blood Pressure Monitoring',
    tagline: 'Blood pressure recorded across a full day.',
    summary: 'A portable monitor that records your blood pressure across a full day.',
    description:
      'A small monitor is worn for 24 hours and records your blood pressure at set intervals while you go about your normal activities, including overnight. It provides a picture of your blood pressure outside the clinic setting.',
    category: 'monitoring',
    icon: 'blood-pressure',
    image: {
      src: '/images/services/blood-pressure-monitoring.webp',
      alt: 'Clinician taking a blood pressure reading with an arm cuff',
    },
    needsClientCopy: true,
  },
  {
    slug: 'holter-monitoring',
    name: '24 Hour ECG (Holter) Monitoring',
    tagline: 'Continuous heart rhythm recording.',
    summary: 'A portable device that records your heart rhythm continuously.',
    description:
      'A Holter monitor is a small portable device that records your heart rate continuously. It performs the same function as an ECG, but monitors the heartbeat continuously rather than at a single point in time. The device is attached to the chest with leads that record your heartbeat while you continue your everyday activities. Because it is connected for much longer than a standard ECG, it can detect disturbances in heart rhythm that a resting ECG may not capture.',
    category: 'monitoring',
    icon: 'holter',
    image: {
      src: '/images/services/ecg-electrocardiogram.webp',
      alt: 'ECG electrodes attached to a patient for continuous heart rhythm recording',
    },
  },
  {
    slug: 'coronary-angiography-and-stenting',
    name: 'Coronary Angiography and Stenting',
    tagline: 'Imaging of the coronary arteries, with stenting where indicated.',
    summary: 'Catheter-based imaging of the coronary arteries, with stenting where indicated.',
    description:
      'Coronary angiography is a catheter-based procedure used to image the coronary arteries. Where a narrowing is identified, it may be treated during the same procedure with angioplasty and the placement of a stent. These procedures are performed in hospital.',
    category: 'interventional',
    icon: 'artery',
    image: {
      src: '/images/services/coronary-angiography.webp',
      alt: 'Cardiac imaging used in coronary angiography',
    },
    needsClientCopy: true,
  },
  {
    slug: 'device-checks',
    name: 'Device Checks',
    tagline: 'Review of an implanted pacemaker or defibrillator.',
    summary: 'Review of an implanted pacemaker or defibrillator to confirm it is working correctly.',
    description:
      'A device check reviews the function, settings and battery status of an implanted pacemaker or defibrillator, and downloads the information the device has recorded since your last visit.',
    category: 'electrophysiology',
    icon: 'device-check',
    needsClientCopy: true,
  },
  {
    slug: 'pacemaker-insertion',
    name: 'Pacemaker Insertion',
    tagline: 'Implantation of a pacemaker.',
    summary: 'Implantation of a pacemaker to treat a slow or irregular heart rhythm.',
    description:
      'A pacemaker is a small implanted device used in the management of slow or irregular heart rhythms. Dr Imran Kassam has expertise in device implantation and performs his procedural work at Macquarie University Hospital.',
    category: 'electrophysiology',
    icon: 'pacemaker',
    needsClientCopy: true,
  },
  {
    slug: 'defibrillator-insertion',
    name: 'Defibrillator Insertion',
    tagline: 'Implantation of a defibrillator.',
    summary: 'Implantation of a defibrillator for patients at risk of dangerous heart rhythms.',
    description:
      'An implantable defibrillator is a device used in the management of patients at risk of dangerous heart rhythms. Dr Imran Kassam has expertise in device implantation and performs his procedural work at Macquarie University Hospital.',
    category: 'electrophysiology',
    icon: 'defibrillator',
    needsClientCopy: true,
  },
  {
    slug: 'electrophysiology-studies',
    name: 'Electrophysiology Studies',
    tagline: 'Mapping the heart’s electrical conduction.',
    summary: 'A catheter-based study that maps the electrical conduction of the heart.',
    description:
      'An electrophysiology study is a catheter-based investigation used to assess the electrical conduction system of the heart and to identify the origin of an abnormal heart rhythm. Dr Imran Kassam has expertise in electrophysiological studies.',
    category: 'electrophysiology',
    icon: 'electrophysiology',
    needsClientCopy: true,
  },
  {
    slug: 'ablation-therapy',
    name: 'Ablation Therapy',
    tagline: 'Catheter treatment for certain abnormal rhythms.',
    summary: 'A catheter-based treatment for certain abnormal heart rhythms.',
    description:
      'Ablation therapy is a catheter-based treatment used for certain abnormal heart rhythms. It is generally performed following, or alongside, an electrophysiology study. Dr Imran Kassam has expertise in ablative therapy.',
    category: 'electrophysiology',
    icon: 'ablation',
    image: {
      src: '/images/services/ablation-therapy-procedure.webp',
      alt: 'Catheters in place during a cardiac ablation procedure',
    },
    needsClientCopy: true,
  },
];

/**
 * Additional monitoring options listed on the existing website.
 *
 * The source site carried placeholder (lorem ipsum) text for all four, so no
 * description is published here. These are proprietary device names and must be
 * described by the practice — see CONTENT-AUDIT.md.
 */
export const additionalServices: { name: string }[] = [
  { name: 'Vigo Life 1 Week Heart Monitor' },
  { name: 'Heart Bug' },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

/** Services surfaced on the homepage grid. */
export const featuredServiceSlugs = [
  'cardiac-consultation',
  'ecg',
  'echocardiogram',
  'stress-ecg',
  'holter-monitoring',
  'coronary-angiography-and-stenting',
] as const;
