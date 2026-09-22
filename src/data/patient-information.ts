import type {
  Faq,
  JourneyStep,
  PatientInfoSection,
  PatientResource,
  PracticeValue,
} from '@/lib/types';

/**
 * Patient-facing explanatory content.
 *
 * Migrated from the long-form section of the existing website's homepage.
 * Editing has been limited to grammar, punctuation, sentence structure and the
 * removal of repeated location keywords that had been appended to headings
 * ("Echocardiography Sydney", "Holter monitor test Sydney"). No clinical
 * statement has been added, removed or changed in meaning.
 */

export const patientInfoSections: PatientInfoSection[] = [
  {
    id: 'who-should-see-a-cardiologist',
    heading: 'Who should see a cardiologist?',
    body: [
      'Ideally, everyone should see a cardiologist from time to time, especially since early heart conditions usually show no apparent symptoms. An example is stage B of heart failure (CHF). Since the condition is asymptomatic, the patient may be unaware of their condition unless they undergo regular checkups. If timely medical attention is not sought, the condition may persist, with the patient beginning to show symptoms such as difficulty breathing and fatigue.',
      'Many heart diseases can be prevented. You may know if you are at risk of this condition by seeing a cardiologist and having a few tests. Those who are already in a critical condition should consult a cardiologist so that treatment can begin as soon as possible.',
      'The results of a cardiology consultation vary from person to person. Some people may find that they need immediate treatment, while others may have a healthy heart and need to continue living a healthy lifestyle.',
    ],
  },
  {
    id: 'how-the-process-works',
    heading: 'How does the process work?',
    body: [
      'Cardiac consultation procedures may vary, but usually include an interview, a physical examination, other tests as required, and a diagnosis of the patient’s condition.',
      'Depending on the findings, your cardiologist may discuss:',
    ],
    subsections: [
      {
        heading: 'What may be discussed',
        body: [
          'Lifestyle changes, which may include quitting smoking, eating a healthy diet and exercising',
          'Medications, which may address blood pressure, LDL cholesterol and other risk factors',
          'Cardiac rehabilitation',
          'Procedures such as angioplasty and coronary artery bypass grafting',
        ],
      },
      {
        heading: 'Possible risks and problems',
        body: [
          'Consulting a cardiologist usually does not involve treatment, so it is unlikely that you will experience any risky procedures or potential complications. However, you may need to have tests such as an x-ray, which is usually safe at any age, with the exception of pregnant women.',
        ],
      },
    ],
  },
  {
    id: 'echocardiography',
    heading: 'What is an echocardiogram?',
    body: [
      'Echocardiography is a powerful diagnostic tool. When used carefully by the right doctor and in the right patient, it can significantly benefit patients who present with cardiovascular symptoms in primary care.',
      'It can also be used for patients who describe severe symptoms of potentially life-threatening heart disease, even in the patient’s home, allowing direct referral to the most appropriate second-line care team. The risk of its indiscriminate use should be minimised with careful training and demonstration of continuity. Where the training and safety aspects are addressed satisfactorily, echocardiography can be used effectively and extensively in primary care for the benefit of patients.',
    ],
  },
  {
    id: 'stress-echocardiogram',
    heading: 'Why is a stress echocardiogram important?',
    body: [
      'The heart’s response to changes in our environment is probably more important than how the heart works at rest. For this reason, the stress echocardiogram has become important in diagnosing and monitoring treatment outcomes.',
      'Echocardiography at rest and during stress allows visualisation of left ventricular function, and of valvular formation and function. Echocardiography can be performed during or after several different types of physical, or even mental, stress.',
      'The benefits of stress echocardiography include its accurate detection, relatively low cost, and increasing value, because it allows the separation of cardiac anatomy and myocardial response to a potential ischaemic stimulus. Echocardiography also has the potential to detect myocardial perfusion, wall movement and wall stiffness.',
    ],
  },
  {
    id: 'holter-monitor',
    heading: 'What is a Holter monitor?',
    body: [
      'A Holter monitor is a small device that records your heart rate. It performs the same function as an ECG, but it helps to monitor the heartbeat continuously. A Holter monitor test is recommended by doctors when they need to check a patient’s heart condition over a few days.',
      'The portable device is attached to the patient’s chest, near the heart. The Holter monitor has cords that connect to electrodes, which continuously record your heartbeat. Physicians often recommend Holter monitoring after a patient’s physical examination and ECG.',
    ],
    subsections: [
      {
        heading: 'How does a Holter monitor test help?',
        body: [
          'The great advantage of a Holter monitor test is that it is a portable device. Patients can wear it for a set period while continuing their everyday activities. The machine records the patient’s heartbeat and assists physicians in determining whether a patient’s heart condition is normal or not.',
          'Holter monitoring is very accurate in detecting any disturbance in the heart rhythm, as it is connected to the heart much longer than an ECG. For this reason, Holter monitoring is considered more reliable for doctors than an ECG alone.',
        ],
      },
    ],
  },
];

/**
 * FAQs. Each question and answer is drawn from the explanatory content above,
 * which was published on the existing website. Nothing here is new clinical
 * information.
 */
export const faqs: Faq[] = [
  {
    question: 'Do I need a referral to see a cardiologist?',
    answer:
      'Please contact the practice on (02) 9819 7011 for Drummoyne, or (02) 4862 1855 for Bowral, and our reception team will confirm what you need to bring to your appointment and how to arrange a referral.',
  },
  {
    question: 'Who should see a cardiologist?',
    answer:
      'Ideally, everyone should see a cardiologist from time to time, especially since early heart conditions usually show no apparent symptoms. Many heart diseases can be prevented, and you may learn whether you are at risk by seeing a cardiologist and having a few tests. Those who are already in a critical condition should consult a cardiologist so that treatment can begin as soon as possible.',
  },
  {
    question: 'What happens during a cardiac consultation?',
    answer:
      'Cardiac consultation procedures may vary, but usually include an interview, a physical examination, other tests as required, and a diagnosis of your condition. Depending on the findings, your cardiologist may discuss lifestyle changes, medications, cardiac rehabilitation, or procedures such as angioplasty and coronary artery bypass grafting.',
  },
  {
    question: 'Are there risks involved in seeing a cardiologist?',
    answer:
      'Consulting a cardiologist usually does not involve treatment, so it is unlikely that you will experience any risky procedures or potential complications. However, you may need to have tests such as an x-ray, which is usually safe at any age, with the exception of pregnant women.',
  },
  {
    question: 'What is the difference between an ECG and a Holter monitor?',
    answer:
      'A Holter monitor performs the same function as an ECG, but records your heartbeat continuously rather than at a single point in time. The portable device is attached to your chest and records while you continue your everyday activities. Because it is connected for much longer than an ECG, it is very accurate in detecting disturbances in heart rhythm.',
  },
  {
    question: 'What is an echocardiogram?',
    answer:
      'An echocardiogram is an ultrasound scan of the heart, and a powerful diagnostic tool. When used carefully by the right doctor and in the right patient, it can significantly benefit patients who present with cardiovascular symptoms in primary care.',
  },
  {
    question: 'Why might I need a stress echocardiogram rather than a resting one?',
    answer:
      'The heart’s response to changes in our environment is probably more important than how the heart works at rest. Echocardiography at rest and during stress allows visualisation of left ventricular function, and of valvular formation and function, so your cardiologist can assess the heart both at rest and while it is working harder.',
  },
  {
    question: 'What are your opening hours?',
    answer:
      'Both practices are open 8:30am to 5:00pm, Monday to Friday.',
  },
];

/**
 * How to arrange care with the practice. Steps describe only the contact and
 * consultation workflow evidenced by the existing website (phone and email
 * enquiry, consultation, testing as required, follow-up).
 */
export const patientJourney: JourneyStep[] = [
  {
    title: 'Get in touch',
    description:
      'Call the rooms closest to you, or send us an enquiry. Our reception team will let you know what to bring, including your referral and any previous test results.',
  },
  {
    title: 'Book your appointment',
    description:
      'We will arrange a time with the cardiologist best suited to your needs, at either our Drummoyne or Bowral rooms.',
  },
  {
    title: 'Attend your consultation',
    description:
      'Your consultation usually includes a discussion of your symptoms and history, a physical examination, and any further tests that are required.',
  },
  {
    title: 'Assessment and follow-up',
    description:
      'Your cardiologist will discuss their findings with you and, where appropriate, arrange further testing, treatment or ongoing review — keeping your referring doctor informed.',
  },
];

/**
 * Practice values.
 *
 * Drawn only from statements published on the existing website: expertise
 * across the major disciplines of cardiology, public and private hospital
 * affiliations, on-site facilities, and the practice's stated commitment to
 * patient-focused care delivered with warmth and compassion.
 */
export const practiceValues: PracticeValue[] = [
  {
    title: 'Expertise',
    description: 'Expertise in each of the major disciplines of cardiology.',
    icon: 'shield',
  },
  {
    title: 'Hospital affiliated',
    description: 'Our cardiologists are affiliated with public and private hospitals.',
    icon: 'users',
  },
  {
    title: 'On-site facilities',
    description: 'State of the art facilities and friendly staff at both of our rooms.',
    icon: 'clipboard',
  },
  {
    title: 'Compassionate care',
    description: 'Patient focused clinical care, delivered with warmth and compassion.',
    icon: 'stethoscope',
  },
];

/**
 * Entry points into the practice's patient-facing information. Each links to
 * content that exists on this site — nothing is advertised that is not here.
 */
export const patientResources: PatientResource[] = [
  {
    title: 'Before your appointment',
    description: 'What to bring, and how to arrange a referral.',
    href: '/make-an-appointment',
    icon: 'clipboard',
  },
  {
    title: 'Your tests explained',
    description: 'What an echocardiogram, ECG or Holter monitor involves.',
    href: '/patient-information',
    icon: 'ultrasound',
  },
  {
    title: 'Common questions',
    description: 'Answers to the questions patients ask us most.',
    href: '/patient-information#patient-faqs',
    icon: 'stethoscope',
  },
  {
    title: 'Find our rooms',
    description: 'Addresses, opening hours and directions.',
    href: '/contact',
    icon: 'pin',
  },
];
