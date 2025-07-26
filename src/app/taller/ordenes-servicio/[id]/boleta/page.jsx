import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { getOrdenDeServicioRequestServer } from "@/app/taller/ordenes-servicio/_services/requests";
import { DetailBoletaContent } from "@/app/taller/ordenes-servicio/[id]/boleta/_components/detailBoletaContent";
import { getAllEmpresasForComprobanteVentaRequestServer } from "@/app/ventas/[ventaId]/_services/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);

  if (
    session?.user?.rol !== "Administrador" &&
    session?.user?.rol !== "Tecnico"
  ) {
    notFound();
  }
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getOrdenDeServicioRequestServer(params.id),
    getAllEmpresasForComprobanteVentaRequestServer(),
  ]);

  const { ordenDeServicio } = results[0].value;
  const { empresas } = results[1].value;

  const hayProductosServicios =
    (ordenDeServicio?.productos?.length ?? 0) > 0 ||
    (ordenDeServicio?.servicios?.length ?? 0) > 0;

  if (!ordenDeServicio || !hayProductosServicios) {
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
      title: "Boleta",
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailBoletaContent
        ordenDeServicioData={ordenDeServicio}
        empresas={empresas}
      />
    </NavbarDynamic>
  );
}
