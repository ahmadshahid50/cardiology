'use client';

import { useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { enquiryTypes, validateEnquiry, type EnquiryErrors } from '@/lib/enquiry';
import { locations, telHref } from '@/data/site';
import { services } from '@/data/services';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldBase =
  'w-full rounded-md border bg-white px-3.5 py-2.5 text-[0.9375rem] text-ink-900 ' +
  'placeholder:text-ink-400 transition-colors ' +
  'focus:border-crimson-600 focus:ring-2 focus:ring-crimson-600/15 focus:outline-none';

export function EnquiryForm() {
  const formId = useId();
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const field = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      location: String(data.get('location') ?? ''),
      enquiryType: String(data.get('enquiryType') ?? ''),
      service: String(data.get('service') ?? ''),
      message: String(data.get('message') ?? ''),
      consent: data.get('consent') === 'on',
      company: String(data.get('company') ?? ''),
    };

    const { errors: clientErrors } = validateEnquiry(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus('idle');
      setServerMessage(null);
      /* Move focus to the summary so the errors are announced. */
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus('submitting');
    setServerMessage(null);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        setStatus('success');
        form.reset();
        return;
      }

      if (result.errors) setErrors(result.errors as EnquiryErrors);
      setServerMessage(
        typeof result.message === 'string'
          ? result.message
          : 'Please check the highlighted fields and try again.'
      );
      setStatus('error');
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setServerMessage(
        'We could not send your enquiry just now. Please call us and our reception team will help you.'
      );
      setStatus('error');
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-lg border border-ink-100 bg-white p-8 text-center shadow-subtle"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-crimson-50 text-crimson-600">
          <Icon name="check" size={28} strokeWidth={2} />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-ink-900">Thank you</h3>
        <p className="mx-auto mt-3 max-w-md text-[1.0625rem] leading-relaxed text-ink-600">
          Your enquiry has been sent to our reception team. We will be in touch during our opening
          hours, Monday to Friday.
        </p>
        <p className="mt-5 text-[0.9375rem] text-ink-600">
          If your matter is urgent, please call us directly.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {locations.map((location) => (
            <a
              key={location.slug}
              href={telHref(location.phones[0]!)}
              className="inline-flex items-center gap-2 rounded-sm font-semibold text-crimson-700 underline-offset-4 hover:underline"
            >
              <Icon name="phone" size={16} />
              {location.shortName} {location.phones[0]}
            </a>
          ))}
        </div>
        <Button
          variant="secondary"
          className="mt-7"
          onClick={() => {
            setStatus('idle');
            setServerMessage(null);
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const errorEntries = Object.entries(errors).filter(([, message]) => Boolean(message));
  const showSummary = errorEntries.length > 0 || Boolean(serverMessage);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Error summary — focusable so it can be announced on failure. */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        role={showSummary ? 'alert' : undefined}
        className={cn(
          'rounded-md border border-crimson-200 bg-crimson-50 p-4',
          !showSummary && 'hidden'
        )}
      >
        <p className="flex items-start gap-2.5 font-medium text-crimson-800">
          <Icon name="close" size={17} className="mt-0.5 shrink-0" strokeWidth={2} />
          <span>{serverMessage ?? 'Please check the following before sending your enquiry:'}</span>
        </p>
        {errorEntries.length > 0 && (
          <ul className="mt-2.5 ml-8 list-disc space-y-1 text-[0.9375rem] text-crimson-800">
            {errorEntries.map(([name, message]) => (
              <li key={name}>
                <a href={`#${field(name)}`} className="underline underline-offset-4">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={field('name')}
          name="name"
          label="Full name"
          autoComplete="name"
          required
          error={errors.name}
          errorId={errorId('name')}
        />
        <Field
          id={field('phone')}
          name="phone"
          type="tel"
          label="Phone"
          autoComplete="tel"
          required
          error={errors.phone}
          errorId={errorId('phone')}
        />
      </div>

      <Field
        id={field('email')}
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        required
        error={errors.email}
        errorId={errorId('email')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={field('location')} required>
            Preferred rooms
          </Label>
          <select
            id={field('location')}
            name="location"
            required
            defaultValue=""
            aria-describedby={errors.location ? errorId('location') : undefined}
            aria-invalid={errors.location ? true : undefined}
            className={cn(fieldBase, errors.location ? 'border-crimson-500' : 'border-ink-200')}
          >
            <option value="" disabled>
              Select a location
            </option>
            {locations.map((location) => (
              <option key={location.slug} value={location.slug}>
                {location.name} — {location.suburb}
              </option>
            ))}
          </select>
          <FieldError id={errorId('location')} message={errors.location} />
        </div>

        <div>
          <Label htmlFor={field('enquiryType')} required>
            Type of enquiry
          </Label>
          <select
            id={field('enquiryType')}
            name="enquiryType"
            required
            defaultValue=""
            aria-describedby={errors.enquiryType ? errorId('enquiryType') : undefined}
            aria-invalid={errors.enquiryType ? true : undefined}
            className={cn(fieldBase, errors.enquiryType ? 'border-crimson-500' : 'border-ink-200')}
          >
            <option value="" disabled>
              Select an option
            </option>
            {enquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <FieldError id={errorId('enquiryType')} message={errors.enquiryType} />
        </div>
      </div>

      <div>
        <Label htmlFor={field('service')}>Service of interest (optional)</Label>
        <select
          id={field('service')}
          name="service"
          defaultValue=""
          className={cn(fieldBase, 'border-ink-200')}
        >
          <option value="">Not sure / not applicable</option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor={field('message')} required>
          How can we help?
        </Label>
        <textarea
          id={field('message')}
          name="message"
          rows={5}
          required
          placeholder="Let us know what you need, and any preferred days or times."
          aria-describedby={cn(
            `${field('message')}-hint`,
            errors.message ? errorId('message') : ''
          ).trim()}
          aria-invalid={errors.message ? true : undefined}
          className={cn(
            fieldBase,
            'resize-y',
            errors.message ? 'border-crimson-500' : 'border-ink-200'
          )}
        />
        <p id={`${field('message')}-hint`} className="mt-1.5 text-sm text-ink-500">
          Please do not include sensitive medical details in this form.
        </p>
        <FieldError id={errorId('message')} message={errors.message} />
      </div>

      {/* Honeypot — hidden from users and assistive technology. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={field('company')}>Company</label>
        <input id={field('company')} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={field('consent')}
            name="consent"
            type="checkbox"
            required
            aria-describedby={errors.consent ? errorId('consent') : undefined}
            aria-invalid={errors.consent ? true : undefined}
            className="mt-1 h-[18px] w-[18px] shrink-0 rounded border-ink-300 text-crimson-600 accent-crimson-600"
          />
          <label htmlFor={field('consent')} className="text-[0.9375rem] leading-relaxed text-ink-600">
            I agree to Advanced Cardiology contacting me about this enquiry, in line with the{' '}
            <a
              href="/privacy-policy"
              className="font-medium text-crimson-700 underline underline-offset-4"
            >
              Privacy Policy
            </a>
            .
          </label>
        </div>
        <FieldError id={errorId('consent')} message={errors.consent} />
      </div>

      <div className="flex flex-col gap-4 border-t border-ink-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-500">
          In an emergency, call <strong className="font-semibold text-ink-800">000</strong>.
        </p>
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
          {status !== 'submitting' && <Icon name="arrow-right" size={18} />}
        </Button>
      </div>

      {/* Polite live region for the submitting state. */}
      <p className="sr-only" role="status">
        {status === 'submitting' ? 'Sending your enquiry.' : ''}
      </p>
    </form>
  );
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[0.9375rem] font-medium text-ink-800">
      {children}
      {required && (
        <span className="ml-0.5 text-crimson-600" aria-hidden="true">
          *
        </span>
      )}
      {required && <span className="sr-only"> (required)</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-crimson-700">
      {message}
    </p>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  errorId: string;
}

function Field({ id, name, label, type = 'text', autoComplete, required, error, errorId }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        className={cn(fieldBase, error ? 'border-crimson-500' : 'border-ink-200')}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
