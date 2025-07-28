import { notFound } from "next/navigation";
import { RiAuctionFill } from "@remixicon/react";

import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { agregarNumeracionTable, sortByUpdateDateDesc } from "@/lib/utils";
import { StatCard } from "@/components/customCards/statCard";
import { DollarSign } from "lucide-react";
import { getMotoByIdRequestServer } from "@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/_services/requests";
import { SheetAddGastoMotoWrapper } from "@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/gastos/_components/sheets/addGastoMoto/sheetAddGastoMotoWrapper";
import { DataTableGastosMoto } from "@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/gastos/_components/gastosMotoTable/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProductGastoPage({ params }) {
  const unidadId = params.unidadId;
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== "Administrador") {
    notFound();
  }

  const { moto, status } = await getMotoByIdRequestServer(unidadId);
  const { gastos } = moto;
  const gastosSorted = sortByUpdateDateDesc(gastos);
  const gastosEnumerados = agregarNumeracionTable(gastosSorted);

  if (!moto) {
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
      title: "Modelos",
      href: "/inventario/motos/modelos",
      active: true,
    },
    {
      title: moto?.modeloId?.nombre,
      href: `/inventario/motos/modelos/${moto?.modeloId?._id}`,
      active: true,
    },
    {
      title: `Moto ${moto?.nombre}`,
      href: `/inventario/motos/modelos/${moto?.modeloId?._id}/unidades/${moto?._id}`,
      active: true,
    },
    {
      title: "Gastos",
      href: "",
      active: false,
    },
  ];

  const totalMonto = gastosEnumerados.reduce(
    (sum, gasto) => sum + gasto.monto,
    0
  );
  return (
    <NavbarDynamic titles={navbarTitles}>
      <Card className="w-full">
        <CardHeader className="flex flex-col gap-2">
          <div className="w-full flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <RiAuctionFill className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">Gastos</Label>
            </div>
            <SheetAddGastoMotoWrapper motoId={unidadId} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Gastos Totales"
              value={parseFloat(totalMonto).toFixed(2)}
              icon={<DollarSign />}
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTableGastosMoto
            data={gastosEnumerados}
            status={status}
            unidadId={unidadId}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
