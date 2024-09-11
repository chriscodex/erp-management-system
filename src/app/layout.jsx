import { Roboto } from 'next/font/google';

import { Providers } from '@/components/providers/Providers';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

export const metadata = {
  title: 'MotoRock',
  description: 'MotoRock Ruta 33',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
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
