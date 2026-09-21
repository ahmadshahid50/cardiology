import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { LegalProse } from '@/components/ui/LegalProse';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { locations, site } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Use',
  description:
    'Terms of use for the Drummoyne Advanced Cardiology and Southern Highlands Heart Centre website.',
  path: '/terms',
});

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Terms of Use', href: '/terms' },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        intro="The terms on which this website is made available."
        crumbs={crumbs}
      />

      <Container size="narrow" className="py-16 sm:py-20">
        <LegalProse>
          <p className="lead">
            This website is operated by {site.legalName}. By using it, you agree to these terms.
          </p>

          <h2>Information is general only</h2>
          <p>
            The content on this website is general information about our practice and the services we
            provide. It is not medical advice, and it is not a substitute for a consultation with a
            qualified health practitioner. Do not rely on this website to diagnose or treat a health
            problem.
          </p>
          <p>
            <strong>
              If you are experiencing chest pain or other urgent symptoms, call 000 or attend your
              nearest emergency department.
            </strong>
          </p>

          <h2>No practitioner–patient relationship</h2>
          <p>
            Using this website, or sending an enquiry through it, does not create a
            practitioner–patient relationship. That relationship begins only when you attend a
            consultation with one of our cardiologists.
          </p>

          <h2>Appointment requests</h2>
          <p>
            An appointment request sent through this website is a request only. It is not confirmed
            until our reception team has contacted you. The form is not monitored outside our opening
            hours of 8:30am to 5:00pm, Monday to Friday.
          </p>

          <h2>Accuracy and availability</h2>
          <p>
            We take care to keep this website accurate and current, but we do not warrant that it is
            free from error or that it will always be available. We may change the content of this
            website at any time without notice.
          </p>

          <h2>Third-party links and content</h2>
          <p>
            This website contains embedded maps provided by Google, and may link to other websites.
            We are not responsible for the content, availability or privacy practices of third-party
            services.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The text, images, logos and design of this website are owned by, or licensed to, the
            practice. You may view and print pages for your own personal use. You may not otherwise
            reproduce or republish any part of this website without our permission.
          </p>

          <h2>Privacy</h2>
          <p>
            Our handling of personal information is described in our{' '}
            <a href="/privacy-policy">Privacy Policy</a>.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of New South Wales, Australia.
          </p>

          <h2>Contact</h2>
          <p>If you have a question about these terms, please contact us:</p>
          <ul>
            {locations.map((location) => (
              <li key={location.slug}>
                <strong>{location.name}</strong> — {location.addressLines.join(', ')}.{' '}
                <a href={`mailto:${location.email}`}>{location.email}</a>, {location.phones[0]}.
              </li>
            ))}
          </ul>
        </LegalProse>
      </Container>

      <JsonLd data={breadcrumbSchema(crumbs)} id="schema-breadcrumb-terms" />
    </>
  );
}
