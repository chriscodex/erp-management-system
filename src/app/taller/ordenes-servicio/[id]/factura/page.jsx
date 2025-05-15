import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { getOrdenDeServicioRequestServer } from '@/app/taller/ordenes-servicio/_services/requests';
import { DetailFacturaContent } from "@/app/taller/ordenes-servicio/[id]/factura/_components/detailFacturaContent";
import { getAllEmpresasForComprobanteVentaRequestServer } from "@/app/ventas/[ventaId]/_services/requests";

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
      title: "Factura",
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailFacturaContent ordenDeServicioData={ordenDeServicio} empresas={empresas} />
    </NavbarDynamic>
  );
}
