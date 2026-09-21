import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalProse } from '@/components/ui/LegalProse';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { locations, site } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Drummoyne Advanced Cardiology and Southern Highlands Heart Centre handle personal information collected through this website.',
  path: '/privacy-policy',
});

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How we handle personal information collected through this website."
        crumbs={crumbs}
      />

      <Container size="narrow" className="py-16 sm:py-20">
        <LegalProse>
          <p className="lead">
            {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting the
            privacy of the people who use this website. This policy explains what personal
            information this website collects, how it is used, and how you can contact us about it.
          </p>

          <h2>Information collected through this website</h2>
          <p>
            This website collects personal information only when you choose to send it to us using
            the enquiry or appointment request form. The information collected through that form is:
          </p>
          <ul>
            <li>your name;</li>
            <li>your email address;</li>
            <li>your contact phone number;</li>
            <li>which of our consulting rooms you would like to attend;</li>
            <li>the type of enquiry and, optionally, the service you are interested in; and</li>
            <li>the content of the message you write.</li>
          </ul>
          <p>
            The form asks you not to include sensitive medical details. Please discuss clinical
            matters with us by phone or in person rather than through this website.
          </p>

          <h2>How we use this information</h2>
          <p>
            Information submitted through the form is sent by email to the reception team at the
            location you select, and is used only to respond to your enquiry and to arrange or manage
            your appointment. We do not sell personal information, and we do not use it for marketing
            unless you separately ask us to.
          </p>

          <h2>Health records</h2>
          <p>
            Clinical records created when you attend a consultation are handled separately from this
            website, in line with our obligations under the{' '}
            <em>Privacy Act 1988</em> (Cth), the Australian Privacy Principles and the{' '}
            <em>Health Records and Information Privacy Act 2002</em> (NSW). Please contact our rooms
            directly if you would like to request access to, or correction of, your health record.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This website does not set advertising or tracking cookies, and does not run third-party
            analytics. Pages that display a map embed content from Google Maps; when a map loads,
            Google may collect information in accordance with its own privacy policy.
          </p>

          <h2>Storage and security</h2>
          <p>
            Enquiries sent through this website are transmitted over an encrypted connection and are
            delivered to our practice email accounts. We take reasonable steps to protect personal
            information from misuse, loss, and unauthorised access or disclosure. No method of
            transmission over the internet is completely secure, so please do not send sensitive
            information through the website form.
          </p>

          <h2>Disclosure</h2>
          <p>
            We may share information with third parties where it is necessary to provide your care —
            for example with your referring doctor, a hospital, or a pathology or imaging provider —
            or where we are required or authorised to do so by law.
          </p>

          <h2>Access, correction and complaints</h2>
          <p>
            You may ask us what personal information we hold about you, ask us to correct it, or make
            a complaint about how we have handled it. Please contact the rooms you attend:
          </p>
          <ul>
            {locations.map((location) => (
              <li key={location.slug}>
                <strong>{location.name}</strong> — {location.addressLines.join(', ')}.{' '}
                <a href={`mailto:${location.email}`}>{location.email}</a>, {location.phones[0]}.
              </li>
            ))}
          </ul>
          <p>
            If you are not satisfied with our response, you may contact the Office of the Australian
            Information Commissioner at{' '}
            <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">
              oaic.gov.au
            </a>
            , or the NSW Information and Privacy Commission at{' '}
            <a href="https://www.ipc.nsw.gov.au" target="_blank" rel="noopener noreferrer">
              ipc.nsw.gov.au
            </a>
            .
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The current version is always published on
            this page.
          </p>
        </LegalProse>
      </Container>

      <JsonLd data={breadcrumbSchema(crumbs)} id="schema-breadcrumb-privacy" />
    </>
  );
}
