import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { DesignSystemProvider } from '../context/DesignSystemContext';
import * as Toast from '@radix-ui/react-toast';

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
          <Toast.Provider>
            <main className="min-h-screen flex flex-col">{children}</main>
            <Toast.Viewport className="fixed bottom-0 right-0 z-[100] flex flex-col p-[25px] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none outline-none" />
          </Toast.Provider>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
