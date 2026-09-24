import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { openingHours, telHref } from '@/data/site';
import type { Location } from '@/lib/types';
import { cn } from '@/lib/cn';

interface LocationCardProps {
  location: Location;
  /**
   * `stacked` puts the map above the details and is used on the contact and
   * appointment pages; `row` sets the map beside them, as the homepage does.
   */
  layout?: 'stacked' | 'row';
  /**
   * Shows the embedded Google map as the card's visual. The practice has not
   * supplied exterior or interior photography of either set of rooms, so the
   * map doubles as the image — it is accurate and directly useful.
   * See CONTENT-AUDIT.md.
   */
  withMap?: boolean;
  className?: string;
}

export function LocationCard({
  location,
  layout = 'stacked',
  withMap = true,
  className,
}: LocationCardProps) {
  const row = layout === 'row';

  const map = (
    <div
      className={cn(
        'relative overflow-hidden bg-ink-100',
        row
          ? 'aspect-16/10 w-full shrink-0 rounded-md sm:aspect-4/5 sm:w-40 lg:w-44'
          : 'aspect-16/10 w-full sm:aspect-2/1'
      )}
    >
      {/*
        Fallback sits underneath the map. Google's embed occasionally fails
        to paint (quota, blocked third-party frames, offline), which would
        otherwise leave an empty grey panel — this keeps the address and a
        working link visible in that case.
      */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-100 px-4 text-center">
        <Icon name="pin" size={22} className="text-crimson-500" />
        <p className="text-[0.8125rem] font-medium text-ink-700">
          {location.addressLines.join(', ')}
        </p>
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
  );

  return (
    <section
      id={location.slug}
      aria-labelledby={`${location.slug}-heading`}
      className={cn(
        'group flex overflow-hidden rounded-lg border border-ink-100 bg-white',
        'transition-[border-color,box-shadow] duration-300 hover:border-crimson-200 hover:shadow-card',
        row ? 'flex-col gap-5 p-5 sm:flex-row sm:gap-6' : 'flex-col',
        className
      )}
    >
      {withMap && map}

      <div className={cn('flex flex-1 flex-col', row ? 'min-w-0' : 'p-6 sm:p-7')}>
        <h3
          id={`${location.slug}-heading`}
          className={cn(
            'font-serif leading-snug font-bold text-ink-900',
            row ? 'max-w-60 text-[1.125rem]' : 'text-xl'
          )}
        >
          {location.name}
        </h3>

        <dl className={cn('flex-1 space-y-3', row ? 'mt-4' : 'mt-5 space-y-3.5')}>
          <div className="flex items-start gap-3">
            <dt className="mt-0.5 shrink-0 text-crimson-500">
              <Icon name="pin" size={17} />
              <span className="sr-only">Address</span>
            </dt>
            <dd>
              <address className="text-[0.875rem] leading-relaxed text-ink-600 not-italic">
                {location.addressLines.join(', ')}
              </address>
            </dd>
          </div>

          <div className="flex items-start gap-3">
            <dt className="mt-0.5 shrink-0 text-crimson-500">
              <Icon name="phone" size={17} />
              <span className="sr-only">Phone</span>
            </dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-0.5">
              {(row ? location.phones.slice(0, 1) : location.phones).map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="rounded-sm text-[0.875rem] font-semibold text-crimson-600 underline-offset-4 transition-colors hover:text-crimson-700 hover:underline"
                >
                  {phone}
                </a>
              ))}
            </dd>
          </div>

          <div className="flex items-start gap-3">
            <dt className="mt-0.5 shrink-0 text-crimson-500">
              <Icon name="clock" size={17} />
              <span className="sr-only">Opening hours</span>
            </dt>
            <dd className="text-[0.875rem] leading-relaxed text-ink-600">
              {openingHours.days}
              <span className="block">{openingHours.hours}</span>
            </dd>
          </div>

          {!row && (
            <div className="flex items-start gap-3">
              <dt className="mt-0.5 shrink-0 text-crimson-500">
                <Icon name="mail" size={17} />
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
          )}
        </dl>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button
            href={telHref(location.phones[0]!)}
            size="sm"
            className={row ? 'px-3.5 text-[0.8125rem]' : undefined}
          >
            <Icon name="phone" size={15} />
            Call {location.phones[0]}
          </Button>
          <Button
            href={location.mapLinkUrl}
            variant="secondary"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            className={row ? 'px-3.5 text-[0.8125rem]' : undefined}
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
