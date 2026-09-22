import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { openingHours, telHref } from '@/data/site';
import type { Location } from '@/lib/types';
import { cn } from '@/lib/cn';

interface LocationCardProps {
  location: Location;
  /**
   * Shows the embedded Google map as the card's visual. The practice has not
   * supplied exterior or interior photography of either set of rooms, so the
   * map doubles as the image — it is accurate and directly useful.
   * See CONTENT-AUDIT.md.
   */
  withMap?: boolean;
  className?: string;
}

export function LocationCard({ location, withMap = true, className }: LocationCardProps) {
  return (
    <section
      id={location.slug}
      aria-labelledby={`${location.slug}-heading`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-ink-100 bg-white',
        'transition-[border-color,box-shadow] duration-300 hover:border-crimson-200 hover:shadow-card',
        className
      )}
    >
      {withMap && (
        <div className="relative aspect-16/10 w-full overflow-hidden bg-ink-100 sm:aspect-2/1">
          {/*
            Fallback sits underneath the map. Google's embed occasionally fails
            to paint (quota, blocked third-party frames, offline), which would
            otherwise leave an empty grey panel — this keeps the address and a
            working link visible in that case.
          */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-100 px-6 text-center">
            <Icon name="pin" size={24} className="text-crimson-600" />
            <p className="text-[0.9375rem] font-medium text-ink-700">
              {location.addressLines.join(', ')}
            </p>
            <a
              href={location.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-crimson-700 underline underline-offset-4"
            >
              Open in Google Maps
            </a>
          </div>
          <iframe
            src={location.mapEmbedUrl}
            title={`Map showing ${location.name}, ${location.addressLines.join(', ')}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3
          id={`${location.slug}-heading`}
          className="font-serif text-xl leading-snug font-semibold text-ink-900"
        >
          {location.name}
        </h3>

        <dl className="mt-5 flex-1 space-y-3.5">
          <div className="flex items-start gap-3">
            <dt className="mt-0.5 shrink-0 text-crimson-600">
              <Icon name="pin" size={18} />
              <span className="sr-only">Address</span>
            </dt>
            <dd>
              <address className="text-[0.9375rem] leading-relaxed text-ink-700 not-italic">
                {location.addressLines.join(', ')}
              </address>
            </dd>
          </div>

          <div className="flex items-start gap-3">
            <dt className="mt-0.5 shrink-0 text-crimson-600">
              <Icon name="phone" size={18} />
              <span className="sr-only">Phone</span>
            </dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-0.5">
              {location.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="rounded-sm text-[0.9375rem] font-medium text-ink-800 underline-offset-4 transition-colors hover:text-crimson-700 hover:underline"
                >
                  {phone}
                </a>
              ))}
            </dd>
          </div>

          <div className="flex items-start gap-3">
            <dt className="mt-0.5 shrink-0 text-crimson-600">
              <Icon name="clock" size={18} />
              <span className="sr-only">Opening hours</span>
            </dt>
            <dd className="text-[0.9375rem] text-ink-700">
              {openingHours.days}
              <span className="block font-medium text-ink-900">{openingHours.hours}</span>
            </dd>
          </div>

          <div className="flex items-start gap-3">
            <dt className="mt-0.5 shrink-0 text-crimson-600">
              <Icon name="mail" size={18} />
              <span className="sr-only">Email</span>
            </dt>
            <dd>
              <a
                href={`mailto:${location.email}`}
                className="rounded-sm text-[0.9375rem] break-all text-ink-700 underline-offset-4 transition-colors hover:text-crimson-700 hover:underline"
              >
                {location.email}
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
          <Button href={telHref(location.phones[0]!)} size="sm" className="w-full">
            <Icon name="phone" size={15} />
            Call {location.phones[0]}
          </Button>
          <Button
            href={location.mapLinkUrl}
            variant="secondary"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Icon name="pin" size={15} />
            Get Directions
            <span className="sr-only">to {location.name} (opens in a new tab)</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
