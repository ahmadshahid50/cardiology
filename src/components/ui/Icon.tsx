import type { SVGProps } from 'react';
import type { IconName } from '@/lib/types';

/**
 * Inline icon set.
 *
 * All icons share a 24×24 viewBox and a 1.5 stroke so they stay visually
 * consistent at any size. Drawing them inline avoids shipping an icon library
 * and keeps them crisp on every display.
 */

export type UiIconName =
  | IconName
  | 'arrow-right'
  | 'chevron-down'
  | 'menu'
  | 'close'
  | 'check'
  | 'external';

const paths: Record<UiIconName, React.ReactNode> = {
  consultation: (
    <>
      <rect x="2.75" y="3.25" width="18.5" height="17.5" rx="4" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7.5 17.6a4.8 4.8 0 0 1 9 0" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20.8S3.6 15.4 3.6 9.7A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.4 2.7c0 5.7-8.4 11.1-8.4 11.1Z" />
    </>
  ),
  'heart-pulse': (
    <>
      <path d="M12 20.8S3.6 15.4 3.6 9.7A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.4 2.7c0 5.7-8.4 11.1-8.4 11.1Z" />
      <path d="M4.4 12.4h3.3l1.4-2.9 2.2 5.9 1.6-3.6.9 .6h5.8" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M5 3v5a4 4 0 0 0 8 0V3" />
      <path d="M3.5 3h3M11.5 3h3" />
      <path d="M9 12v2.5A5.5 5.5 0 0 0 14.5 20h0a5.5 5.5 0 0 0 5.5-5.5V12" />
      <circle cx="20" cy="10" r="2" />
    </>
  ),
  ecg: (
    <>
      <path d="M2 12h3.5l2-5 3 11 2.5-8 1.8 4H22" />
    </>
  ),
  treadmill: (
    <>
      <circle cx="13" cy="4" r="1.6" />
      <path d="m8 21 1.8-5.2L7 13l1-4.5 3.2-1.2 2.6 3.2 2.7.9" />
      <path d="M2 21h20" />
      <path d="m14 21-2-4.4" />
    </>
  ),
  ultrasound: (
    <>
      <path d="M12 20.5s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.4a4.5 4.5 0 0 1 7.5 3.1c0 5.4-7.5 10-7.5 10Z" />
      <path d="M8.5 12h2l1-2 1.5 4 1-2h1.5" />
    </>
  ),
  'ultrasound-stress': (
    <>
      <path d="M12 20.5s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7.4a4.5 4.5 0 0 1 7.5 3.1c0 5.4-7.5 10-7.5 10Z" />
      <path d="M8 12h1.8l1.2-2.6L12.6 14l1-2h2.4" />
      <path d="M19.5 3.5 21 2M20 6h2M17 4l-.6-1.8" />
    </>
  ),
  'blood-pressure': (
    <>
      <rect x="3" y="7" width="12" height="7" rx="2" />
      <path d="M15 10.5h2.5a3.5 3.5 0 0 1 3.5 3.5v0a3.5 3.5 0 0 1-3.5 3.5H16" />
      <path d="M6 14v4M11 14v4" />
      <path d="M6.5 10.5h5" />
    </>
  ),
  holter: (
    <>
      <rect x="8" y="3" width="8" height="11" rx="2.5" />
      <path d="M10 7.5h1.2l.8-1.6 1.2 3.2.8-1.6H15" />
      <path d="M10 14v2.5a3 3 0 0 1-3 3H5.5M14 14v2.5a3 3 0 0 0 3 3h1.5" />
    </>
  ),
  artery: (
    <>
      <path d="M6 3v6a4 4 0 0 0 4 4h1a4 4 0 0 1 4 4v4" />
      <path d="M10 3v5.5" />
      <path d="M18.5 9.5 21 12l-2.5 2.5" />
      <path d="M13.5 12H21" />
    </>
  ),
  'device-check': (
    <>
      <rect x="3" y="4" width="13" height="16" rx="2.5" />
      <path d="M6 9h2l1-2 1.5 4 1-2H13" />
      <path d="m15.5 17.5 2 2 4-4.5" />
    </>
  ),
  pacemaker: (
    <>
      <rect x="3" y="6" width="9" height="12" rx="2.5" />
      <path d="M6 10.5h1.4l.8-1.8 1.3 3.6.7-1.8H11" />
      <path d="M12 9.5h2.5A2.5 2.5 0 0 1 17 12v0a2.5 2.5 0 0 0 2.5 2.5H21" />
    </>
  ),
  defibrillator: (
    <>
      <path d="M12 20.3s-7.4-4.4-7.4-9.8A4.4 4.4 0 0 1 12 7.5a4.4 4.4 0 0 1 7.4 3c0 5.4-7.4 9.8-7.4 9.8Z" />
      <path d="m12.8 9.8-2.4 3.4h2.9l-1.7 3.2" />
    </>
  ),
  electrophysiology: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M6 12h2l1.4-3 2.2 6 1.4-3H18" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2" />
    </>
  ),
  ablation: (
    <>
      <path d="M12 20.3s-7.4-4.4-7.4-9.8A4.4 4.4 0 0 1 12 7.5a4.4 4.4 0 0 1 7.4 3c0 5.4-7.4 9.8-7.4 9.8Z" />
      <path d="M17.5 2.5 12.8 11" />
      <path d="m15.4 4.6 2.5 1.4" />
    </>
  ),
  'heart-monitor': (
    <>
      <rect x="2.5" y="4.5" width="19" height="13" rx="2.5" />
      <path d="M6 11h2.2l1.2-2.6 1.9 5.2 1.1-2.6H18" />
      <path d="M8.5 21h7M12 17.5V21" />
    </>
  ),
  patch: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <path d="M8 12h1.8l1-2.2 1.6 4.4.9-2.2H16" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  phone: (
    <>
      <path d="M6.2 3.5h3l1.4 3.6-1.9 1.4a12.5 12.5 0 0 0 5.8 5.8l1.4-1.9 3.6 1.4v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 7.3 5.2a2 2 0 0 0 2.4 0L20.5 7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.7 4.8 5.6v5.6c0 4.5 3 8.3 7.2 10.1 4.2-1.8 7.2-5.6 7.2-10.1V5.6Z" />
      <path d="m9 11.8 2.2 2.2 4-4.4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16.2 5a3.4 3.4 0 0 1 0 6.6" />
      <path d="M17.6 14.2A6.2 6.2 0 0 1 21.2 20" />
    </>
  ),
  clipboard: (
    <>
      <path d="M9 4.5H7a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.5a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="2.5" width="6" height="4" rx="1.4" />
      <path d="M8.5 12h2l1-2 1.5 4 1-2h1.5" />
    </>
  ),
  'arrow-right': <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  'chevron-down': <path d="m5.5 9 6.5 6.5L18.5 9" />,
  menu: <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />,
  close: <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5" />
    </>
  ),
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: UiIconName;
  /** Pixel size for width and height. */
  size?: number;
}

export function Icon({ name, size = 24, strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
