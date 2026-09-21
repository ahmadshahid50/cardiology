import type { NextConfig } from 'next';

/**
 * Security headers.
 *
 * The CSP allows Google Maps frames (both locations embed a map) and the
 * inline styles Next.js injects for fonts and image placeholders. No analytics
 * or tag manager was present on the previous site, so no such origin is opened
 * here — add one deliberately if tracking is introduced later.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com",
  "font-src 'self' data:",
  "frame-src https://www.google.com https://maps.google.com",
  "connect-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },

  /**
   * URL migration from the previous WordPress site.
   *
   * Pages that still exist keep their original paths (/about-us, /services,
   * /contact, /make-an-appointment). The routes below either moved or held only
   * unused theme demo content, and are redirected permanently so no inbound
   * link 404s.
   */
  async redirects() {
    return [
      // The demo "doctor details" template is replaced by real profiles.
      { source: '/team/doctor-details', destination: '/cardiologists', permanent: true },
      { source: '/team/:path*', destination: '/cardiologists', permanent: true },

      // Convenience aliases for the cardiologist listing.
      { source: '/doctors', destination: '/cardiologists', permanent: true },
      { source: '/our-specialists', destination: '/cardiologists', permanent: true },
      { source: '/about', destination: '/about-us', permanent: true },
      { source: '/appointment', destination: '/make-an-appointment', permanent: true },
      { source: '/book', destination: '/make-an-appointment', permanent: true },

      /*
       * The previous site's blog, categories and tags carried only placeholder
       * content from the WordPress theme (lorem ipsum posts dated 2022, and
       * categories such as "dental-surgery" unrelated to the practice). They are
       * redirected rather than recreated. Restore a real /blog route here if the
       * practice begins publishing.
       */
      { source: '/blog', destination: '/patient-information', permanent: true },
      { source: '/category/:slug*', destination: '/patient-information', permanent: true },
      { source: '/tag/:slug*', destination: '/patient-information', permanent: true },
      { source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*', destination: '/patient-information', permanent: true },

      // Legacy WordPress endpoints.
      { source: '/feed', destination: '/', permanent: true },
      { source: '/comments/feed', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/xmlrpc.php', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
