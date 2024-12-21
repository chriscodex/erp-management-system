'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { RiIndeterminateCircleLine, RiDownload2Line } from '@remixicon/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { contarEstadoDeUnidades } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { generateExcelFileForProductsCode } from '@/app/inventario/productos/[id]/_services/helpers';
import { SheetAddStockProductWrapper } from '../Sheets/addStock/addStockProductWrapper';

export default function GraphicSingleProductCard({ unidades, product }) {
  const totalUnidades = unidades?.length;

  const {
    unidadesDisponibles,
    unidadesDanadas,
    unidadesReparadas,
    unidadesDesaparecidas,
  } = contarEstadoDeUnidades(unidades);

  // Datos para los gráficos
  const salesData = [
    {
      name: `Disponibles`,
      unidades: unidadesDisponibles,
      fill: '#16a34a',
    },
    {
      name: `Dañados`,
      unidades: unidadesDanadas,
      fill: '#ef4444',
    },
    {
      name: `Reparados`,
      unidades: unidadesReparadas,
      fill: '#3b82f6',
    },
    {
      name: `Desaparecidos`,
      unidades: unidadesDesaparecidas,
      fill: '#f59e0b',
    },
  ];

  // Obtener use mobile
  const isMobile = useIsMobile();

  const chartConfig = {
    unidades: {
      label: 'Unidades',
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="w-full flex-col">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-6">
            <SheetAddStockProductWrapper productData={product} />
            <Button variant="outline">
              <RiIndeterminateCircleLine className="h-5 w-5" />
              Disminuir Stock
            </Button>
            <Button
              variant="default"
              onClick={() => generateExcelFileForProductsCode(product)}
            >
              <RiDownload2Line className="h-5 w-5" />
              Descargar Códigos
            </Button>
          </div>
          <p className="text-sm font-bold flex items-center">
            Stock Total: {totalUnidades}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-2">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
          <Label className="sm:block font-bold text-green-600">{`Disponibles: ${unidadesDisponibles}`}</Label>
          <Label className="font-bold text-red-500">{`Dañados: ${unidadesDanadas}`}</Label>
          <Label className="font-bold text-blue-500">{`Reparados: ${unidadesReparadas}`}</Label>
          <Label className="font-bold text-amber-500">{`Desaparecidos: ${unidadesDesaparecidas}`}</Label>
        </div>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={'100%'}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const slice = isMobile
                    ? value.slice(0, 7)
                    : value.slice(0, 6);
                  return `${slice}.`;
                }}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="unidades" layout="vertical" radius={5} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
