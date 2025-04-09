import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getVentaRequestServer } from '@/app/ventas/_services/requests';
import { DetailVentaContent } from './_components/detailVentaContent';

export default async function Page({ params }) {
  const { venta } = await getVentaRequestServer(params.ventaId);

  //Lorem ipsum

  if (!venta) {
    notFound();
  }

  const navbarTitles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
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
