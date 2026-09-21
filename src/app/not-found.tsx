import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { locations, primaryNav, telHref } from '@/data/site';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container size="wide" className="py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-sans text-[0.8125rem] font-semibold tracking-[0.14em] text-crimson-600 uppercase">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl">We couldn&rsquo;t find that page</h1>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-600">
          The page you are looking for may have moved or no longer exists. Try one of the links
          below, or call our reception team and we will point you in the right direction.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Contact our practice
            <Icon name="arrow-right" size={18} />
          </Button>
        </div>

        <nav aria-label="Helpful links" className="mt-12 border-t border-ink-100 pt-8">
          <h2 className="font-sans text-[0.8125rem] font-semibold tracking-[0.14em] text-ink-500 uppercase">
            Popular pages
          </h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {primaryNav
              .filter((item) => item.href !== '/')
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-sm font-medium text-ink-700 underline-offset-4 hover:text-crimson-700 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {locations.map((location) => (
            <a
              key={location.slug}
              href={telHref(location.phones[0]!)}
              className="inline-flex items-center gap-2 rounded-sm text-[0.9375rem] font-medium text-ink-800 underline-offset-4 hover:text-crimson-700 hover:underline"
            >
              <Icon name="phone" size={16} className="text-crimson-600" />
              {location.shortName} {location.phones[0]}
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
}
