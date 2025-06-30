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
import { formatMoney } from "@/lib/utils";

export default function IncomeExpenseBarChart({
  dataProductos,
  dataMotos,
  dataGastosGenerales,
  dataVentasHistoricas,
}) {
  const router = useRouter();

  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  console.log("Desde IncomeExpense", dataVentasHistoricas);

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }

  //Cálculos para ingresos (ventas)

  function sumarIngresos(dataVentasHistoricas, anio, mes) {
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
          return suma + (producto.precioVenta || 0);
        }, 0);

        return total + sumaVenta;
      }

      return total;
    }, 0);
  }

  const totalIngresos = sumarIngresos(dataVentasHistoricas, anio, mes);

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
    ingresos: totalIngresos,
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
        <CardDescription className="">
          <span className="font-bold mr-2">Seleccione el mes y año: </span>
          <MesAnioPicker onChange={handleDateChange} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5">
        <div className="grid w-full grid-cols-1 lg:grid-cols-3">
          <div className="flex flex-1 flex-col justify-center gap-1 border px-6 py-4 text-left sm:px-2 sm:py-6">
            <span className="text-xs text-muted-foreground">Ingresos</span>
            <span className="text-base font-bold leading-none 2xl:text-sm">
              {"S/." + formatMoney(ingresos)}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 border-x lg:border-y px-6 py-4 text-left sm:px-2 sm:py-6">
            <span className="text-xs text-muted-foreground">Egresos</span>
            <span className="text-base font-bold leading-none 2xl:text-sm">
              {"S/." + formatMoney(egresos)}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 border px-6 py-4 text-left sm:px-2 sm:py-6">
            <span className="text-xs text-muted-foreground">Balance</span>
            <span className="text-base font-bold leading-none 2xl:text-sm">
              {"S/." + formatMoney(ingresos - egresos)}
            </span>
          </div>
        </div>
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
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
