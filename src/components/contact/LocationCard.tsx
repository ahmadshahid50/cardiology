import { Icon } from '@/components/ui/Icon';
import { openingHours, telHref } from '@/data/site';
import type { Location } from '@/lib/types';
import { cn } from '@/lib/cn';

interface LocationCardProps {
  location: Location;
  /** Renders the embedded Google map. Off by default to keep pages light. */
  withMap?: boolean;
  className?: string;
}

export function LocationCard({ location, withMap = false, className }: LocationCardProps) {
  return (
    <section
      id={location.slug}
      aria-labelledby={`${location.slug}-heading`}
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-ink-100 bg-white shadow-subtle',
        className
      )}
    >
      {withMap && (
        <div className="relative aspect-16/10 w-full bg-ink-100 sm:aspect-2/1">
          <iframe
            src={location.mapEmbedUrl}
            title={`Map showing the location of ${location.name}, ${location.addressLines.join(', ')}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 id={`${location.slug}-heading`} className="font-serif text-xl font-semibold text-ink-900">
          {location.name}
        </h3>

        <dl className="mt-5 flex-1 space-y-4">
          <div className="flex items-start gap-3.5">
            <dt className="mt-0.5 shrink-0 text-crimson-600">
              <Icon name="pin" size={19} />
              <span className="sr-only">Address</span>
            </dt>
            <dd>
              <address className="text-[0.9375rem] leading-relaxed text-ink-700 not-italic">
                {location.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={location.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-crimson-700 underline-offset-4 hover:underline"
              >
                Get directions
                <Icon name="external" size={14} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </dd>
          </div>

          <div className="flex items-start gap-3.5">
            <dt className="mt-0.5 shrink-0 text-crimson-600">
              <Icon name="phone" size={19} />
              <span className="sr-only">Phone</span>
            </dt>
            <dd className="space-y-0.5">
              {location.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="block rounded-sm text-[0.9375rem] font-medium text-ink-800 underline-offset-4 transition-colors hover:text-crimson-700 hover:underline"
                >
                  {phone}
                </a>
              ))}
            </dd>
          </div>

          <div className="flex items-start gap-3.5">
            <dt className="mt-0.5 shrink-0 text-crimson-600">
              <Icon name="mail" size={19} />
              <span className="sr-only">Email</span>
            </dt>
            <dd>
              <a
                href={`mailto:${location.email}`}
                className="rounded-sm text-[0.9375rem] break-all text-ink-800 underline-offset-4 transition-colors hover:text-crimson-700 hover:underline"
              >
                {location.email}
              </a>
            </dd>
          </div>

          <div className="flex items-start gap-3.5">
            <dt className="mt-0.5 shrink-0 text-crimson-600">
              <Icon name="clock" size={19} />
              <span className="sr-only">Opening hours</span>
            </dt>
            <dd className="text-[0.9375rem] text-ink-700">
              {openingHours.days}
              <span className="mt-0.5 block font-medium text-ink-900">{openingHours.hours}</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
