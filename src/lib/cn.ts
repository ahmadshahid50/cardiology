/**
 * Minimal class-name joiner.
 *
 * The site has no conflicting-variant problem that would justify pulling in
 * clsx + tailwind-merge, so this stays dependency-free.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
