export { default } from 'next-auth/middleware';

// '/api/:path*'

export const config = {
  matcher: ['/inicio', '/usuarios/:path*', '/inventario/:path*'],
  // matcher: ['/api/:path*'],
};
