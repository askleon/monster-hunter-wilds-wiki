import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import ClientRoot from './components/ClientRoot';
import { ToastProvider } from '@/app/components/Toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monster Hunter Wilds Wiki",
  description: "A wiki for Monster Hunter Wilds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script id="theme-script" strategy="beforeInteractive">
        {`
          (function() {
            function getInitialTheme() {
              const savedTheme = localStorage.getItem('theme');
              if (savedTheme) {
                return savedTheme;
              }
              return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            document.documentElement.classList.add(getInitialTheme());
          })();
        `}
      </Script>
      <body className={inter.className}>
        <ToastProvider>
          <ClientRoot>{children}</ClientRoot>
        </ToastProvider>
      </body>
    </html>
  );
}
