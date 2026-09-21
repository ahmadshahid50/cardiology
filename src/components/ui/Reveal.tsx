'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger, in milliseconds, applied to the transition. */
  delay?: number;
  as?: ElementType;
}

/**
 * Fades and lifts its children into view once, the first time they are scrolled
 * near the viewport.
 *
 * Revealing is done by setting `data-revealed` on the node directly rather than
 * through state: the effect is synchronising with the DOM, and doing it this way
 * avoids a render pass per element as the page is scrolled.
 *
 * Content is never left permanently hidden — `prefers-reduced-motion` and
 * `@media (scripting: none)` both force it visible in CSS, and the effect
 * reveals immediately when `IntersectionObserver` is unavailable.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => {
      node.dataset.revealed = 'true';
    };

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
