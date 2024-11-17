import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        accent: 'var(--bg-accent)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-accent': 'var(--text-accent)',
        'mh': {
          'yellow-pale': 'var(--mh-yellow-pale)',
          'yellow': 'var(--mh-yellow)',
          'blue-light': 'var(--mh-blue-light)',
          'white': 'var(--mh-white)',
          'gray': 'var(--mh-gray)',
          'red': 'var(--mh-red)',
          'green': 'var(--mh-green)',
        },
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        accent: 'var(--bg-accent)',
        hover: 'var(--bg-hover)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        accent: 'var(--text-accent)',
      },
      borderColor: {
        DEFAULT: 'var(--border-color)',
      },
      boxShadow: {
        DEFAULT: '0 2px 4px var(--shadow-color)',
      },
      textShadow: {
        'mh': '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
      },
    },
  },
  plugins: [],
};

export default config;
