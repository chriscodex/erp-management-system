import { notFound } from "next/navigation";
import { RiFileCopy2Line } from "@remixicon/react";

import { sortByUpdateDateDesc } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { getAllOrdenesDeServicioRequestServer } from "@/app/taller/ordenes-servicio/_services/requests";
import { DataTableOrdenesDeServicio } from "@/app/taller/ordenes-servicio/_components/ordenesServicioTable/data-table";
import { columnsOrdenesDeServicio } from "@/app/taller/ordenes-servicio/_components/ordenesServicioTable/columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function VentasPage() {

  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== "Administrador" && session?.user?.rol !== "Tecnico") {
    notFound();
  }

  const { ordenesDeServicio, status } =
    await getAllOrdenesDeServicioRequestServer();

  const ordenesDeServicioSorted = sortByUpdateDateDesc(ordenesDeServicio);

  const titles = [
    {
      title: "Órdenes de Servicios",
      href: "",
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <RiFileCopy2Line className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">
                Órdenes de servicio
              </Label>
            </div>
            <Button>
              <Link
                href="/taller/ordenes-servicio/nuevo"
                className="flex justify-end items-center gap-2"
              >
                <Plus />
                <span>Agregar Orden de Servicio</span>
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTableOrdenesDeServicio
              columns={columnsOrdenesDeServicio}
              data={ordenesDeServicioSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
