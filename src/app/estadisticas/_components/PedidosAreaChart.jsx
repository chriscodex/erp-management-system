"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

export default function PedidosAreaChart({ dataPedidosHistoricos }) {
  const router = useRouter();

  const [anio, setAnio] = useState(new Date().getFullYear());

  function handleDateChange(year) {
    setAnio(year);
  }

  const chartData = useMemo(() => {
    const data = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("es-PE", { month: "long" }),
      pedidos: 0,
    }));
  
    dataPedidosHistoricos?.pedidosHistoricos?.forEach((pedido) => {
      const fecha = new Date(pedido.createdAt);
      const pedidoAnio = fecha.getFullYear();
      const mes = fecha.getMonth(); // de 0 a 11
  
      if (pedidoAnio === anio) {
        data[mes].pedidos += 1;
      }
    });
  
    return data;
  }, [dataPedidosHistoricos, anio]);

  console.log("chartData de AreaChart", chartData);

    chartData[0].pedidos = 2
    chartData[1].pedidos = 4
    chartData[3].pedidos = 16
    chartData[8].pedidos = 10
    chartData[10].pedidos = 5

  const chartConfig = {
    desktop: {
      label: "Pedidos",
      color: "#2A9D90",
      dataKey: "pedidos",
    },
  };

  useEffect(() => {
    router.refresh();
  }, [anio, router]);

  return (
    <Card className="flex flex-col w-full xl:flex-1 xl:self-start">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pedidos</CardTitle>
        <CardDescription>
          <span className="font-bold mr-2">Seleccione el año: </span>
          <AnioPicker onChange={handleDateChange} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
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
            <YAxis domain={[0, 'dataMax + 1']} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="pedidos"
              type="monotone"
              fill="#2A9D90"
              fillOpacity={0.4}
              stroke="#2A9D90"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando cantidad de pedidos dados por mes en {anio}
        </div>
      </CardFooter>
    </Card>
  );
}
