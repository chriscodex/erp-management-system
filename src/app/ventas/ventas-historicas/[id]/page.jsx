import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getVentaHistoricaRequestServer } from '@/app/ventas/ventas-historicas/_services/requests';
import { DetailVentaHistoricaContent } from '@/app/ventas/ventas-historicas/[id]/_components/detailVentaHistoricaContent';

export default async function Page({ params }) {
  const { ventaHistorica } = await getVentaHistoricaRequestServer(params.id);

  if (!ventaHistorica) {
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
        title: 'Historial de Ventas',
        href: '/ventas/ventas-historicas',
        active: true,
      },
    {
      title: ventaHistorica?.code,
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailVentaHistoricaContent ventaHistoricaData={ventaHistorica} />
    </NavbarDynamic>
  );
}