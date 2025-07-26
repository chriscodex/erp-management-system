import { notFound } from "next/navigation";
import { RiCalendarScheduleLine } from "@remixicon/react";
import { Plus } from "lucide-react";
import Link from "next/link";

import { agregarNumeracionTable, sortByUpdateDateDesc } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { columnsReservaciones } from "@/app/inventario/motos/reservaciones/_components/reservacionesTable/columns";
import { DataTableReservaciones } from "@/app/inventario/motos/reservaciones/_components/reservacionesTable/data-table";
import { getAllReservacionesRequestServer } from "@/app/inventario/motos/reservaciones/_services/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ReservacionesPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== "Administrador") {
    notFound();
  }

  const { reservaciones, status } = await getAllReservacionesRequestServer();
  const reservacionesEnumeradas = agregarNumeracionTable(reservaciones);
  const reservacionesSorted = sortByUpdateDateDesc(reservacionesEnumeradas);

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
      href: "",
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Card>
          <CardHeader className="flex sm:flex-row flex-col items-center justify-between space-y-0 pb-2 gap-2 px-2">
            <div className="flex items-center gap-2 self-start">
              <RiCalendarScheduleLine className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">
                Reservaciones
              </Label>
            </div>
            <Link
              href="/inventario/motos/reservaciones/nuevo"
              className="self-end"
            >
              <Button variant="default" className="flex h-auto">
                <Plus />
                Nueva Reservación
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <DataTableReservaciones
              columns={columnsReservaciones}
              data={reservacionesSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
