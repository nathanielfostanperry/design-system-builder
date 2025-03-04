import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { DesignSystemProvider } from '../context/DesignSystemContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Design System Builder',
  description: 'Generate color scales for your design system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DesignSystemProvider>
          <main className="min-h-screen flex flex-col">{children}</main>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
