import type { ReactNode } from 'react';

/**
 * Typographic wrapper for long-form legal copy.
 *
 * Styling is applied with descendant selectors so the page bodies can stay as
 * plain semantic HTML, without a class on every element.
 */
export function LegalProse({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        'text-[1.0625rem] leading-relaxed text-ink-600',
        '[&_p.lead]:text-lg [&_p.lead]:text-ink-700',
        '[&_h2]:mt-11 [&_h2]:mb-3 [&_h2]:text-2xl',
        '[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:font-semibold',
        '[&_p]:mt-4',
        '[&_ul]:mt-4 [&_ul]:space-y-2 [&_ul]:pl-5',
        '[&_ul>li]:list-disc [&_ul>li]:marker:text-crimson-500',
        '[&_ol]:mt-4 [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol>li]:list-decimal',
        '[&_strong]:font-semibold [&_strong]:text-ink-800',
        '[&_a]:font-medium [&_a]:text-crimson-700 [&_a]:underline [&_a]:underline-offset-4',
        '[&_a:hover]:text-crimson-800',
      ].join(' ')}
    >
      {children}
    </div>
  );
}
