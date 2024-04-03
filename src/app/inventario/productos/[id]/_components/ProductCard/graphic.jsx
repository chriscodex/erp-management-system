'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { contarEstadoDeUnidades } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export default function GraphicSingleProductCard({ unidades }) {
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
    },
    {
      name: `Dañados`,
      unidades: unidadesDanadas,
    },
    {
      name: `Reparados`,
      unidades: unidadesReparadas,
    },
    {
      name: `Desaparecidos`,
      unidades: unidadesDesaparecidas,
    },
  ];

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Stock Total: {totalUnidades}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Label className="font-bold text-muted-foreground">{`Disponibles: ${unidadesDisponibles}`}</Label>
            <Label className="font-bold text-muted-foreground">{`Dañados: ${unidadesDanadas}`}</Label>
            <Label className="font-bold text-muted-foreground">{`Reparados: ${unidadesReparadas}`}</Label>
            <Label className="font-bold text-muted-foreground">{`Desaparecidos: ${unidadesDesaparecidas}`}</Label>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="unidades" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
