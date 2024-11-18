import React, { ReactNode } from 'react';
import Link from 'next/link';
import { GlassCanvas } from './GlassCanvas';

interface CardProps {
  title: ReactNode;
  subtitle?: string;
  description?: ReactNode;
  link?: string;
  className?: string;
  footer?: ReactNode;
  onClick?: () => void;
  blur?: 'none' | 'sm' | 'md' | 'lg';
  opacity?: 'light' | 'medium' | 'dark';
}

export function Card({ 
  title, 
  subtitle, 
  description, 
  link, 
  className = '', 
  footer, 
  onClick,
  blur,
  opacity 
}: CardProps) {
  const content = (
    <div className="p-6">
      <div className="mb-2">
        {typeof title === 'string' ? <h2 className="text-xl font-bold">{title}</h2> : title}
        {subtitle && <p className="text-sm text-secondary">{subtitle}</p>}
      </div>
      {description && <div className="mb-4">{description}</div>}
      {footer && <div>{footer}</div>}
    </div>
  );

  if (link) {
    return (
      <Link href={link} onClick={onClick}>
        <GlassCanvas className={className} blur={blur} opacity={opacity}>
          {content}
        </GlassCanvas>
      </Link>
    );
  }

  return (
    <div onClick={onClick}>
      <GlassCanvas className={className} blur={blur} opacity={opacity}>
        {content}
      </GlassCanvas>
    </div>
  );
}
