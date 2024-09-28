import React, { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  title: ReactNode;
  subtitle?: string;
  description?: ReactNode;
  link: string;
  className?: string;
  footer?: ReactNode;
}

export function Card({ title, subtitle, description, link, className = '', footer }: CardProps) {
  return (
    <Link href={link} className={`block p-6 rounded-lg shadow-md ${className}`}>
      <div className="mb-2">
        {typeof title === 'string' ? <h2 className="text-xl font-bold">{title}</h2> : title}
        {subtitle && <p className="text-sm text-secondary">{subtitle}</p>}
      </div>
      {description && <div className="mb-4">{description}</div>}
      {footer && <div>{footer}</div>}
    </Link>
  );
}
