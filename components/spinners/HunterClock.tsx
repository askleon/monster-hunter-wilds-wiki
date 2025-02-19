"use client";
import styles from './HunterClock.module.css';
import Image from 'next/image';

interface HunterClockProps {
  progress: number;
  size?: number;
}

/**
 * Hunter clock spinner component.
 * Visualizes a analog clock similar to the one in Monster Hunter wilds.
 * @param progress Progress of the clock (0-100) (0 = 12 o'clock, 100 = 10 o'clock)
 * @param size Size of the clock in pixels
 * @returns Hunter clock component
 * @example
 * 'use client'

 import { useState, useEffect } from 'react'
 import HunterClock from '../spinners/HunterClock'

 export default function ClockTest() {
   const [progress, setProgress] = useState(0)

   useEffect(() => {
     const interval = setInterval(() => {
       setProgress(prev => {
         if (prev >= 100) {
           clearInterval(interval)
           return 100
         }
         return prev + 1
       })
     }, 100) // Updates every 100ms (10 seconds total)

     return () => clearInterval(interval)
   }, [])

   return (
     <div className="bg-gray-800 p-6 rounded-lg text-center">
       <div className="text-green-400 text-2xl font-bold mb-4">
         Progress: {progress}%
       </div>
       <div>
         <HunterClock
           progress={progress}
           size={120}
         />
       </div>
     </div>
   )
 }

 */
export default function HunterClock({ progress = 0, size = 100 }: HunterClockProps) {
  const rotation = (progress / 100) * 300;

  return (
    <div className={styles.clockContainer} style={{ width: size, height: size }}>
      <Image
        src="/icons/hunter-clock-background.svg"
        width={size}
        height={size}
        className={styles.clockBackground}
        alt="Clock background"
      />
      <Image
        src="/icons/hunter-clock-yellow-pointer.svg"
        width={size}
        height={size}
        className={styles.clockHand}
        style={{
          transform: `rotate(${rotation}deg)`
        }}
        alt="Clock hand"
      />
    </div>
  );
}
