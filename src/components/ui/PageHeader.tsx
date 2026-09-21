import type { ReactNode } from 'react';
import { Container } from './Container';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';

interface PageHeaderProps {
  title: string;
  intro?: ReactNode;
  eyebrow?: string;
  crumbs: Crumb[];
}

/**
 * Standard banner for every page below the homepage: a deep ink field with the
 * page title, an optional intro and breadcrumbs.
 */
export function PageHeader({ title, intro, eyebrow, crumbs }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-ink-900">
      {/* Restrained decorative field — a soft crimson wash and a faint ECG trace. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(186,19,29,0.28),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-crimson-600/60 to-transparent"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute right-0 bottom-0 h-28 w-full text-white/[0.045]"
      >
        <path
          d="M0 74h420l24-46 30 92 26-72 18 34h140l22-40 28 80 24-62 16 28h432"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <Container className="relative py-14 sm:py-18 lg:py-22">
        <Breadcrumbs items={crumbs} tone="dark" />
        {eyebrow && (
          <p className="mt-6 text-[0.8125rem] font-semibold tracking-[0.14em] text-crimson-300 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl text-3xl text-white sm:text-4xl lg:text-5xl">{title}</h1>
        {intro && (
          <div className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-200">{intro}</div>
        )}
      </Container>
    </div>
  );
}
