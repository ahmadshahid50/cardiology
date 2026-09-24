import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import type { Doctor } from '@/lib/types';
import { cn } from '@/lib/cn';

interface DoctorCardProps {
  doctor: Doctor;
  /** `row` places the photograph beside the name; `stacked` puts it above. */
  variant?: 'row' | 'stacked';
  /**
   * Heading level for the doctor's name. Use `h2` where the cards are the
   * page's primary content and sit directly under the h1, and `h3` where they
   * follow a section heading — so the document outline never skips a level.
   */
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

export function DoctorCard({
  doctor,
  variant = 'row',
  headingLevel: Heading = 'h3',
  className,
}: DoctorCardProps) {
  const href = `/cardiologists/${doctor.slug}`;
  const stacked = variant === 'stacked';

  return (
    <article
      className={cn(
        'group relative rounded-lg border border-ink-100 bg-white',
        'transition-[border-color,box-shadow,transform] duration-300 ease-out-soft',
        'hover:-translate-y-0.5 hover:border-crimson-200 hover:shadow-card focus-within:shadow-card',
        stacked ? 'flex flex-col overflow-hidden' : 'flex flex-row items-center gap-4 p-4 sm:gap-6 sm:p-5',
        className
      )}
    >
      <div
        className={cn(
          'relative shrink-0 overflow-hidden bg-ink-100',
          stacked ? 'aspect-4/5 w-full' : 'aspect-square w-24 rounded-md sm:w-30 lg:w-33'
        )}
      >
        <Image
          src={doctor.image.src}
          alt={doctor.image.alt}
          fill
          sizes={stacked ? '(max-width: 640px) 100vw, 33vw' : '140px'}
          className="object-cover object-top transition-transform duration-600 ease-out-soft group-hover:scale-[1.04]"
        />
      </div>

      <div className={cn('flex flex-1 flex-col justify-center', stacked && 'p-6 sm:p-7')}>
        <Heading className="font-serif text-[1.125rem] leading-snug font-bold text-ink-900">
          <Link href={href} className="rounded-sm before:absolute before:inset-0 before:content-['']">
            {doctor.name}
          </Link>
        </Heading>

        <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">{doctor.title}</p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink-900 underline decoration-ink-300 underline-offset-[5px] transition-colors group-hover:text-crimson-600 group-hover:decoration-crimson-400">
          View Profile
          <Icon
            name="arrow-right"
            size={16}
            className="no-underline transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </article>
  );
}
