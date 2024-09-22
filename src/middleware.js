export { default } from 'next-auth/middleware';

// '/api/:path*'

export const config = {
  matcher: ['/inicio', '/usuarios/:path*'],
  // matcher: ['/api/:path*'],
};
