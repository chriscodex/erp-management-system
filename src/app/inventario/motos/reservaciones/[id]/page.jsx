import { notFound } from "next/navigation";

import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { getReservacionRequestServer } from "@/app/inventario/motos/reservaciones/_services/requests";
import { DetailReservacionContent } from "@/app/inventario/motos/reservaciones/[id]/_components/DetailReservacionContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== "Administrador") {
    notFound();
  }

  const { reservacion } = await getReservacionRequestServer(params.id);

  if (!reservacion) {
    notFound();
  }

  const navbarTitles = [
    {
      title: "Inventario",
      href: "",
      active: false,
    },
    {
      title: "Motos",
      href: "",
      active: false,
    },
    {
      title: "Reservaciones",
      href: "/inventario/motos/reservaciones",
      active: true,
    },
    {
      title: reservacion?.moto.nombre,
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailReservacionContent reservacionData={reservacion} />
    </NavbarDynamic>
  );
}
