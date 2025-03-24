"use client";

import Image from 'next/image';
import { useTheme } from '../ThemeProvider';

export default function GitHubLink({
  text = "View on Github",
  className = "",
}) {
  const { theme } = useTheme();
  return (
    <a
      href="https://github.com/askleon/monster-hunter-wilds-wiki"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center ${className}`}
    >
      <Image
        src={theme === 'dark' ? '/github-mark/github-mark-white.svg' : '/github-mark/github-mark.svg'}
        alt="GitHub"
        width={20}
        height={20}
        className="mr-2"
      />
      <span>{text}</span>
    </a>
  );
}
