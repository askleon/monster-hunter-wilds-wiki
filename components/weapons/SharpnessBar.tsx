import React from 'react';
import { Sharpness } from '@/lib/weapons/weapons';
import styles from './SharpnessBar.module.css';

interface SharpnessBarProps {
  sharpness: Sharpness;
}

export function SharpnessBar({ sharpness }: SharpnessBarProps) {
  // Calculate total sharpness
  const totalSharpness = Object.entries(sharpness).reduce((sum, [key, value]) => {
    return key !== 'parenthesis' ? sum + value : sum;
  }, 0);

  // Maximum sharpness value in Monster Hunter (typically 400)
  const MAX_SHARPNESS = 400;

  // Calculate width percentage for each segment
  const getWidthPercentage = (value: number) => {
    return `${(value / MAX_SHARPNESS) * 100}%`;
  };

  const sharpnessColors = {
    red: '#ff0000',
    orange: '#ff6600',
    yellow: '#ffff00',
    green: '#00ff00',
    blue: '#0000ff',
    white: '#ffffff',
    purple: '#800080'
  };

  return (
    <div className={styles.sharpnessBarContainer}>
      <div className={styles.sharpnessBar}>
        {Object.entries(sharpness).map(([color, value], index) => {
          if (color === 'parenthesis') return null;
          return value > 0 ? (
            <div
              key={color}
              className={`${styles.sharpnessSegment} ${index > 0 ? styles.withBorder : ''}`}
              style={{
                backgroundColor: sharpnessColors[color as keyof typeof sharpnessColors],
                width: getWidthPercentage(value)
              }}
            />
          ) : null;
        })}
        {/* Fill remaining space with empty segment */}
        {totalSharpness < MAX_SHARPNESS && (
          <div
            className={styles.sharpnessSegment}
            style={{
              width: getWidthPercentage(MAX_SHARPNESS - totalSharpness),
              backgroundColor: 'var(--bg-secondary)'
            }}
          />
        )}
      </div>
    </div>
  );
}
