import { RiMotorbikeFill } from "@remixicon/react";

import { Label } from "@/components/ui/label";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTableModelos } from "@/app/inventario/motos/modelos/_components/ModelosTable/data-table";
import { columnsModelos } from "@/app/inventario/motos/modelos/_components/ModelosTable/columns";
import { getAllModelosRequestServer } from "@/app/inventario/motos/modelos/_services/requests";
import { sortByUpdateDateDesc } from "@/lib/utils";

export async function MotosModelosPage() {
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getServerSession(authOptions),
    getAllModelosRequestServer(),
  ]);

  const session = results[0].value;
  const { modelos } = results[1].value;
  const modelosSorted = sortByUpdateDateDesc(modelos);

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
      title: "Modelos",
      href: "",
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
            <div className="flex items-center gap-2">
              <RiMotorbikeFill className="md:h-9 h-5 md:w-9 w-5" />
              <Label className="sm:text-4xl text-xl font-bold">Modelos</Label>
            </div>
            {session?.user?.rol === "Administrador" && (
              <Button asChild>
                <Link href="/inventario/motos/modelos/nuevo">
                  <Plus className="h-4 w-4" /> Agregar Modelo
                </Link>
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <DataTableModelos columns={columnsModelos} data={modelosSorted} />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}

export default MotosModelosPage;
