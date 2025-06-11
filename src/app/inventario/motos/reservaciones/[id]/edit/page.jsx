import { notFound } from "next/navigation";
import { RiEditFill } from "@remixicon/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";

import { getReservacionRequestServer } from "@/app/inventario/motos/reservaciones/_services/requests";
import { EditarReservacionForm } from "@/app/inventario/motos/reservaciones/[id]/edit/_components/EditarReservacionForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function EditarReservacionPage({ params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== "Administrador") {
    notFound();
  }
  const { reservacion } = await getReservacionRequestServer(params.id);

  const titles = [
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
      title: reservacion.moto.nombre,
      href: `/inventario/motos/reservaciones/${params.id}`,
      active: true,
    },
    {
      title: "Editar",
      href: "",
      active: false,
    },
  ];
  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <RiEditFill className="md:h-7 h-5 md:w-7 w-5" />
            Editar Reservacion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EditarReservacionForm reservacionData={reservacion} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
