"use client";

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
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

export default function ProductosMasVendidos(dataVentasHistoricas) {

  const router = useRouter();

  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }

  const chartConfig = {};

  // Agrupa productos por nombre y suma cantidades

  const ventas =
    dataVentasHistoricas?.dataVentasHistoricas?.ventasHistoricas || [];

  // Filtrar por mes y año seleccionados
  const ventasFiltradas = ventas.filter((venta) => {
    const fecha = new Date(venta.fecha);
    return fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio;
  });

  // Agrupar productos por nombre y sumar cantidades
  const getTopProductosMasVendidos = (ventas) => {
    const conteo = {};

    ventas.forEach((venta) => {
      venta.productos.forEach((producto) => {
        const nombre = producto.nombre;
        const cantidad = producto.cantidad || 1;

        if (!conteo[nombre]) {
          conteo[nombre] = 0;
        }

        conteo[nombre] += cantidad;
      });
    });

    // Convertir a array, ordenar, tomar top 5
    return Object.entries(conteo)
      .map(([nombre, cantidad]) => ({
        nombre,
        cantidad,
      }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5)
      .map((item, index) => ({
        ...item,
        fill: `hsl(var(--chart-${(index % 5) + 1}))`, // Rota colores del 1 al 5
      }));
  };

  const chartData = getTopProductosMasVendidos(ventasFiltradas);

  const activeIndex = chartData.reduce(
    (maxIndex, item, idx, arr) =>
      item.cantidad > arr[maxIndex].cantidad ? idx : maxIndex,
    0
  );
  
  useEffect(() => {
    router.refresh();
  }, [mes, anio, router]);

  return (
    <Card className="flex flex-col w-full xl:flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Productos más vendidos</CardTitle>
        <CardDescription>
          <span className="font-bold mr-2">Seleccione el mes y año: </span>
          <MesAnioPicker onChange={handleDateChange} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="nombre"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="cantidad"
              strokeWidth={2}
              radius={8}
              activeIndex={activeIndex}
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando top 5 productos más vendidos este mes
        </div>
      </CardFooter>
    </Card>
  );
}
