'use client'

import React from 'react';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`bg-secondary text-primary py-2 ${theme}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">
            This is a fan-made wiki.
          </p>
          <a
            href="https://github.com/yourusername/monster-hunter-wilds-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-accent transition-colors text-sm"
          >
            <Image
              src={theme === 'dark' ? '/github-mark/github-mark-white.svg' : '/github-mark/github-mark.svg'}
              alt="GitHub"
              width={20}
              height={20}
              className="mr-2"
            />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
