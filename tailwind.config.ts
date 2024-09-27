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
        background: "var(--background)",
        foreground: "var(--foreground)",
        theme: {
          light: {
            bg: 'white',
            text: 'black',
          },
          dark: {
            bg: '#1a202c', // or any dark color you prefer
            text: 'white',
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Add this line to enable class-based dark mode
};

export default config;
