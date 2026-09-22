import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import type { Service } from '@/lib/types';
import { cn } from '@/lib/cn';

interface ServiceCardProps {
  service: Service;
  /** `compact` is icon-led for grids; `feature` leads with the photograph. */
  variant?: 'compact' | 'feature';
  className?: string;
}

export function ServiceCard({ service, variant = 'compact', className }: ServiceCardProps) {
  const href = `/services/${service.slug}`;
  const showImage = variant === 'feature' && Boolean(service.image);

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-ink-100 bg-white',
        'transition-[border-color,box-shadow,transform] duration-300 ease-out-soft',
        'hover:-translate-y-1 hover:border-crimson-200 hover:shadow-card focus-within:shadow-card',
        className
      )}
    >
      {showImage && service.image && (
        <div className="relative aspect-3/2 overflow-hidden bg-ink-50">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-600 ease-out-soft group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className={cn('flex flex-1 items-start gap-4', showImage ? 'p-6' : 'p-6 sm:p-7')}>
        {!showImage && (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-crimson-50 text-crimson-600 transition-colors duration-300 group-hover:bg-crimson-600 group-hover:text-white">
            <Icon name={service.icon} size={24} />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg leading-snug font-semibold text-ink-900">
            <Link href={href} className="rounded-sm before:absolute before:inset-0 before:content-['']">
              {service.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">{service.tagline}</p>
        </div>

        <Icon
          name="arrow-right"
          size={18}
          className="mt-1 shrink-0 text-ink-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-crimson-600"
        />
      </div>
    </article>
  );
}
