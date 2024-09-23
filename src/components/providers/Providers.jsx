'use client';
import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
        <Toaster richColors closeButton />
      </ThemeProvider>
    </SessionProvider>
  );
}

export { Providers };
