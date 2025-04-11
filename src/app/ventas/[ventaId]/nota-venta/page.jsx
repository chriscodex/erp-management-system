import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getVentaRequestServer } from '@/app/ventas/_services/requests';
import { getAllEmpresasForComprobanteVentaRequestServer } from '@/app/ventas/[ventaId]/_services/requests';
import { DetailNotaVentaContent } from '@/app/ventas/[ventaId]/nota-venta/_components/detailNotaVentaContent';

export default async function Page({ params }) {
  const { venta } = await getVentaRequestServer(params.ventaId);
  const { empresas } = await getAllEmpresasForComprobanteVentaRequestServer();

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
      href: '/ventas',
      active: true,
    },
    {
      title: venta?.code,
      href: `/ventas/${params.ventaId}`,
      active: true,
    },
    {
      title: 'Nota de Venta',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailNotaVentaContent ventaData={venta} empresas={empresas} />
    </NavbarDynamic>
  );
}
