import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  /** Small label above the heading. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Heading level — sections on a page below the h1 should use h2. */
  as?: 'h1' | 'h2' | 'h3';
  tone?: 'light' | 'dark';
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  tone = 'light',
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn(centered && 'mx-auto max-w-2xl text-center', 'max-w-2xl', className)}>
      {eyebrow && (
        <p
          className={cn(
            'text-[0.8125rem] font-semibold tracking-[0.14em] uppercase',
            centered && 'flex flex-col items-center',
            'rule-crimson',
            tone === 'dark' ? 'text-crimson-300' : 'text-crimson-600'
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={cn(
          'mt-5 text-3xl sm:text-4xl',
          Tag === 'h1' && 'sm:text-display',
          tone === 'dark' && 'text-white'
        )}
      >
        {title}
      </Tag>
      {description && (
        <div
          className={cn(
            'mt-4 text-[1.0625rem] leading-relaxed',
            tone === 'dark' ? 'text-ink-200' : 'text-ink-600'
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
