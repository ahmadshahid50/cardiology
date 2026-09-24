import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { cn } from '@/lib/cn';

interface SectionIntroProps {
  /** Small crimson label above the heading. */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Id for the heading, so its section can point `aria-labelledby` at it. */
  id?: string;
  className?: string;
}

/**
 * Centred section opener used by every band on the homepage: a crimson eyebrow,
 * a serif heading and a short crimson rule beneath it.
 */
export function SectionIntro({ eyebrow, title, description, id, className }: SectionIntroProps) {
  return (
    <Reveal className={cn('mx-auto max-w-2xl text-center', className)}>
      <p className="text-[0.75rem] font-semibold tracking-[0.2em] text-crimson-500 uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-[1.75rem] leading-tight font-bold text-ink-900 sm:text-[2.125rem] lg:text-[2.375rem]"
      >
        {title}
      </h2>
      <span aria-hidden="true" className="mx-auto mt-4 block h-0.5 w-14 rounded-full bg-crimson-500" />
      {description && (
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-600">{description}</p>
      )}
    </Reveal>
  );
}
