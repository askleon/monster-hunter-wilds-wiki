import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className={inter.className}>
        <ToastProvider>
          <ClientRoot>{children}</ClientRoot>
        </ToastProvider>
      </body>
    </html>
  );
}
