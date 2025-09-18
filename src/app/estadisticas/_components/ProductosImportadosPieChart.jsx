'use client';
import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

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

export default function ProductosImportadosPieChart({ dataProductos }) {
  function contarImportados(dataProductos) {
    const resultado = {
      importados: 0,
      noImportados: 0,
    };
    dataProductos?.products.forEach((producto) => {
      if (producto?.importado === 'sí' || producto?.importado === 'si') {
        resultado.importados += 1;
      } else {
        resultado.noImportados += 1;
      }
    });

    return resultado;
  }

  const resultado = contarImportados(dataProductos);

  const dataMensualProductosImportados = {
    importados: resultado.importados,
    noImportados: resultado.noImportados,
  };

  // Extraer importados y no importados del mes seleccionado

  const { importados = 0, noImportados = 0 } =
    dataMensualProductosImportados || {};

  const chartData = [
    { origen: 'Importados', cantidad: importados, fill: 'hsl(var(--chart-2))' },
    {
      origen: 'No importados',
      cantidad: noImportados,
      fill: 'hsl(var(--chart-3))',
    },
  ];

  const chartConfig = {
    boletas: {
      label: 'Importados ',
      color: 'hsl(var(--chart-1))',
    },
    facturas: {
      label: 'No importados ',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <Card className="flex flex-col w-full xl:flex-1 xl:self-start">
      <CardHeader className="items-center pb-0">
        <CardTitle>Productos importados en stock</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="cantidad" label nameKey="origen" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {/* {mensaje} */}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando total de productos importados y no importados en stock.
        </div>
      </CardFooter>
    </Card>
  );
}
