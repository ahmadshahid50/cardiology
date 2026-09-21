import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { footerNav, locations, openingHours, site, telHref } from '@/data/site';
import { services } from '@/data/services';

const footerServices = services.slice(0, 7);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-ink-300">
      <div
        aria-hidden="true"
        className="h-px bg-linear-to-r from-transparent via-crimson-600/70 to-transparent"
      />

      <Container size="wide" className="py-14 lg:py-18">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Practice */}
          <div className="lg:col-span-4">
            <Logo tone="light" width={198} />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-300">
              {site.shortDescription}
            </p>
            <p className="mt-5 flex items-start gap-2.5 text-[0.9375rem] text-ink-300">
              <Icon name="clock" size={17} className="mt-0.5 shrink-0 text-crimson-400" />
              <span>
                {openingHours.days}
                <br />
                <span className="text-white">{openingHours.hours}</span>
              </span>
            </p>
          </div>

          {/* Navigation */}
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
              <h2 className="font-sans text-[0.8125rem] font-semibold tracking-[0.14em] text-white uppercase">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-sm text-[0.9375rem] text-ink-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-2">
            <h2 className="font-sans text-[0.8125rem] font-semibold tracking-[0.14em] text-white uppercase">
              Services
            </h2>
            <ul className="mt-5 space-y-2.5">
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="rounded-sm text-[0.9375rem] text-ink-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="rounded-sm text-[0.9375rem] font-medium text-crimson-300 underline-offset-4 transition-colors hover:text-crimson-200 hover:underline"
                >
                  All services
                </Link>
              </li>
            </ul>
          </nav>

          {/* Locations */}
          <div className="md:col-span-2 lg:col-span-4">
            <h2 className="font-sans text-[0.8125rem] font-semibold tracking-[0.14em] text-white uppercase">
              Our Rooms
            </h2>
            <div className="mt-5 grid gap-7 sm:grid-cols-2">
              {locations.map((location) => (
                <address key={location.slug} className="not-italic">
                  <p className="font-serif text-[1.0625rem] font-semibold text-white">
                    {location.name}
                  </p>
                  <p className="mt-2 flex items-start gap-2.5 text-[0.9375rem] leading-relaxed">
                    <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-crimson-400" />
                    <span>
                      {location.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </p>
                  <p className="mt-2.5 flex items-start gap-2.5 text-[0.9375rem]">
                    <Icon name="phone" size={17} className="mt-0.5 shrink-0 text-crimson-400" />
                    <span>
                      {location.phones.map((phone) => (
                        <a
                          key={phone}
                          href={telHref(phone)}
                          className="block rounded-sm underline-offset-4 transition-colors hover:text-white hover:underline"
                        >
                          {phone}
                        </a>
                      ))}
                    </span>
                  </p>
                  <p className="mt-2.5 flex items-start gap-2.5 text-[0.9375rem]">
                    <Icon name="mail" size={17} className="mt-0.5 shrink-0 text-crimson-400" />
                    <a
                      href={`mailto:${location.email}`}
                      className="rounded-sm break-all underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {location.email}
                    </a>
                  </p>
                </address>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container size="wide">
          <div className="flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink-400">
              © {year} {site.legalName}. All rights reserved.
            </p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="rounded-sm text-ink-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="rounded-sm text-ink-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="rounded-sm text-ink-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </div>
    </footer>
  );
}
