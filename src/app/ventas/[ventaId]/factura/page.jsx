import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getVentaRequestServer } from '@/app/ventas/_services/requests';
import { DetailFacturaContent } from '@/app/ventas/[ventaId]/factura/_components/detailFacturaContent';
import { getAllEmpresasForComprobanteVentaRequestServer } from '@/app/ventas/[ventaId]/_services/requests';

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
      href: '',
      active: false,
    },
    {
      title: venta?.code,
      href: `/ventas/${params.ventaId}`,
      active: true,
    },
    {
      title: 'Factura',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailFacturaContent ventaData={venta} empresas={empresas}/>
    </NavbarDynamic>
  );
}
