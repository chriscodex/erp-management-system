import { Roboto } from 'next/font/google';

import { Providers } from '@/components/providers/Providers';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';

import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

export const metadata = {
  title: 'MotoRock',
  description: 'MotoRock Ruta 33',
  manifest: '/manifest.json',
  icons: {
    apple: '/icon512_rounded.png',
    android: '/icon512_maskable.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
      <link rel="icon" href="/moto.svg" sizes="any" />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <main>
          <Providers>
            <SidebarProvider>
              <AppSidebar />
              {children}
            </SidebarProvider>
          </Providers>
        </main>
      </body>
    </html>
  );
}
