export { default } from 'next-auth/middleware';

// '/api/:path*'

export const config = {
  matcher: [
    '/',
    '/usuarios/:path*',
    '/inventario/:path*',
    '/ventas/:path*',
    '/gastos-generales/:path*',
    '/empresas/:path*',
    '/contactos/:path*',
    '/sucursales/:path*',
    '/dashboard/:path*',
    '/estadisticas/:path*',
    '/taller/:path*',
    '/home/:path*',
  ],
  // matcher: ['/api/:path*'],
};
