import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getOrdenDeServicioRequestServer } from '@/app/taller/ordenes-servicio/_services/requests';
import { DetailOrdenDeServicioContent } from '@/app/taller/ordenes-servicio/[id]/_components/detailOrdenDeServicioContent';
import { getAllEmpresasForComprobanteVentaRequestServer } from '@/app/ventas/[ventaId]/_services/requests';

export default async function Page({ params }) {
 
  const { ordenDeServicio } = await getOrdenDeServicioRequestServer(params.id);
  const { empresas } = await getAllEmpresasForComprobanteVentaRequestServer();

  if (!ordenDeServicio) {
    notFound();
  }

  const navbarTitles = [
    {
      title: 'Taller',
      href: '',
      active: false,
    },
    {
      title: 'Órdenes de servicio',
      href: '/taller/ordenes-servicio',
      active: true,
    },
    {
      title: ordenDeServicio?.code,
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailOrdenDeServicioContent ordenDeServicioData={ordenDeServicio} empresas={empresas} />
    </NavbarDynamic>
  );
}
