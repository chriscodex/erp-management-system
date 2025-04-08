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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib/utils";

export default function IncomeExpenseBarChart({
  dataProductos,
  dataMotos,
  dataGastosGenerales,
}) {

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

  const dataMensual = { ingresos: 21111, egresos: resultado?.totalGeneral };
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
          <Card className="border-blue-500">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium mr-2 text-blue-700">
                  Ingresos por ventas
                </span>
                <span className=" font-semibold">S/ {formatMoney(ingresos)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold mr-2 text-blue-600">
                  Total ingresos
                </span>
                <span className="font-bold text-blue-600">S/ {formatMoney(ingresos)}</span>
              </div>
            </CardContent>
          </Card>
          {/* Card de Egresos */}
          <Card className="border-red-500">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium mr-2 text-red-700">
                  Gastos de motos
                </span>
                <span className="font-semibold">
                  S/ {formatMoney(resultado?.totalGastosMotos)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium mr-2 text-red-700">
                  Gastos de productos
                </span>
                <span className="font-semibold">
                  S/ {formatMoney(resultado?.totalGastosProductos)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium mr-2 text-red-700">
                  Gastos generales
                </span>
                <span className="font-semibold">
                  S/ {formatMoney(resultado?.totalGastosGenerales)}
                </span>
              </div>

              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold mr-2 text-red-600">
                  Total egresos
                </span>
                <span className="font-bold text-red-600">
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
                  ingresos - resultado?.totalGeneral >= 0
                    ? "bg-blue-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                S/ {formatMoney(ingresos - resultado?.totalGeneral)}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
