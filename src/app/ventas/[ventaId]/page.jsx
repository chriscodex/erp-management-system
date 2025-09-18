import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getVentaRequestServer } from '@/app/ventas/_services/requests';
import { DetailVentaContent } from './_components/detailVentaContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (
    session?.user?.rol !== 'Administrador' &&
    session?.user?.rol !== 'Vendedor'
  ) {
    notFound();
  }

  const { venta } = await getVentaRequestServer(params.ventaId);
  if (!venta) {
    notFound();
  }

  const navbarTitles = [
    {
      title: 'Ventas',
      href: '/ventas',
      active: true,
    },
    {
      title: venta?.code,
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailVentaContent ventaData={venta} />
    </NavbarDynamic>
  );
}
