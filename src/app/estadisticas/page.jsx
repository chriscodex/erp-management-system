import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavbarSimple } from "@/components/navbar/NavbarSimple";
import { RiBarChart2Line } from "@remixicon/react";

import IncomeExpenseBarChart from "@/app/estadisticas/_components/IncomeExpenseBarChart";
import { getAllProductsRequestServer } from "@/app/inventario/productos/_services/requests";
import { getAllMotosRequestServer } from "../inventario/motos/todas/_services/requests";
import { getAllGastosGeneralesRequestServer } from "@/app/gastos-generales/_services/requests";

import  BoletasYFacturasPieChart  from "./_components/BoletasYFacturasPieChart";
import { getCounterByTypeRequestServer } from "@/app/estadisticas/_services/requests";

import { LeaderboardSalesBarChart } from "./_components/LeaderboardSalesBarChart";
import { getAllVentasRequestServer } from "@/app/ventas/_services/requests";

export default async function Page() {

  //Data para IncomeExpenseBarChart
  const dataProductos = await getAllProductsRequestServer();
  const dataMotos = await getAllMotosRequestServer();
  const dataGastosGenerales = await getAllGastosGeneralesRequestServer();

  //Data para BoletasYFacturasPieChart
  
  const dataCounterBoletas = await getCounterByTypeRequestServer("boletas");
  const dataCounterFacturas = await getCounterByTypeRequestServer("facturas");

  //Data para vendedores

  const dataVendedores = await getAllVentasRequestServer();

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
            <div className="flex flex-col gap-4 xl:flex-row">
              <LeaderboardSalesBarChart dataVendedores={dataVendedores}/>
              <BoletasYFacturasPieChart dataCounterBoletas={dataCounterBoletas} dataCounterFacturas={dataCounterFacturas}/>
            </div>
            
          </CardContent>
        </Card>
      </NavbarSimple>
    </>
  );
}
