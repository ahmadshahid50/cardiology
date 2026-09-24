import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { PracticeLogo } from '@/components/ui/PracticeLogo';
import { ScriptMark } from '@/components/ui/ScriptMark';
import { footerNav, locations, site, telHref } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-ink-300">
      <Container size="wide" className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Practice */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-5">
              <PracticeLogo practice="bowral" tone="light" width={168} />
              <span aria-hidden="true" className="h-10 w-px shrink-0 bg-white/15" />
              <PracticeLogo practice="drummoyne" tone="light" width={150} />
            </div>

            <p className="mt-6 max-w-xs text-[0.875rem] leading-relaxed text-ink-400">
              Providing expert cardiac care to our communities in Drummoyne and the Southern
              Highlands, with compassion, clarity and respect.
            </p>
          </div>

          {/* Quick links */}
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2 lg:col-start-6">
              <h2 className="font-sans text-[0.8125rem] font-semibold tracking-[0.02em] text-white">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-sm text-[0.875rem] text-ink-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Locations */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-[0.8125rem] font-semibold tracking-[0.02em] text-white">
              Our Locations
            </h2>
            <ul className="mt-4 space-y-4">
              {locations.map((location) => (
                <li key={location.slug}>
                  <p className="flex items-start gap-2.5 text-[0.875rem] text-ink-300">
                    <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-crimson-500" />
                    <span>
                      {location.shortName} — {location.name.replace(`${location.shortName} `, '')}
                    </span>
                  </p>
                  <p className="mt-1.5 flex items-center gap-2.5">
                    <Icon name="phone" size={16} className="shrink-0 text-crimson-500" />
                    <a
                      href={telHref(location.phones[0]!)}
                      className="rounded-sm text-[0.875rem] text-ink-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {location.phones[0]}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand phrase */}
          <div className="md:col-span-2 lg:col-span-2 lg:flex lg:justify-end">
            <ScriptMark
              lines={['People', 'Care', 'Hearts']}
              tone="light"
              className="mb-2 text-[2rem] lg:mb-0 lg:text-[2.25rem]"
            />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/8">
        <Container size="wide">
          <div className="flex flex-col gap-3 py-5 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink-500">
              © {year} {site.name}. All rights reserved.
            </p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="rounded-sm text-ink-500 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="rounded-sm text-ink-500 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    Terms of Use
                  </Link>
                </li>
                {site.credit && (
                  <li>
                    <a
                      href={site.credit.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm text-ink-500 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      Website by {site.credit.label}
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </Container>
      </div>
    </footer>
  );
}
