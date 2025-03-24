'use client'

import React from 'react';
import { useTheme } from './ThemeProvider';
import GitHubLink from './links/GithubLink';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`bg-secondary text-primary py-2 ${theme}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-sm">
            This is a fan-made wiki.
          </p>
          <GitHubLink text="View on Github"/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
