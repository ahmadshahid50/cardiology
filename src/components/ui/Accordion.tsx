'use client';

import { useId, useState } from 'react';
import { Icon } from './Icon';
import { cn } from '@/lib/cn';
import type { Faq } from '@/lib/types';

interface AccordionProps {
  items: Faq[];
  /** Index of the item open on first render. Pass `null` for all closed. */
  defaultOpen?: number | null;
  className?: string;
}

/**
 * Disclosure list.
 *
 * Each row is a real <button> controlling a region, wired with
 * `aria-expanded` / `aria-controls`, so it works with a keyboard and is
 * announced correctly by screen readers. Panels stay in the DOM and are
 * hidden with `hidden`, which keeps in-page search and find-on-page usable
 * once expanded.
 */
export function Accordion({ items, defaultOpen = 0, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-ink-100 border-y border-ink-100', className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const buttonId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-5 py-5 text-left transition-colors hover:text-crimson-700"
              >
                <span className="font-serif text-[1.0625rem] font-semibold text-ink-900 sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={cn(
                    'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                    isOpen
                      ? 'rotate-180 border-crimson-600 bg-crimson-600 text-white'
                      : 'border-ink-200 text-ink-500'
                  )}
                >
                  <Icon name="chevron-down" size={15} strokeWidth={2} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6"
            >
              <p className="max-w-3xl text-[1.0625rem] leading-relaxed text-ink-600">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
