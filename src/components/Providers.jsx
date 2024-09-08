'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from './ui/toaster';

function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
      <Toaster />
    </SessionProvider>
  );
}

export { Providers };
