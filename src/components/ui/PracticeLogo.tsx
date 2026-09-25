import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

type Practice = 'drummoyne' | 'bowral';

interface PracticeLogoProps {
  /** Which of the two trading names to render. */
  practice: Practice;
  /** `light` renders the lockup for use on the dark footer. */
  tone?: 'default' | 'light';
  /** Rendered width in pixels; height follows the artwork's aspect ratio. */
  width?: number;
  className?: string;
  priority?: boolean;
  /** Wrap the lockup in a link to the homepage. */
  asLink?: boolean;
}

/**
 * Brand lockup for one of the two practices.
 *
 * Both practices have supplied artwork, so each is rendered from its own file.
 * The `light` variants are recoloured for the navy footer: the wordmark is set
 * in white and the heart lifted to a brighter sage so it still reads.
 */
const artwork: Record<
  Practice,
  { src: string; lightSrc: string; alt: string; aspect: number }
> = {
  drummoyne: {
    src: '/images/branding/advanced-cardiology-logo.png',
    lightSrc: '/images/branding/advanced-cardiology-logo-light.png',
    alt: 'Drummoyne Advanced Cardiology',
    aspect: 794 / 264,
  },
  bowral: {
    src: '/images/branding/southern-highlands-heart-centre-logo.png',
    lightSrc: '/images/branding/southern-highlands-heart-centre-logo-light.png',
    alt: 'Southern Highlands Heart Centre',
    aspect: 760 / 260,
  },
};

export function PracticeLogo({
  practice,
  tone = 'default',
  width = 180,
  className,
  priority = false,
  asLink = true,
}: PracticeLogoProps) {
  const { src, lightSrc, alt, aspect } = artwork[practice];

  const image = (
    <Image
      src={tone === 'light' ? lightSrc : src}
      alt={alt}
      width={width}
      height={Math.round(width / aspect)}
      priority={priority}
      sizes={`${width}px`}
      className="h-auto w-full"
    />
  );

  if (!asLink) {
    return (
      <span className={cn('block shrink-0', className)} style={{ width }}>
        {image}
      </span>
    );
  }

  return (
    <Link
      href="/"
      className={cn('block shrink-0 rounded-sm', className)}
      style={{ width }}
      aria-label={`${alt} — go to homepage`}
    >
      {image}
    </Link>
  );
}
