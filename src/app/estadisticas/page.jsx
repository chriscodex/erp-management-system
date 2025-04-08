import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavbarSimple } from "@/components/navbar/NavbarSimple";
import { RiBarChart2Line } from "@remixicon/react";

import IncomeExpenseBarChart from "@/app/estadisticas/_components/IncomeExpenseBarChart";
import { getAllProductsRequestServer } from "@/app/inventario/productos/_services/requests";
import { getAllMotosRequestServer } from "../inventario/motos/todas/_services/requests";
import { getAllGastosGeneralesRequestServer } from "@/app/gastos-generales/_services/requests";
import { BoletasYFacturasPieChart } from "./_components/BoletasYFacturasPieChart";
import  {getCurrentCounterBoletaRequestClient}  from "@/app/ventas/[ventaId]/boleta/_services/requests";
import  {getCurrentCounterFacturaRequestClient} from "@/app/ventas/[ventaId]/factura/_services/requests";
import { LeaderboardSalesBarChart } from "./_components/LeaderboardSalesBarChart";
export default async function Page() {

  //Data para IncomeExpenseBarChart
  const dataProductos = await getAllProductsRequestServer();
  const dataMotos = await getAllMotosRequestServer();
  const dataGastosGenerales = await getAllGastosGeneralesRequestServer();

  //Data para BoletasYFacturasPieChart

  const dataCounterBoletas = await getCurrentCounterBoletaRequestClient();
  const dataCounterFacturas = await getCurrentCounterFacturaRequestClient();

  //Data para vendedores

  const dataVendedores = [];

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
              <BoletasYFacturasPieChart className="w-full flex-1" dataCounterBoletas={dataCounterBoletas} dataCounterFacturas={dataCounterFacturas}/>
              <LeaderboardSalesBarChart className="w-full flex-1" dataVendedores={dataVendedores}/>
            </div>
            
          </CardContent>
        </Card>
      </NavbarSimple>
    </>
  );
}
