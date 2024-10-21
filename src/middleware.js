export { default } from 'next-auth/middleware';

// '/api/:path*'

export const config = {
  matcher: ['/', '/usuarios/:path*', '/inventario/:path*'],
  // matcher: ['/api/:path*'],
};
