'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';
import { locations, openingHours, primaryNav, telHref } from '@/data/site';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Close the mobile menu whenever the route changes. Adjusting state during
     render (rather than in an effect) avoids rendering the open menu for a
     frame on the new page. */
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  /* Compact the header once the page has scrolled past the utility bar. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* While the menu is open: lock scrolling, close on Escape, and keep focus
     inside the panel. */
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar — hours and the direct number for each set of rooms. */}
      <div
        className={cn(
          'hidden bg-ink-900 text-ink-200 transition-[max-height,opacity] duration-300 lg:block',
          scrolled ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-16 opacity-100'
        )}
      >
        <Container size="wide">
          <div className="flex items-center justify-between gap-6 py-2.5 text-[0.8125rem]">
            <p className="flex items-center gap-2">
              <Icon name="clock" size={15} className="text-crimson-400" />
              <span>
                {openingHours.days}, {openingHours.hours}
              </span>
            </p>
            <div className="flex items-center gap-6">
              {locations.map((location) => (
                <p key={location.slug} className="flex items-center gap-2">
                  <span className="text-ink-400">{location.shortName}</span>
                  <a
                    href={telHref(location.phones[0]!)}
                    className="rounded-sm font-medium text-white underline-offset-4 transition-colors hover:text-crimson-300 hover:underline"
                  >
                    {location.phones[0]}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          'border-b bg-white/92 backdrop-blur-md transition-shadow duration-300',
          scrolled ? 'border-ink-200 shadow-subtle' : 'border-transparent'
        )}
      >
        <Container size="wide">
          <div
            className={cn(
              'flex items-center justify-between gap-4 transition-[height] duration-300',
              scrolled ? 'h-[72px]' : 'h-20 lg:h-[88px]'
            )}
          >
            <Logo
              width={scrolled ? 168 : 186}
              priority
              className="transition-[width] duration-300"
            />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'relative rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors',
                          'after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-left',
                          'after:scale-x-0 after:bg-crimson-600 after:transition-transform after:duration-300',
                          'hover:after:scale-x-100',
                          active
                            ? 'text-crimson-700 after:scale-x-100'
                            : 'text-ink-700 hover:text-ink-900'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Button href="/make-an-appointment" size="md">
                <Icon name="calendar" size={17} />
                Book an Appointment
              </Button>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={telHref(locations[0]!.phones[0]!)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-ink-200 text-ink-700 transition-colors hover:border-ink-300 hover:bg-ink-50"
                aria-label={`Call ${locations[0]!.shortName} on ${locations[0]!.phones[0]}`}
              >
                <Icon name="phone" size={19} />
              </a>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-ink-200 text-ink-800 transition-colors hover:border-ink-300 hover:bg-ink-50"
              >
                <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
                <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 top-0 z-40 lg:hidden',
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className={cn(
            'absolute inset-0 bg-ink-950/45 transition-opacity duration-300',
            menuOpen ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div
          id="mobile-menu"
          ref={panelRef}
          className={cn(
            'absolute inset-x-0 top-0 max-h-dvh overflow-y-auto bg-white pt-20 pb-8 shadow-lifted',
            'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            menuOpen ? 'translate-y-0' : '-translate-y-full'
          )}
        >
          <Container>
            <nav aria-label="Mobile">
              <ul className="divide-y divide-ink-100 border-y border-ink-100">
                {primaryNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between py-4 text-lg font-medium transition-colors',
                          active ? 'text-crimson-700' : 'text-ink-800'
                        )}
                      >
                        {item.label}
                        <Icon
                          name="arrow-right"
                          size={18}
                          className={active ? 'text-crimson-600' : 'text-ink-300'}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Button href="/make-an-appointment" size="lg" className="mt-6 w-full">
              <Icon name="calendar" size={18} />
              Book an Appointment
            </Button>

            <div className="mt-8 space-y-5">
              {locations.map((location) => (
                <div key={location.slug}>
                  <p className="text-[0.8125rem] font-semibold tracking-[0.1em] text-ink-500 uppercase">
                    {location.name}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
                    {location.phones.map((phone) => (
                      <a
                        key={phone}
                        href={telHref(phone)}
                        className="flex items-center gap-2 text-ink-800 underline-offset-4 hover:underline"
                      >
                        <Icon name="phone" size={15} className="text-crimson-600" />
                        {phone}
                      </a>
                    ))}
                  </div>
                  <a
                    href={`mailto:${location.email}`}
                    className="mt-1.5 flex items-center gap-2 text-sm break-all text-ink-600 underline-offset-4 hover:underline"
                  >
                    <Icon name="mail" size={15} className="shrink-0 text-crimson-600" />
                    {location.email}
                  </a>
                </div>
              ))}
              <p className="flex items-center gap-2 border-t border-ink-100 pt-5 text-sm text-ink-600">
                <Icon name="clock" size={15} className="text-crimson-600" />
                {openingHours.days}, {openingHours.hours}
              </p>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
