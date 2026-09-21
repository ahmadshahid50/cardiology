import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import type { Service } from '@/lib/types';
import { cn } from '@/lib/cn';

interface ServiceCardProps {
  service: Service;
  /** `feature` shows the photograph, `compact` is icon-only. */
  variant?: 'feature' | 'compact';
  className?: string;
}

export function ServiceCard({ service, variant = 'feature', className }: ServiceCardProps) {
  const href = `/services/${service.slug}`;
  const showImage = variant === 'feature' && Boolean(service.image);

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border border-ink-100 bg-white',
        'transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card',
        'focus-within:border-ink-200 focus-within:shadow-card',
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
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {!showImage && (
          <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md bg-crimson-50 text-crimson-600">
            <Icon name={service.icon} size={22} />
          </span>
        )}

        <h3 className="font-serif text-xl font-semibold text-ink-900">
          <Link href={href} className="rounded-sm before:absolute before:inset-0 before:content-['']">
            {service.name}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
          {service.summary}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-crimson-700">
          Learn more
          <Icon
            name="arrow-right"
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
