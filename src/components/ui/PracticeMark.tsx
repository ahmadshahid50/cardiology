import Image from 'next/image';
import { cn } from '@/lib/cn';
import type { Location } from '@/lib/types';

interface PracticeMarkProps {
  location: Location;
  tone?: 'default' | 'light';
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Name lockup for one of the two practices.
 *
 * The practice supplied artwork for Drummoyne Advanced Cardiology only, so
 * Southern Highlands Heart Centre is set typographically using the shared heart
 * mark taken from that artwork. If the client provides a Southern Highlands
 * logo, swap it in here — see CONTENT-AUDIT.md.
 */
export function PracticeMark({
  location,
  tone = 'default',
  className,
  size = 'md',
}: PracticeMarkProps) {
  const light = tone === 'light';
  const markSize = size === 'sm' ? 22 : 30;

  /* "Southern Highlands / Heart Centre" and "Drummoyne / Advanced Cardiology"
     both read best split across two lines. */
  const words = location.name.split(' ');
  const splitAt = location.slug === 'drummoyne' ? 1 : 2;
  const line1 = words.slice(0, splitAt).join(' ');
  const line2 = words.slice(splitAt).join(' ');

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <Image
        src="/images/branding/heart-mark.png"
        alt=""
        width={markSize}
        height={Math.round(markSize * (129 / 144))}
        className="shrink-0"
        aria-hidden="true"
      />
      <span className="leading-tight">
        <span
          className={cn(
            'block font-serif font-semibold tracking-tight',
            size === 'sm' ? 'text-[0.8125rem]' : 'text-[0.9375rem]',
            light ? 'text-white' : 'text-ink-900'
          )}
        >
          {line1}
        </span>
        <span
          className={cn(
            'block font-sans tracking-[0.06em] uppercase',
            size === 'sm' ? 'text-[0.625rem]' : 'text-[0.6875rem]',
            light ? 'text-ink-300' : 'text-ink-500'
          )}
        >
          {line2}
        </span>
      </span>
    </span>
  );
}
