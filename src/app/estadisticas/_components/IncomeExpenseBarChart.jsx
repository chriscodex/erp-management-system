"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MesAnioPicker } from "@/components/calendars/MesAnioPicker";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib/utils";

export default function IncomeExpenseBarChart({
  dataProductos,
  dataMotos,
  dataGastosGenerales,
  dataVentasHistoricas,
  dataOrdenesDeServicioHistoricas,
}) {
  console.log(
    "dataOrdenesDeServicioHistoricas:",
    dataOrdenesDeServicioHistoricas
  );
  const router = useRouter();

  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [withImpuestos, setWithImpuestos] = useState(false);

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }

  //Cálculos para CingresosCalculados.totalGeneral (ventas)

  // function sumarIngresos(dataVentasHistoricas, anio, mes) {
  //   if (
  //     !dataVentasHistoricas ||
  //     !Array.isArray(dataVentasHistoricas.ventasHistoricas)
  //   ) {
  //     console.error("Ventas históricas no válidas");
  //     return 0;
  //   }

  //   return dataVentasHistoricas.ventasHistoricas.reduce((total, venta) => {
  //     const fechaVenta = new Date(venta.fecha);
  //     const mesVenta = fechaVenta.getMonth() + 1;
  //     const anioVenta = fechaVenta.getFullYear();

  //     if (mesVenta === mes && anioVenta === anio) {
  //       const sumaVenta = (venta.productos || []).reduce((suma, producto) => {
  //         return suma + (producto.precioVenta || 0);
  //       }, 0);

  //       return total + sumaVenta;
  //     }

  //     return total;
  //   }, 0);
  // }

  // const totalIngresos = sumarIngresos(dataVentasHistoricas, anio, mes);

  // Ingresos por ventas históricas
  function sumarIngresosVentas(dataVentasHistoricas, anio, mes) {
    if (
      !dataVentasHistoricas ||
      !Array.isArray(dataVentasHistoricas.ventasHistoricas)
    ) {
      console.error("Ventas históricas no válidas");
      return 0;
    }

    return dataVentasHistoricas.ventasHistoricas.reduce((total, venta) => {
      const fechaVenta = new Date(venta.fecha);
      const mesVenta = fechaVenta.getMonth() + 1;
      const anioVenta = fechaVenta.getFullYear();

      if (mesVenta === mes && anioVenta === anio) {
        const sumaVenta = (venta.productos || []).reduce((suma, producto) => {
          const precio = producto.precioVenta || 0;
          const cantidad = producto.cantidad || 0;
          return suma + precio * cantidad;
        }, 0);

        return total + sumaVenta;
      }

      return total;
    }, 0);
  }

  // Ingresos por órdenes de servicio
  function sumarIngresosOrdenesServicio(
    dataOrdenesDeServicioHistoricas,
    anio,
    mes
  ) {
    if (
      !dataOrdenesDeServicioHistoricas ||
      !Array.isArray(
        dataOrdenesDeServicioHistoricas.ordenesDeServicioHistoricas
      )
    ) {
      console.error("Órdenes de servicio históricas no válidas");
      return 0;
    }

    return dataOrdenesDeServicioHistoricas.ordenesDeServicioHistoricas.reduce(
      (total, orden) => {
        const fechaOrden = new Date(orden.fechaIngreso);
        const mesOrden = fechaOrden.getMonth() + 1;
        const anioOrden = fechaOrden.getFullYear();

        if (mesOrden === mes && anioOrden === anio) {
          // Productos
          const sumaProductos = (orden.productos || []).reduce(
            (suma, producto) => {
              const precio = producto.precioVenta || 0;
              const cantidad = producto.cantidad || 0;
              return suma + precio * cantidad;
            },
            0
          );

          // Servicios
          const sumaServicios = (orden.servicios || []).reduce(
            (suma, servicio) => {
              const precio = servicio.precio || 0;
              return suma + precio;
            },
            0
          );

          return total + sumaProductos + sumaServicios;
        }

        return total;
      },
      0
    );
  }

  // Combinar ingresos
  function calcularIngresos(
    dataVentasHistoricas,
    dataOrdenesDeServicioHistoricas,
    anio,
    mes
  ) {
    const totalIngresosVentas = sumarIngresosVentas(
      dataVentasHistoricas,
      anio,
      mes
    );
    const totalIngresosOrdenes = sumarIngresosOrdenesServicio(
      dataOrdenesDeServicioHistoricas,
      anio,
      mes
    );

    return {
      totalIngresosVentas,
      totalIngresosOrdenes,
      totalGeneral: totalIngresosVentas + totalIngresosOrdenes,
    };
  }

  const ingresosResultado = calcularIngresos(
    dataVentasHistoricas,
    dataOrdenesDeServicioHistoricas,
    anio,
    mes
  );

  // Con impuestos

  // Aplica el 0.82 si el filtro está activo
  const ingresosCalculados = {
    totalIngresosVentas: withImpuestos
      ? ingresosResultado.totalIngresosVentas * 0.82
      : ingresosResultado.totalIngresosVentas,
    totalIngresosOrdenes: withImpuestos
      ? ingresosResultado.totalIngresosOrdenes * 0.82
      : ingresosResultado.totalIngresosOrdenes,
    totalGeneral: withImpuestos
      ? ingresosResultado.totalGeneral * 0.82
      : ingresosResultado.totalGeneral,
  };

  //Cálculos para egresos

  function sumarGastos(data, anio, mes) {
    if (!Array.isArray(data)) {
      console.error(data, "Array no válido.");
      return 0;
    }
    return data.reduce((total, row) => {
      // Filtrar los gastos del row según el mes y año para productos y motos
      const gastosFiltrados = (row?.gastos || []).filter((gasto) => {
        if (!gasto.fecha) return false; // Evitar errores si falta la fecha
        const fechaGasto = new Date(gasto.fecha);
        return (
          fechaGasto.getMonth() + 1 === mes && fechaGasto.getFullYear() === anio
        );
      });

      // Sumar los montos de los gastos filtrados
      const sumaGastos = gastosFiltrados.reduce(
        (sum, gasto) => sum + (gasto.monto || 0),
        0
      );

      // Filtrar los gastos del row según el mes y año para gastos generales

      let montoDirecto = 0;

      if (row.fecha) {
        const fechaRow = new Date(row.fecha);
        if (
          fechaRow.getMonth() + 1 === mes &&
          fechaRow.getFullYear() === anio
        ) {
          montoDirecto = row.monto || 0;
        }
      }

      return total + sumaGastos + montoDirecto;
    }, 0);
  }

  function filtrarYSumarGastosPorMes(
    dataProductos,
    dataMotos,
    dataGastosGenerales,
    mes,
    anio
  ) {
    const totalGastosProductos = sumarGastos(dataProductos.products, anio, mes);
    const totalGastosMotos = sumarGastos(dataMotos.motos, anio, mes);
    const totalGastosGenerales = sumarGastos(
      dataGastosGenerales.gastosGenerales,
      anio,
      mes
    );

    return {
      totalGastosProductos,
      totalGastosMotos,
      totalGastosGenerales,
      totalGeneral:
        totalGastosProductos + totalGastosMotos + totalGastosGenerales,
    };
  }

  const resultado = filtrarYSumarGastosPorMes(
    dataProductos,
    dataMotos,
    dataGastosGenerales,
    mes,
    anio
  );

  const dataMensual = {
    ingresos: ingresosResultado?.totalGeneral,
    egresos: resultado?.totalGeneral,
  };
  // Extraer ingresos y egresos del mes seleccionado

  const { ingresos = 0, egresos = 0 } = dataMensual || {};

  const chartConfig = {
    ingresos: { label: "Ingresos", color: "hsl(var(--chart-1))" },
    egresos: { label: "Egresos", color: "hsl(var(--chart-2))" },
  };

  const chartData = [
    { tipo: "Ingresos", monto: ingresos, fill: "hsl(var(--chart-1))" },
    { tipo: "Egresos", monto: egresos, fill: "hsl(var(--chart-2))" },
  ];

  useEffect(() => {
    router.refresh();
  }, [mes, anio, router]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2 text-lg">Ingresos y egresos</CardTitle>
        <CardDescription className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="font-bold mr-2">Seleccione el mes y año: </span>
          <MesAnioPicker onChange={handleDateChange} />
          {/* Toggle con impuestos */}
          <Button
            variant={withImpuestos ? "default" : "outline"}
            onClick={() => setWithImpuestos(!withImpuestos)}
          >
            Con impuestos
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center lg:flex-row gap-5">
        <div className="flex-1  w-full h-auto">
          {/* <ResponsiveContainer width="100%" height={250}> */}
          <ChartContainer
            config={chartConfig}
            className="w-full h-full overflow-hidden lg:min-w-[350px]"
          >
            <BarChart data={chartData} layout="vertical" margin={{ left: 0 }}>
              <YAxis
                dataKey="tipo"
                type="category"
                tickLine={false}
                tickMargin={5}
                axisLine={false}
                tickFormatter={(value) => chartConfig[value]?.label || value}
              />
              <XAxis dataKey="monto" type="number" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="monto"
                layout="vertical"
                radius={5}
                minPointSize={8}
              />
            </BarChart>
          </ChartContainer>
          {/* </ResponsiveContainer> */}
        </div>

        <div className="w-full md:max-w-sm grid gap-4 text-sm">
          {/* Título */}
          <h2 className="text-base font-semibold text-center">
            Detalle de ingresos y egresos
          </h2>
          {/* Card de Ingresos */}
          <Card className="border-chart-1">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium mr-2 text-chart-1">
                  Ingresos por ventas
                </span>
                <span className="font-semibold">
                  S/ {formatMoney(ingresosCalculados.totalIngresosVentas)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium mr-2 text-chart-1">
                  Ingresos por órdenes de servicio
                </span>
                <span className="font-semibold">
                  S/ {formatMoney(ingresosCalculados.totalIngresosOrdenes)}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-semibold mr-2 text-chart-1">
                  Total ingresos
                </span>
                <span className="font-bold text-chart-1">
                  S/ {formatMoney(ingresosCalculados.totalGeneral)}
                </span>
              </div>
            </CardContent>
          </Card>
          {/* Card de Egresos */}
          <Card className="border-chart-2">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium mr-2 text-chart-2">
                  Gastos de motos
                </span>
                <span className="font-semibold">
                  S/ {formatMoney(resultado?.totalGastosMotos)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium mr-2 text-chart-2">
                  Gastos de productos
                </span>
                <span className="font-semibold">
                  S/ {formatMoney(resultado?.totalGastosProductos)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium mr-2 text-chart-2">
                  Gastos generales
                </span>
                <span className="font-semibold">
                  S/ {formatMoney(resultado?.totalGastosGenerales)}
                </span>
              </div>

              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold mr-2 text-chart-2">
                  Total egresos
                </span>
                <span className="font-bold text-chart-2">
                  S/ {formatMoney(resultado?.totalGeneral)}
                </span>
              </div>
            </CardContent>
          </Card>
          {/* Balance final */}
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <span className="text-base font-semibold mr-2">Balance</span>
              <Badge
                className={`text-sm ${
                  ingresosCalculados.totalGeneral - resultado?.totalGeneral >= 0
                    ? "bg-chart-1 text-white"
                    : "bg-chart-2 text-white"
                }`}
              >
                S/{" "}
                {formatMoney(
                  ingresosCalculados.totalGeneral - resultado?.totalGeneral
                )}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
