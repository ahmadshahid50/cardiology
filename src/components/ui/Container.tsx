import { cn } from '@/lib/cn';
import type { ElementType, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** `wide` is used for full-bleed section content, `narrow` for long-form prose. */
  size?: 'narrow' | 'default' | 'wide';
  as?: ElementType;
}

const sizes = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
} as const;

export function Container({ children, className, size = 'default', as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </Tag>
  );
}
