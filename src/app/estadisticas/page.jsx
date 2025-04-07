import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavbarSimple } from "@/components/navbar/NavbarSimple";
import { RiBarChart2Line } from "@remixicon/react";

import IncomeExpenseBarChart from "@/app/estadisticas/_components/IncomeExpenseBarChart";
import { getAllProductsRequestServer } from "@/app/inventario/productos/_services/requests";
import { getAllMotosRequestServer } from "../inventario/motos/todas/_services/requests";
import { getAllGastosGeneralesRequestServer } from "@/app/gastos-generales/_services/requests";
import { BoletasYFacturasPieChart } from "./_components/BoletasYFacturasPieChart";
export default async function Page() {

  const dataProductos = await getAllProductsRequestServer();
  const dataMotos = await getAllMotosRequestServer();
  const dataGastosGenerales = await getAllGastosGeneralesRequestServer();

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
          <CardContent className="flex flex-col gap-4">
            <IncomeExpenseBarChart dataProductos={dataProductos} dataMotos={dataMotos} dataGastosGenerales={dataGastosGenerales}/>
            <div className="flex flex-col gap-4 lg:flex-row">
              <BoletasYFacturasPieChart />
              <BoletasYFacturasPieChart />
            </div>
            
          </CardContent>
        </Card>
      </NavbarSimple>
    </>
  );
}
