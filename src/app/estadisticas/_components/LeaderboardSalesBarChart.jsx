'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useState, useEffect } from 'react';
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

import { Button } from '@/components/ui/button';

import { MesAnioPicker } from '@/components/calendars/MesAnioPicker';

export default function LeaderboardSalesBarChart({
  dataVendedores,
  cantidadVendedores,
}) {
  const router = useRouter();

  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  function handleDateChange(month, year) {
    setMes(month);
    setAnio(year);
  }

  function topVendedoresPorMes(data, mes, anio) {
    // Filtrar ventas del mes y año
    const ventasHistoricasFiltradas = data.ventasHistoricas.filter((venta) => {
      const fecha = new Date(venta.fecha);
      return fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio;
    });

    const resumenPorVendedor = {};

    ventasHistoricasFiltradas.forEach((venta) => {
      const vendedorId = venta.usuario.id;
      const nombre = `${venta.usuario.nombres} ${venta.usuario.apellidos}`;

      if (!resumenPorVendedor[vendedorId]) {
        resumenPorVendedor[vendedorId] = {
          name: nombre,
          motos: 0,
          productos: 0,
        };
      }

      venta.productos.forEach((producto) => {
        const cantidad = producto.cantidad || 1;

        if (producto.tipo === 'moto') {
          resumenPorVendedor[vendedorId].motos += cantidad;
        } else if (producto.tipo === 'producto') {
          resumenPorVendedor[vendedorId].productos += cantidad;
        }
      });
    });

    // Convertir a array, ordenar por total (motos + productos) y tomar top 5
    const topVendedores = Object.values(resumenPorVendedor).sort(
      (a, b) => b.motos + b.productos - (a.motos + a.productos),
    );
    // .slice(0, 5);

    const dataFiltrada = cantidadVendedores
      ? topVendedores.slice(0, cantidadVendedores)
      : topVendedores;

    return dataFiltrada;
  }

  const resultado = topVendedoresPorMes(dataVendedores, mes, anio);

  const chartData = resultado;

  const chartConfig = {
    motos: {
      label: 'Motos',
      color: 'hsl(var(--chart-3))',
    },
    productos: {
      label: 'Productos',
      color: 'hsl(var(--chart-4))',
    },
    label: {
      color: 'hsl(var(--background))',
    },
  };

  useEffect(() => {
    router.refresh();
  }, [mes, anio, router]);

  return (
    <Card className="flex flex-col w-full xl:flex-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>Vendedor del mes</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span className="font-bold mr-2">Seleccione el mes y año: </span>
          <MesAnioPicker onChange={handleDateChange} />
          <Button onClick={() => router.push('/estadisticas/vendedores')}>
            Ver Todos
          </Button>
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
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
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
          {cantidadVendedores
            ? 'Mostrando top ' + cantidadVendedores + ' vendedores del mes.'
            : 'Mostrando todos los vendedores del mes.'}
        </div>
      </CardFooter>
    </Card>
  );
}
