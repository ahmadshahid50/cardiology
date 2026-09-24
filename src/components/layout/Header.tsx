'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { PracticeLogo } from '@/components/ui/PracticeLogo';
import { cn } from '@/lib/cn';
import { getLocation, openingHours, primaryNav, telHref } from '@/data/site';

/* The practice bar reads Bowral first, then Drummoyne, matching the approved
   design: each half carries the tint of that practice's own mark. */
const practiceBar = [
  {
    practice: 'bowral' as const,
    location: getLocation('bowral'),
    surface: 'bg-sage-50',
    rule: 'border-sage-500',
    /* The green belongs to the Southern Highlands mark and its half of the
       bar; the pin and phone icons stay crimson on both sides. */
    accent: 'text-crimson-500',
  },
  {
    practice: 'drummoyne' as const,
    location: getLocation('drummoyne'),
    surface: 'bg-crimson-50',
    rule: 'border-crimson-500',
    accent: 'text-crimson-500',
  },
];

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* While the menu is open: lock scrolling, close on Escape, keep focus in. */
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
      {/*
        Practice bar. The business trades as two named practices, so the bar is
        split down the middle and each half is tinted with that practice's own
        colour. It scrolls away to leave a compact nav.
      */}
      <div
        className={cn(
          'relative hidden transition-[max-height,opacity] duration-300 lg:block',
          scrolled ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-28 opacity-100'
        )}
      >
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2">
          {practiceBar.map((half) => (
            <div key={half.practice} className={cn('border-b-2', half.surface, half.rule)} />
          ))}
        </div>

        <Container size="wide" className="relative">
          <ul className="grid grid-cols-2">
            {practiceBar.map((half, i) => {
              const { location } = half;
              return (
                <li
                  key={half.practice}
                  className={cn('flex items-center gap-5 py-3.5', i === 0 ? 'pr-8' : 'pl-8')}
                >
                  <PracticeLogo practice={half.practice} width={i === 0 ? 190 : 172} priority />

                  {/* Below xl the two halves are too narrow to carry the room
                      label as well, so the logo and the direct line stand in. */}
                  <span className="hidden items-center gap-2.5 border-l border-ink-200/80 pl-5 xl:flex">
                    <Icon name="pin" size={16} className={cn('shrink-0', half.accent)} />
                    <span className="leading-tight">
                      <span className="block text-[0.8125rem] font-semibold whitespace-nowrap text-ink-900">
                        {location.shortName}
                      </span>
                      <span className="block text-[0.6875rem] whitespace-nowrap text-ink-500">
                        {location.name.replace(`${location.shortName} `, '')}
                      </span>
                    </span>
                  </span>

                  <a
                    href={telHref(location.phones[0]!)}
                    className="ml-auto flex shrink-0 items-center gap-2.5 rounded-sm border-l border-ink-200/80 pl-5 text-[0.875rem] font-semibold whitespace-nowrap text-ink-900 transition-colors hover:text-crimson-600"
                  >
                    <Icon name="phone" size={16} className={cn('shrink-0', half.accent)} />
                    {location.phones[0]}
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>

      {/* Navigation. Sits above the mobile menu panel (z-40) so the logo and the
          close button stay visible and reachable while the menu is open. */}
      <div
        className={cn(
          'relative z-50 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300',
          scrolled ? 'border-ink-100 shadow-subtle' : 'border-transparent'
        )}
      >
        <Container size="wide">
          <div className="relative flex h-17 items-center gap-4 lg:h-18">
            {/* Once the practice bar has scrolled away the nav would carry no
                branding at all, so the Drummoyne mark slides in to hold its
                place. Until then it takes no width, leaving the nav the room
                it needs on a laptop screen. */}
            <div
              className={cn(
                'shrink-0 overflow-hidden transition-[width,opacity] duration-300',
                scrolled
                  ? 'lg:w-38 lg:opacity-100'
                  : 'lg:pointer-events-none lg:w-0 lg:opacity-0'
              )}
            >
              <PracticeLogo practice="drummoyne" width={152} priority />
            </div>

            {/* Centred by flex up to xl, then pinned to the exact centre of the
                bar once there is room for it on either side. */}
            <nav
              aria-label="Primary"
              className="hidden flex-1 justify-center lg:flex xl:absolute xl:left-1/2 xl:flex-none xl:-translate-x-1/2"
            >
              <ul className="flex items-center gap-0.5 xl:gap-1">
                {primaryNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'relative block rounded-sm px-2.5 py-2 text-[0.9375rem] whitespace-nowrap transition-colors xl:px-3.5',
                          'after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:origin-left xl:after:inset-x-3.5',
                          'after:scale-x-0 after:rounded-full after:bg-crimson-500',
                          'after:transition-transform after:duration-300 hover:after:scale-x-100',
                          active
                            ? 'font-semibold text-crimson-600 after:scale-x-100'
                            : 'font-medium text-ink-700 hover:text-ink-900'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Wrapped rather than given `hidden` directly: Button already sets
                `inline-flex`, which would win over `hidden` on source order. */}
            <div className="ml-auto hidden shrink-0 lg:block">
              <Button href="/make-an-appointment">
                <Icon name="calendar" size={17} />
                Book an Appointment
              </Button>
            </div>

            {/* Mobile controls */}
            <div className="ml-auto flex shrink-0 items-center gap-2 lg:hidden">
              <a
                href={telHref(practiceBar[1]!.location.phones[0]!)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-crimson-500 transition-colors hover:border-crimson-200 hover:bg-crimson-50"
                aria-label={`Call ${practiceBar[1]!.location.shortName} on ${practiceBar[1]!.location.phones[0]}`}
              >
                <Icon name="phone" size={19} />
              </a>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-800 transition-colors hover:border-ink-300 hover:bg-ink-50"
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
        className={cn('fixed inset-0 z-40 lg:hidden', menuOpen ? 'pointer-events-auto' : 'pointer-events-none')}
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
            'transition-transform duration-300 ease-out-soft',
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
                          active ? 'text-crimson-600' : 'text-ink-800'
                        )}
                      >
                        {item.label}
                        <Icon
                          name="arrow-right"
                          size={18}
                          className={active ? 'text-crimson-500' : 'text-ink-300'}
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

            <ul className="mt-8 space-y-6">
              {practiceBar.map((half) => (
                <li key={half.practice} className={cn('rounded-xl p-4', half.surface)}>
                  <PracticeLogo practice={half.practice} width={164} asLink={false} />
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                    {half.location.phones.map((phone) => (
                      <a
                        key={phone}
                        href={telHref(phone)}
                        className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink-800 underline-offset-4 hover:underline"
                      >
                        <Icon name="phone" size={15} className={half.accent} />
                        {phone}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-center gap-2 border-t border-ink-100 pt-5 text-sm text-ink-600">
              <Icon name="clock" size={15} className="text-crimson-500" />
              {openingHours.days}, {openingHours.hours}
            </p>
          </Container>
        </div>
      </div>
    </header>
  );
}
