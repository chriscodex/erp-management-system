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

import LeaderboardSalesBarChart from "./_components/LeaderboardSalesBarChart";
import { getAllVentasHistoricasRequestServer } from "@/app/estadisticas/_services/requests";

import ProductosImportadosPieChart from "./_components/ProductosImportadosPieChart";
import ProductosMasVendidos from "./_components/ProductosMasVendidosBarChart";
import ObsequiosLineChart from "./_components/ObsequiosLineChart";

import VentasTotalesBarChart from "@/app/estadisticas/_components/VentasTotalesBarChart";

import PedidosAreaChart from "./_components/PedidosAreaChart";
import { getAllPedidosHistoricosRequestServer } from "@/app/estadisticas/_services/requests";

import OrdenesDeServicioAreaChart from "@/app/estadisticas/_components/OrdenesDeServicioAreaChart";
import TipoDeServicioRadialChart from "@/app/estadisticas/_components/TipoDeServicioRadialChart";
import OrigenDeServicioPieChart from "./_components/OrigenDeServicioPieChart";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllOrdenesDeServicioHistoricasRequestServer } from "../taller/ordenes-servicio-historial/_services/requests";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== "Administrador") {
    notFound();
  }

  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getAllProductsRequestServer(),
    getAllMotosRequestServer(),
    getAllGastosGeneralesRequestServer(),
    getAllVentasHistoricasRequestServer(),
    getAllPedidosHistoricosRequestServer(),
    getAllOrdenesDeServicioHistoricasRequestServer(),
  ]);
  const dataProductos = results[0].value;
  const dataMotos = results[1].value;
  const dataGastosGenerales = results[2].value;
  const dataVentasHistoricas = results[3].value;
  const dataPedidosHistoricos = results[4].value;
  const dataOrdenesDeServicioHistoricas = results[5].value;

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
              dataOrdenesDeServicioHistoricas={dataOrdenesDeServicioHistoricas}
            />
            <div className="flex flex-col gap-4 2xl:flex-row">
              <LeaderboardSalesBarChart
                dataVendedores={dataVentasHistoricas}
                cantidadVendedores={5}
              />
              <div className="flex flex-col gap-4">
                <BoletasYFacturasPieChart
                  dataVentasHistoricas={dataVentasHistoricas}
                  dataOrdenesDeServicioHistoricas={dataOrdenesDeServicioHistoricas}
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
            <div className="flex flex-col gap-4 2xl:flex-row">
              <div className="flex flex-col gap-4">
                <OrigenDeServicioPieChart
                  dataOrdenesDeServicioHistoricas={
                    dataOrdenesDeServicioHistoricas
                  }
                />
                <TipoDeServicioRadialChart
                  dataOrdenesDeServicioHistoricas={
                    dataOrdenesDeServicioHistoricas
                  }
                />
              </div>
              <OrdenesDeServicioAreaChart
                dataOrdenesDeServicioHistoricas={
                  dataOrdenesDeServicioHistoricas
                }
              />
            </div>
          </CardContent>
        </Card>
      </NavbarSimple>
    </>
  );
}
