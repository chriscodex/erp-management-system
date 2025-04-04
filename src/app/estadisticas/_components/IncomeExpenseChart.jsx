"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";

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
import { useRouter } from "next/navigation";

export default function IncomeExpenseChart({ dataProductos, dataMotos }) {
  const router = useRouter();

  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }

  function sumarGastos(data, anio, mes) {
    if (!Array.isArray(data)) {
      console.error(data, "Array no válido.");
      return 0;
    }

    return data.reduce((total, producto) => {
      // Filtrar los gastos del producto según el mes y año
      const gastosFiltrados = (producto.gastos || []).filter((gasto) => {
        if (!gasto.fecha) return false; // Evitar errores si falta la fecha

        const fechaGasto = new Date(gasto.fecha);
        return (
          fechaGasto.getMonth() + 1 === mes &&
          fechaGasto.getFullYear() === anio
        );
      });

      // Sumar los montos de los gastos filtrados
      const sumaGastos = gastosFiltrados.reduce(
        (sum, gasto) => sum + (gasto.monto || 0),
        0
      );

      return total + sumaGastos;
    }, 0);
  }

  function filtrarYSumarGastosPorMes(dataProductos, dataMotos, mes, anio) {
    const totalGastosProductos = sumarGastos(dataProductos.products, anio, mes);
    const totalGastosMotos = sumarGastos(dataMotos.motos, anio, mes);

    return totalGastosProductos + totalGastosMotos;
  }

  const totalGastos = filtrarYSumarGastosPorMes(
    dataProductos,
    dataMotos,
    mes,
    anio
  );

  const dataMensual = { ingresos: 1500, egresos: totalGastos };
  // Extraer ingresos y egresos del mes seleccionado

  const { ingresos = 0, egresos = 0 } = dataMensual || {};

  const chartConfig = {
    ingresos: { label: "Ingresos", color: "hsl(var(--chart-1))" },
    egresos: { label: "Egresos", color: "hsl(var(--chart-2))" },
  };

  const chartData = [
    { tipo: "Ingresos", monto: ingresos, fill: "#3b82f6" },
    { tipo: "Egresos", monto: egresos, fill: "#ef4444" },
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
      <CardContent>
        <ChartContainer config={chartConfig}>
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
            <Bar dataKey="monto" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          {ingresos >= egresos
            ? "Tienes más ingresos que egresos"
            : "Tus egresos superan los ingresos"}
          <TrendingUp className="h-4 w-4" />
        </div> */}
      </CardFooter>
    </Card>
  );
}
