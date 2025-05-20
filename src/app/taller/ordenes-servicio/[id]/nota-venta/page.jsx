import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getOrdenDeServicioRequestServer } from '@/app/taller/ordenes-servicio/_services/requests';
import { getAllEmpresasForComprobanteVentaRequestServer } from '@/app/ventas/[ventaId]/_services/requests';
import { DetailNotaDeVentaContent } from '@/app/taller/ordenes-servicio/[id]/nota-venta/_components/detailNotaDeVentaContent';

export default async function Page({ params }) {

   const { ordenDeServicio } = await getOrdenDeServicioRequestServer(params.id);
  
    const { empresas } = await getAllEmpresasForComprobanteVentaRequestServer();
  
    if (!ordenDeServicio) {
      notFound();
    }

  const navbarTitles = [
    {
      title: "Taller",
      href: "",
      active: false,
    },
    {
      title: "Órdenes de Servicio",
      href: "/taller/ordenes-servicio",
      active: true,
    },
    {
      title: ordenDeServicio?.code,
      href: `/taller/ordenes-servicio/${params.id}`,
      active: true,
    },
    {
      title: "Nota de venta",
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailNotaDeVentaContent ordenDeServicioData={ordenDeServicio} empresas={empresas} />
    </NavbarDynamic>
  );
}
