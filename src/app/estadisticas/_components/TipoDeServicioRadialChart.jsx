'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { MesAnioPicker } from '@/components/calendars/MesAnioPicker';

export default function TipoDeServicioRadialChart({
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
    Reparación: {
      label: 'Reparación',
      color: 'hsl(var(--chart-2))',
    },
    Mantenimiento: {
      label: 'Mantenimiento',
      color: 'hsl(var(--chart-3))',
    },
  };

  // Procesar datos para chart
  const chartData = useMemo(() => {
    const ordenes = dataOrdenesDeServicioHistoricas.ordenesDeServicioHistoricas;

    const reparacion = ordenes.filter((orden) => {
      const fecha = new Date(orden.fechaIngreso);
      return (
        orden.tipoServicio === 'reparacion' &&
        fecha.getMonth() + 1 === mes &&
        fecha.getFullYear() === anio
      );
    }).length;

    const mantenimiento = ordenes.filter((orden) => {
      const fecha = new Date(orden.fechaIngreso);
      return (
        orden.tipoServicio === 'mantenimiento' &&
        fecha.getMonth() + 1 === mes &&
        fecha.getFullYear() === anio
      );
    }).length;

    return [
      {
        name: 'total',
        reparacion,
        mantenimiento,
      },
    ];
  }, [dataOrdenesDeServicioHistoricas, mes, anio]);

  const total = chartData[0].reparacion + chartData[0].mantenimiento;

  useEffect(() => {
    router.refresh();
  }, [mes, anio, router]);

  return (
    <Card className="flex flex-col w-full xl:flex-1 xl:self-start">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tipos de Servicio</CardTitle>
        <CardDescription>
          <span className="font-bold mr-2">Seleccione el mes y año:</span>
          <MesAnioPicker onChange={handleDateChange} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            // startAngle={180}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !('cx' in viewBox && 'cy' in viewBox))
                    return null;
                  const { cx, cy } = viewBox;

                  return (
                    <>
                      {total > 0 ? (
                        <text x={cx} y={cy} textAnchor="middle">
                          <tspan
                            x={cx}
                            y={cy - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={cx}
                            y={cy + 4}
                            className="fill-muted-foreground text-sm"
                          >
                            Total
                          </tspan>
                        </text>
                      ) : (
                        <text x={cx} y={cy} textAnchor="middle">
                          <tspan
                            x={cx}
                            y={cy}
                            className="text-6xl font-bold fill-muted-foreground text-center pt-20"
                          >
                            0
                          </tspan>
                        </text>
                      )}
                    </>
                  );
                }}
              />
            </PolarRadiusAxis>

            <RadialBar
              dataKey="reparacion"
              stackId="a"
              cornerRadius={5}
              fill="hsl(var(--chart-2))"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mantenimiento"
              stackId="a"
              cornerRadius={5}
              fill="hsl(var(--chart-3))"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {total > 0
            ? `${total} órdenes registradas este mes`
            : 'Sin registros este mes'}
        </div>
        <div className="text-muted-foreground leading-none">
          Distribución de órdenes de servicio por tipo de servicio
        </div>
      </CardFooter>
    </Card>
  );
}
