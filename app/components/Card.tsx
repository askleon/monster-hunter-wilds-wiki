import React, { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  title: ReactNode;
  subtitle?: string;
  description: ReactNode;
  link: string;
  className?: string;
}

export function Card({ title, subtitle, description, link, className = '' }: CardProps) {
  return (
    <Link href={link} className={`block p-6 rounded-lg shadow-md w-full ${className}`}>
      <div className="mb-2">
        {typeof title === 'string' ? <h2 className="text-xl font-bold">{title}</h2> : title}
        {subtitle && <p className="text-sm text-secondary">{subtitle}</p>}
      </div>
      <div>{description}</div>
    </Link>
  );
}
