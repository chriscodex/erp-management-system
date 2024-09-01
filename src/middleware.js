export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/inicio', '/api/:path*', '/usuarios'],
};
