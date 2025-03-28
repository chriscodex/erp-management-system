export { default } from 'next-auth/middleware';

// '/api/:path*'

export const config = {
  matcher: ['/', '/usuarios/:path*', '/inventario/:path*', '/ventas/:path*'],
  // matcher: ['/api/:path*'],
};
