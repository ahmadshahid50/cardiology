import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { PracticeMark } from '@/components/ui/PracticeMark';
import { footerNav, locations, openingHours, site, telHref } from '@/data/site';
import { services } from '@/data/services';

const footerServices = services.slice(0, 6);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-300">
      <Container size="wide" className="py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Practice */}
          <div className="lg:col-span-4">
            <Logo tone="light" width={190} />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-400">
              Specialist cardiology care for the Drummoyne and Southern Highlands communities, with
              expertise across each of the major disciplines of cardiology.
            </p>
            <p className="mt-6 flex items-start gap-2.5 text-[0.9375rem]">
              <Icon name="clock" size={17} className="mt-0.5 shrink-0 text-crimson-400" />
              <span className="text-ink-400">
                {openingHours.days}
                <span className="block text-white">{openingHours.hours}</span>
              </span>
            </p>
          </div>

          {/* Quick links */}
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
              <h2 className="font-sans text-[0.75rem] font-semibold tracking-[0.16em] text-white uppercase">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-sm text-[0.9375rem] text-ink-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="font-sans text-[0.75rem] font-semibold tracking-[0.16em] text-white uppercase">
              Services
            </h2>
            <ul className="mt-5 space-y-2.5">
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="rounded-sm text-[0.9375rem] text-ink-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="rounded-sm text-[0.9375rem] font-medium text-crimson-400 underline-offset-4 transition-colors hover:text-crimson-300 hover:underline"
                >
                  All services
                </Link>
              </li>
            </ul>
          </nav>

          {/* Locations */}
          <div className="md:col-span-2 lg:col-span-3">
            <h2 className="font-sans text-[0.75rem] font-semibold tracking-[0.16em] text-white uppercase">
              Our Locations
            </h2>
            <ul className="mt-5 space-y-6">
              {locations.map((location) => (
                <li key={location.slug}>
                  <PracticeMark location={location} tone="light" size="sm" />
                  <address className="mt-2.5 pl-8 text-[0.9375rem] leading-relaxed text-ink-400 not-italic">
                    {location.addressLines.join(', ')}
                  </address>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 pl-8">
                    {location.phones.map((phone) => (
                      <a
                        key={phone}
                        href={telHref(phone)}
                        className="rounded-sm text-[0.9375rem] text-white underline-offset-4 transition-colors hover:text-crimson-300 hover:underline"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                  <a
                    href={`mailto:${location.email}`}
                    className="mt-1 inline-block rounded-sm pl-8 text-sm break-all text-ink-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {location.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/8">
        <Container size="wide">
          <div className="flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink-500">
              © {year} {site.legalName}. All rights reserved.
            </p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
