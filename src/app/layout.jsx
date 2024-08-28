import {Roboto} from 'next/font/google'

import { Providers } from '@/app/components/Providers';

import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
})

export const metadata = {
  title: 'MotoRock',
  description: 'MotoRock Ruta 33',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
