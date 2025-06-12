import { notFound } from "next/navigation";

import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NavbarSimple } from "@/components/navbar/NavbarSimple";
import { RiBarChart2Line } from "@remixicon/react";

import IncomeExpenseBarChart from "@/app/estadisticas/_components/IncomeExpenseBarChart";
import { getAllProductsRequestServer } from "@/app/inventario/productos/_services/requests";
import { getAllMotosRequestServer } from "../inventario/motos/todas/_services/requests";
import { getAllGastosGeneralesRequestServer } from "@/app/gastos-generales/_services/requests";

import BoletasYFacturasPieChart from "./_components/BoletasYFacturasPieChart";
import { getCounterByTypeRequestServer } from "@/app/estadisticas/_services/requests";

import LeaderboardSalesBarChart from "./_components/LeaderboardSalesBarChart";
import { getAllVentasHistoricasRequestServer } from "@/app/estadisticas/_services/requests";

import ProductosImportadosPieChart from "./_components/ProductosImportadosPieChart";
import ProductosMasVendidos from "./_components/ProductosMasVendidosBarChart";
import ObsequiosLineChart from "./_components/ObsequiosLineChart";

import VentasTotalesBarChart from "@/app/estadisticas/_components/VentasTotalesBarChart";

import PedidosAreaChart from "./_components/PedidosAreaChart";
import { getAllPedidosHistoricosRequestServer } from "@/app/estadisticas/_services/requests";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== "Administrador") {
    notFound();
  }

  //Data para IncomeExpenseBarChart
  const dataProductos = await getAllProductsRequestServer();
  const dataMotos = await getAllMotosRequestServer();
  const dataGastosGenerales = await getAllGastosGeneralesRequestServer();

  //Data para contadores de boletas y facturas

  const dataCounterBoletas = await getCounterByTypeRequestServer("boletas");
  const dataCounterFacturas = await getCounterByTypeRequestServer("facturas");

  //Data para vendedores y productos mas vendidos
  const dataVentasHistoricas = await getAllVentasHistoricasRequestServer();

  //Data para pedidos

  const dataPedidosHistoricos = await getAllPedidosHistoricosRequestServer();

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
            <IncomeExpenseBarChart
              dataProductos={dataProductos}
              dataMotos={dataMotos}
              dataGastosGenerales={dataGastosGenerales}
              dataVentasHistoricas={dataVentasHistoricas}
            />
            <div className="flex flex-col gap-4 2xl:flex-row">
              <LeaderboardSalesBarChart
                dataVendedores={dataVentasHistoricas}
                cantidadVendedores={5}
              />
              <div className="flex flex-col gap-4">
                <BoletasYFacturasPieChart
                  dataCounterBoletas={dataCounterBoletas}
                  dataCounterFacturas={dataCounterFacturas}
                />
                <ProductosImportadosPieChart dataProductos={dataProductos} />
              </div>
            </div>
            <ProductosMasVendidos dataVentasHistoricas={dataVentasHistoricas} />
            <div className="flex flex-col gap-4 2xl:flex-row">
              <VentasTotalesBarChart
                dataVentasHistoricas={dataVentasHistoricas}
              />
              <ObsequiosLineChart dataVentasHistoricas={dataVentasHistoricas} />
            </div>
            <PedidosAreaChart dataPedidosHistoricos={dataPedidosHistoricos} />
          </CardContent>
        </Card>
      </NavbarSimple>
    </>
  );
}
