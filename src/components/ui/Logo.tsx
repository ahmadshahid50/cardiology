import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface LogoProps {
  /** `light` renders the white wordmark for use on dark surfaces. */
  tone?: 'default' | 'light';
  className?: string;
  /** Rendered width in pixels; height follows the artwork's aspect ratio. */
  width?: number;
  priority?: boolean;
  /** Set on pages where the logo is not a link (i.e. the homepage header). */
  asLink?: boolean;
}

const ASPECT = 794 / 264;

export function Logo({
  tone = 'default',
  className,
  width = 196,
  priority = false,
  asLink = true,
}: LogoProps) {
  const src =
    tone === 'light'
      ? '/images/branding/advanced-cardiology-logo-light.png'
      : '/images/branding/advanced-cardiology-logo.png';

  const image = (
    <Image
      src={src}
      alt="Drummoyne Advanced Cardiology"
      width={width}
      height={Math.round(width / ASPECT)}
      priority={priority}
      className="h-auto w-full"
      sizes={`${width}px`}
    />
  );

  if (!asLink) {
    return (
      <span className={cn('block', className)} style={{ width }}>
        {image}
      </span>
    );
  }

  return (
    <Link
      href="/"
      className={cn('block shrink-0 rounded-sm', className)}
      style={{ width }}
      aria-label="Drummoyne Advanced Cardiology — go to homepage"
    >
      {image}
    </Link>
  );
}
