'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { MesAnioPicker } from '@/components/calendars/MesAnioPicker';

export default function OrdenesDeServicioAreaChart({
  dataOrdenesDeServicioHistoricas,
}) {
  const router = useRouter();

  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }

  const chartConfig = {
    total: {
      label: 'Total',
      color: 'var(--chart-4)',
    },
  };

  const chartData = useMemo(() => {
    const ordenesDeServicioFiltradas =
      dataOrdenesDeServicioHistoricas.ordenesDeServicioHistoricas.filter(
        (ordenDeServicio) => {
          const fecha = new Date(ordenDeServicio.fechaIngreso);
          return fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio;
        },
      );

    const ordenesDeServicioPorDia = {};

    for (const ordenDeServicio of ordenesDeServicioFiltradas) {
      const fecha = new Date(ordenDeServicio.fechaIngreso);
      const dia = fecha.toISOString().split('T')[0];

      if (ordenesDeServicioPorDia[dia]) {
        ordenesDeServicioPorDia[dia] += 1;
      } else {
        ordenesDeServicioPorDia[dia] = 1;
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
      const dateStr = d.toISOString().split('T')[0];
      diasDelMes.push({
        date: dateStr,
        total: ordenesDeServicioPorDia[dateStr] || 0,
      });
    }

    return diasDelMes;
  }, [mes, anio, dataOrdenesDeServicioHistoricas]);

  const total = useMemo(() => {
    return dataOrdenesDeServicioHistoricas.ordenesDeServicioHistoricas.filter(
      (ordenDeServicio) => {
        const fecha = new Date(ordenDeServicio.fechaIngreso);
        return fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio;
      },
    ).length;
  }, [dataOrdenesDeServicioHistoricas, mes, anio]);

  useEffect(() => {
    router.refresh();
  }, [mes, anio, router]);

  return (
    <Card className="flex flex-col w-full xl:flex-1">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center items-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Órdenes de servicio por mes</CardTitle>
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
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="hsl(var(--chart-4))" stopOpacity={0.9} />
                <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="total"
              type="natural"
              fill="url(#fillTotal)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
