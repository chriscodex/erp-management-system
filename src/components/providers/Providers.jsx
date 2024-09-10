'use client';
import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';

function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
      <Toaster />
    </SessionProvider>
  );
}

export { Providers };
