import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '@/components/nav/navbar';
import { ThemeProvider } from '@/providers/theme-provider';
import SessionProvider from '@/providers/session-provider';
import { TanstackProvider } from '@/providers/tanstack-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NEXT JS Blog',
  description: 'App criado com NEXT JS',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider>
              <main className="max-w-7xl mx-auto p-10 space-y-5 min-h-screen">
                <Navbar />
                {props.children}
              </main>
            </SessionProvider>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
