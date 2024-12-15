'use client';

import { Package } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ModeloDataCard({ modelo }) {
  return (
    <Card className="w-full max-w-7xl">
      <CardHeader>
        <CardTitle className="text-lg">Detalles del Modelo</CardTitle>
        <div className="flex justify-start items-start">
          <div>
            <CardDescription>{modelo?.nombre}</CardDescription>
          </div>
        </div>
        {modelo?.descripcion && (
          <CardDescription>{modelo?.descripcion}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4 w-full">
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Código: {modelo?.code}</span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Marca: {modelo?.marcaId?.nombre}</span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Categoría: {modelo?.categoryId?.nombre}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
