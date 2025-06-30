import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import {
  getUserRequestServer,
  getVentasHistoricasRequestServer,
} from "@/app/usuarios/[id]/_services/requests";
import { DetailSellsPerUserContent } from "@/app/usuarios/[id]/ventas/_components/detailSellsPerUserContent";

export default async function Page({ params }) {

  const userId = params.id;

  const { user } = await getUserRequestServer(userId);

  const fullName = user.nombres + " " + user.apellidos;

  const { ventasHistoricas } = await getVentasHistoricasRequestServer(params.id);

  if (!user && user.rol !== "Técnico") {
    notFound();
  }
  
  const navbarTitles = [
    {
      title: "Usuarios",
      href: "/usuarios",
      active: true,
    },
    {
      title: fullName,
      href: "/usuarios/" + userId,
      active: true,
    },
    {
      title: "Ventas",
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailSellsPerUserContent
        userData={user}
        ventasHistoricasData={ventasHistoricas}
      />
    </NavbarDynamic>
  );
}
