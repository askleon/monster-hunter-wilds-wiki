import React from 'react';
import Link from 'next/link';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  subtitle: string;
  description: React.ReactNode;
  link: string;
  className?: string;
}

export function Card({ title, subtitle, description, link, className }: CardProps) {
  return (
    <Link href={link} className={`${styles.card} bg-secondary border-color shadow-color hover:shadow-lg ${className || ''}`}>
      <div className={styles.content}>
        <h3 className={`${styles.title} text-primary`}>{title}</h3>
        <p className={`${styles.subtitle} text-secondary`}>{subtitle}</p>
        <div className={`${styles.description} text-primary`}>{description}</div>
      </div>
    </Link>
  );
}
