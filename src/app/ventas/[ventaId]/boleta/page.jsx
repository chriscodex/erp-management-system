import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import {
  getVentaRequestServer,
  getCounterBoletaRequestServer,
} from '@/app/ventas/_services/requests';
import { DetailBoletaContent } from '@/app/ventas/[ventaId]/boleta/_components/detailBoletaContent';

export default async function Page({ params }) {
  const { venta } = await getVentaRequestServer(params.ventaId);
  const { counterBoleta } = await getCounterBoletaRequestServer();

  if (!venta) {
    notFound();
  }

  const navbarTitles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Ventas',
      href: '',
      active: false,
    },
    {
      title: venta?.code,
      href: `/ventas/${params.ventaId}`,
      active: true,
    },
    {
      title: 'Boleta',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailBoletaContent ventaData={venta} counterBoleta={counterBoleta} />
    </NavbarDynamic>
  );
}
