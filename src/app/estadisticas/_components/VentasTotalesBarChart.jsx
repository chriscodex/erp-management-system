"use client";

// import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { MesAnioPicker } from "@/components/calendars/MesAnioPicker";

export default function VentasTotalesBarChart({ dataVentasHistoricas }) {
  const router = useRouter();

  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());
  // const [chartData, setChartData] = useState([]);

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }

  const chartData = useMemo(() => {
    const ventasFiltradas = dataVentasHistoricas.ventasHistoricas.filter(
      (venta) => {
        const fecha = new Date(venta.fecha);
        return fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio;
      }
    );

    const ventasPorDia = {};

    for (const venta of ventasFiltradas) {
      const fecha = new Date(venta.fecha);
      const dia = fecha.toISOString().split("T")[0];

      if (ventasPorDia[dia]) {
        ventasPorDia[dia] += 1;
      } else {
        ventasPorDia[dia] = 1;
      }
    }

    const diasDelMes = [];
    const fechaInicio = new Date(anio, mes - 1, 1);
    const fechaFin = new Date(anio, mes, 0);

    for (
      let d = new Date(fechaInicio);
      d <= fechaFin;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];
      diasDelMes.push({
        date: dateStr,
        total: ventasPorDia[dateStr] || 0,
      });
    }

    return diasDelMes;
  }, [mes, anio, dataVentasHistoricas]);

  const total = useMemo(() => {
    return dataVentasHistoricas.ventasHistoricas.filter((venta) => {
      const fecha = new Date(venta.fecha);
      return fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio;
    }).length;
  }, [dataVentasHistoricas, mes, anio]);

  console.log("chartData", chartData);

  const chartConfig = {
    views: {
      label: "Ventas",
    },
    total: {
      label: "Total",
      color: "hsl(var(--chart-1))",
    },
  };

  useEffect(() => {
    router.refresh();
  }, [mes, anio, router]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Ventas por mes</CardTitle>
          <CardDescription>
            <span className="font-bold mr-2">Seleccione el mes y año: </span>
            <MesAnioPicker onChange={handleDateChange} />
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total del mes</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="total" fill="#F4A462" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
