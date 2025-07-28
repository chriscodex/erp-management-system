import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { getOrdenDeServicioRequestServer } from "@/app/taller/ordenes-servicio/_services/requests";
import { DetailOrdenDeServicioContent } from "@/app/taller/ordenes-servicio/[id]/_components/detailOrdenDeServicioContent";
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
      title: "Órdenes de servicio",
      href: "/taller/ordenes-servicio",
      active: true,
    },
    {
      title: ordenDeServicio?.code,
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailOrdenDeServicioContent
        ordenDeServicioData={ordenDeServicio}
        empresas={empresas}
      />
    </NavbarDynamic>
  );
}
