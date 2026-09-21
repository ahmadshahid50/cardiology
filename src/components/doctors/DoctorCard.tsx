import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import type { Doctor } from '@/lib/types';
import { cn } from '@/lib/cn';

interface DoctorCardProps {
  doctor: Doctor;
  className?: string;
}

export function DoctorCard({ doctor, className }: DoctorCardProps) {
  const href = `/cardiologists/${doctor.slug}`;

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border border-ink-100 bg-white',
        'transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card focus-within:shadow-card',
        className
      )}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-ink-100 sm:aspect-3/4">
        <Image
          src={doctor.image.src}
          alt={doctor.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold text-ink-900">
          <Link href={href} className="rounded-sm before:absolute before:inset-0 before:content-['']">
            {doctor.name}
          </Link>
        </h3>

        <p className="mt-1 text-[0.8125rem] font-semibold tracking-[0.06em] text-crimson-700 uppercase">
          {doctor.qualifications}
        </p>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{doctor.title}</p>

        <ul className="mt-4 flex-1 space-y-1.5 border-t border-ink-100 pt-4">
          {doctor.appointments.slice(0, 2).map((appointment) => (
            <li key={appointment} className="flex items-start gap-2.5 text-sm text-ink-600">
              <Icon name="check" size={14} strokeWidth={2.25} className="mt-1 shrink-0 text-crimson-600" />
              {appointment}
            </li>
          ))}
        </ul>

        <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-crimson-700">
          View full profile
          <Icon
            name="arrow-right"
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
