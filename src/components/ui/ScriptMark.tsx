import { cn } from '@/lib/cn';

interface ScriptMarkProps {
  /** Each entry is set on its own line. */
  lines: string[];
  tone?: 'ink' | 'light';
  className?: string;
}

/**
 * The practice's handwritten brand phrases — "Healthier Hearts, Brighter
 * Tomorrows" in the hero and "People, Care, Hearts" in the footer — set in the
 * script face over a crimson underline sweep.
 *
 * Decorative: the phrase is read out once and the sweep is hidden from
 * assistive technology.
 */
export function ScriptMark({ lines, tone = 'ink', className }: ScriptMarkProps) {
  return (
    <p
      className={cn(
        'w-fit font-script leading-[0.95] font-semibold -rotate-3',
        tone === 'light' ? 'text-white' : 'text-ink-900',
        className
      )}
    >
      {lines.map((line, i) => (
        <span key={line} className="block">
          {line}
          {i === lines.length - 1 && (
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 120 12"
              preserveAspectRatio="none"
              className="mt-0.5 block h-[0.28em] w-[86%] text-crimson-500"
            >
              <path
                d="M2 8.5C22 3.5 78 1.5 118 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
      ))}
    </p>
  );
}
