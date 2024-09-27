import React from 'react';
import Link from 'next/link';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  link?: string;
  onClick?: () => void;
}

export function Card({ title, subtitle, description, link, onClick }: CardProps) {
  const CardContent = () => (
    <>
      <h2 className={styles.cardTitle}>{title}</h2>
      {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
      {description && <p className={styles.cardDescription}>{description}</p>}
    </>
  );

  if (link) {
    return (
      <Link href={link} className={styles.card}>
        <CardContent />
      </Link>
    );
  }

  return (
    <div className={styles.card} onClick={onClick}>
      <CardContent />
    </div>
  );
}
