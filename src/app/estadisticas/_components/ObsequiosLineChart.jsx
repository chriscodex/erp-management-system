"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import { useState, useEffect, useMemo } from "react";
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

import { AnioPicker } from "@/components/calendars/AnioPicker";

export default function ObsequiosLineChart({ dataVentasHistoricas }) {
  const router = useRouter();

  const [anio, setAnio] = useState(new Date().getFullYear());

  function handleDateChange(year) {
    setAnio(year);
  }

  const chartData = useMemo(() => {
    const data = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("es-PE", { month: "long" }),
      obsequios: 0,
    }));

    dataVentasHistoricas?.ventasHistoricas?.forEach((venta) => {
      const fecha = new Date(venta.fecha);
      const ventaAnio = fecha.getFullYear();
      const mes = fecha.getMonth(); // 0 (Enero) a 11 (Diciembre)

      if (ventaAnio === anio && Array.isArray(venta.obsequios)) {
        data[mes].obsequios += venta.obsequios.length;
      }
    });

    return data;
  }, [dataVentasHistoricas, anio]);


  const chartConfig = {
    obsequios: {
      label: "Obsequios",
      color: "hsl(var(--chart-1))",
    },
  };

  useEffect(() => {
    router.refresh(); // opcional si quieres recargar datos al cambiar año
  }, [anio, router]);
  return (
    <Card className="flex flex-col w-full xl:flex-1 xl:self-start">
      <CardHeader className="items-center pb-0">
        <CardTitle>Obsequios</CardTitle>
        <CardDescription>
          <span className="font-bold mr-2">Seleccione el año: </span>
          <AnioPicker onChange={handleDateChange} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="obsequios"
              // type="natural"
              type="monotone"
              stroke="#125427"
              strokeWidth={2}
              dot={{
                fill: "#125427",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={7}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando cantidad de obsequios dados por mes en {anio}
        </div>
      </CardFooter>
    </Card>
  );
}
