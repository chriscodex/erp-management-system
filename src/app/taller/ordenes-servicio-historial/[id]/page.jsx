import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { getOrdenDeServicioHistoricaRequestServer } from "@/app/taller/ordenes-servicio-historial/_services/requests";
import { DetailOrdenDeServicioHistoricaContent } from "@/app/taller/ordenes-servicio-historial/[id]/_components/detailOrdenDeServicioHistoricaContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const { ordenDeServicioHistorica } =
    await getOrdenDeServicioHistoricaRequestServer(params.id);

  if (
    !ordenDeServicioHistorica ||
    (session?.user?.rol !== "Administrador" && session?.user?.rol !== "Tecnico")
  ) {
    notFound();
  }

  const navbarTitles = [
    {
      title: "Taller",
      href: "",
      active: false,
    },
    {
      title: "Historial de Órdenes de Servicio",
      href: "/taller/ordenes-servicio-historial",
      active: true,
    },
    {
      title: ordenDeServicioHistorica?.code,
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailOrdenDeServicioHistoricaContent
        ordenDeServicioHistoricaData={ordenDeServicioHistorica}
      />
    </NavbarDynamic>
  );
}
