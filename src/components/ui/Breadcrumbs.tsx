import Link from 'next/link';
import { cn } from '@/lib/cn';

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  tone?: 'light' | 'dark';
  className?: string;
}

export function Breadcrumbs({ items, tone = 'light', className }: BreadcrumbsProps) {
  const dark = tone === 'dark';

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          'flex flex-wrap items-center gap-x-2 gap-y-1 text-sm',
          dark ? 'text-ink-300' : 'text-ink-500'
        )}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'rounded-sm underline-offset-4 transition-colors hover:underline',
                    dark ? 'hover:text-white' : 'hover:text-ink-800'
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(dark ? 'text-white' : 'text-ink-800')} aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className={dark ? 'text-ink-500' : 'text-ink-300'}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
