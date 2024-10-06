import React from 'react';
import { Sharpness } from '@/lib/weapons/weapons';
import styles from './SharpnessBar.module.css';

interface SharpnessBarProps {
  sharpness: Sharpness;
}

export function SharpnessBar({ sharpness }: SharpnessBarProps) {
  const sharpnessColors = ['red', 'orange', 'yellow', 'green', 'blue', 'white', 'purple'];
  const pixelsPerSharpness = 1.5; // Increased from 1 to 1.5
  const pixelsPer10Sharpness = pixelsPerSharpness * 10;

  return (
    <div className={styles.sharpnessBarContainer}>
      <div className={styles.sharpnessBar}>
        {sharpnessColors.map((color, index) => {
          const value = sharpness[color as keyof Sharpness];
          if (typeof value === 'number' && value > 0) {
            const width = value * pixelsPerSharpness;
            const numDividers = Math.floor(value / 10);
            return (
              <div
                key={color}
                className={`${styles.sharpnessSegment} ${styles[color]} ${index > 0 ? styles.withBorder : ''}`}
                style={{ width: `${width}px` }}
              >
                {[...Array(numDividers)].map((_, index) => (
                  <div
                    key={index}
                    className={styles.divider}
                    style={{ left: `${(index + 1) * pixelsPer10Sharpness - 1}px` }}
                  />
                ))}
              </div>
            );
          }
          return null;
        })}
        {sharpness.parenthesis && (
          <div
            className={`${styles.sharpnessSegment} ${styles[sharpness.parenthesis.color]} ${styles.parenthesisSegment} ${styles.withBorder}`}
            style={{ width: `${sharpness.parenthesis.value * pixelsPerSharpness}px` }}
          >
            <div className={styles.parenthesisOverlay}></div>
          </div>
        )}
      </div>
    </div>
  );
}
