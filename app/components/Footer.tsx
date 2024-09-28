'use client'

import React from 'react';
import { useTheme } from './ThemeProvider';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`bg-secondary text-primary p-4 text-center ${theme}`}>

    </footer>
  );
};

export default Footer;
