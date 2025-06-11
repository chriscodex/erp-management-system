import { notFound } from "next/navigation";
import { RiBox2Fill } from "@remixicon/react";

import { Plus } from "lucide-react";
import Link from "next/link";

import { agregarNumeracionTable, sortByUpdateDateDesc } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { columnsPedidos } from "@/app/inventario/motos/pedidos/_components/pedidosTable/columns";
import { DataTablePedidos } from "@/app/inventario/motos/pedidos/_components/pedidosTable/data-table";
import { getAllPedidosRequestServer } from "@/app/inventario/motos/pedidos/_services/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function PedidosPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== "Administrador") {
    notFound();
  }
  const { pedidos, status } = await getAllPedidosRequestServer();

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
      title: "Pedidos",
      href: "",
      active: false,
    },
  ];

  // const reservacionesEnumeradas = agregarNumeracionTable(reservaciones);
  // const reservacionesSorted = sortByUpdateDateDesc(reservacionesEnumeradas);

  const pedidosEnumerados = agregarNumeracionTable(pedidos);
  const pedidosSorted = sortByUpdateDateDesc(pedidosEnumerados);

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Card>
          <CardHeader className="flex sm:flex-row flex-col items-center justify-between space-y-0 pb-2 gap-2 px-2">
            <div className="flex items-center gap-2 self-start">
              <RiBox2Fill className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">Pedidos</Label>
            </div>
            <Link href="/inventario/motos/pedidos/nuevo" className="self-end">
              <Button variant="default" className="flex h-auto">
                <Plus />
                Nuevo pedido
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <DataTablePedidos
              columns={columnsPedidos}
              data={pedidosSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
