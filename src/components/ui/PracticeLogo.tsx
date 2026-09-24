import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface PracticeLogoProps {
  /** Which of the two trading names to render. */
  practice: 'drummoyne' | 'bowral';
  /** `light` renders the lockup for use on the dark footer. */
  tone?: 'default' | 'light';
  /** Rendered width in pixels; the lockup scales to fit. */
  width?: number;
  className?: string;
  priority?: boolean;
  /** Wrap the lockup in a link to the homepage. */
  asLink?: boolean;
}

const DRUMMOYNE_ASPECT = 794 / 264;

/**
 * Brand lockup for one of the two practices.
 *
 * Drummoyne Advanced Cardiology has supplied artwork, so its logo is rendered
 * from the file. The practice has not supplied artwork for Southern Highlands
 * Heart Centre, so that lockup is set typographically here — a green heart-and-
 * leaf mark beside the name — to match the arrangement in the approved design.
 * Swap in a real file here if the client provides one; see CONTENT-AUDIT.md.
 */
export function PracticeLogo({
  practice,
  tone = 'default',
  width = 180,
  className,
  priority = false,
  asLink = true,
}: PracticeLogoProps) {
  const light = tone === 'light';

  const content =
    practice === 'drummoyne' ? (
      <Image
        src={
          light
            ? '/images/branding/advanced-cardiology-logo-light.png'
            : '/images/branding/advanced-cardiology-logo.png'
        }
        alt="Drummoyne Advanced Cardiology"
        width={width}
        height={Math.round(width / DRUMMOYNE_ASPECT)}
        priority={priority}
        sizes={`${width}px`}
        className="h-auto w-full"
      />
    ) : (
      <span
        className="flex items-center gap-1.5"
        style={{ fontSize: `${width / 190}rem` }}
        role="img"
        aria-label="Southern Highlands Heart Centre"
      >
        <svg
          viewBox="0 0 26 24"
          aria-hidden="true"
          focusable="false"
          className="w-[1.6em] shrink-0"
          fill="none"
        >
          <path
            d="M12.4 21.4C8.3 18.1 3.4 14.6 3.4 9.9 3.4 6.7 5.9 4.2 9 4.2c1.6 0 3 .7 3.9 1.8"
            stroke={light ? '#9ed37f' : 'var(--color-sage-600)'}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M12.4 21.4c4.1-3.3 9-6.8 9-11.5 0-1.5-.6-2.9-1.5-3.9"
            stroke={light ? '#9ed37f' : 'var(--color-sage-500)'}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M15.6 6.2c.6-2.6 2.9-4.5 5.6-4.7.4 2.7-1.1 5.3-3.6 6.4"
            fill={light ? '#9ed37f' : 'var(--color-sage-500)'}
          />
        </svg>

        <span className="leading-none">
          <span
            className={cn(
              'block font-script text-[1.32em] leading-[1] font-semibold whitespace-nowrap',
              light ? 'text-sage-400' : 'text-sage-600'
            )}
          >
            Southern Highlands
          </span>
          <span
            className={cn(
              'mt-[0.18em] block font-serif text-[0.64em] leading-none font-semibold tracking-[0.2em] whitespace-nowrap uppercase',
              light ? 'text-white' : 'text-ink-900'
            )}
          >
            Heart Centre
          </span>
        </span>
      </span>
    );

  if (!asLink) {
    return (
      <span className={cn('block shrink-0', className)} style={{ width }}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href="/"
      className={cn('block shrink-0 rounded-sm', className)}
      style={{ width }}
      aria-label={
        practice === 'drummoyne'
          ? 'Drummoyne Advanced Cardiology — go to homepage'
          : 'Southern Highlands Heart Centre — go to homepage'
      }
    >
      {content}
    </Link>
  );
}
