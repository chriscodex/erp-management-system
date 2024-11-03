'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function GraphicSingleProductCard() {
  // Datos simulados para los gráficos
  const salesData = [
    { name: 'Disponibles', ventas: 12 },
    { name: 'Dañados', ventas: 1 },
    { name: 'Reparados', ventas: 0 },
    { name: 'Desaparecidos', ventas: 2 },
  ];

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Stock: 15</CardTitle>
          <div>
            <p className="text-sm text-muted-foreground">Total: 15</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total: 15</p>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}
