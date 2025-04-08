"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
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

export function LeaderboardSalesBarChart({ dataVendedores }) {
  const router = useRouter();

  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }

  // console.log(dataVendedores);

  function topVendedoresPorMes(data, mes, anio) {
    // Filtrar ventas del mes y año
    const ventasFiltradas = data.ventas.filter(venta => {
      const fecha = new Date(venta.fecha);
      return fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio;
  });

    const resumenPorVendedor = {};

    ventasFiltradas.forEach(venta => {
        const vendedorId = venta.usuario.id;
        const nombre = `${venta.usuario.nombres} ${venta.usuario.apellidos}`;

        if (!resumenPorVendedor[vendedorId]) {
            resumenPorVendedor[vendedorId] = {
                name: nombre,
                motos: 0,
                productos: 0
            };
        }

        venta.productos.forEach(producto => {
            const cantidad = producto.cantidad || 1;

            if (producto.tipo === "moto") {
                resumenPorVendedor[vendedorId].motos += cantidad;
            } else if (producto.tipo === "producto") {
                resumenPorVendedor[vendedorId].productos += cantidad;
            }
        });
    });

    // Convertir a array, ordenar por total (motos + productos) y tomar top 5
    const topVendedores = Object.values(resumenPorVendedor)
        .sort((a, b) => (b.motos + b.productos) - (a.motos + a.productos))
        .slice(0, 5);

    return topVendedores;
}
  

  const resultado = topVendedoresPorMes(dataVendedores, mes, anio);

  console.log(resultado) ;

  // const chartData = [
  //   { name: "Rhay Erickson Valladares Ramírez", motos: 186, productos: 80 },
  //   { name: "María Fernanda Soto Ramírez", motos: 305, productos: 200 },
  //   { name: "Sandra Ríos Ramírez", motos: 237, productos: 120 },
  //   { name: "Valeria Torres Quispe", motos: 73, productos: 190 },
  //   { name: "Ana Valverde Soto", motos: 209, productos: 130 },
  // ];
  
  const chartData = resultado;


  const chartConfig = {
    motos: {
      label: "Motos",
      color: "#cd853f",
    },
    productos: {
      label: "Productos",
      color: "#9f7aea",
    },
    label: {
      color: "hsl(var(--background))",
    },
  };

  useEffect(() => {
    router.refresh();
  }, [mes, anio, router]);

  return (
    <Card className="flex flex-col w-full xl:flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Vendedor del mes</CardTitle>
        <CardDescription>
          <span className="font-bold mr-2">Seleccione el mes y año: </span>
          <MesAnioPicker onChange={handleDateChange} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
              left: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <XAxis dataKey="motos" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="motos"
              layout="vertical"
              fill="var(--color-motos)"
              radius={4}
            ></Bar>
            <Bar
              dataKey="productos"
              layout="vertical"
              fill="var(--color-productos)"
              radius={4}
            ></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mostrando top 5 vendedores por mes.
        </div>
      </CardFooter>
    </Card>
  );
}
