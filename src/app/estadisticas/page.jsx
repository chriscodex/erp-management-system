import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavbarSimple } from "@/components/navbar/NavbarSimple";
import { RiBarChart2Line } from "@remixicon/react";

import IncomeExpenseChart from "@/app/estadisticas/_components/IncomeExpenseChart";
import { getAllProductsRequestServer } from "@/app/inventario/productos/_services/requests";
import { getAllMotosRequestServer } from "../inventario/motos/todas/_services/requests";
export default async function Page() {

  const dataProductos = await getAllProductsRequestServer();
  const dataMotos = await getAllMotosRequestServer();

  return (
    <>
      <NavbarSimple title="Estadísticas">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <RiBarChart2Line className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">
                Estadísticas
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart dataProductos={dataProductos} dataMotos={dataMotos}/>
          </CardContent>
        </Card>
      </NavbarSimple>
    </>
  );
}
