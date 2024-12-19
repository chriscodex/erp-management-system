'use client';

import { Badge } from '@/components/ui/badge';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export function AlmacenDetail({ almacenData }) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{almacenData?.nombre}</SheetTitle>
        <SheetDescription>
          Vista detallada de los datos del almacén.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Nombre</label>
          <p className="col-span-2">{almacenData?.nombre}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Descripción</label>
          <p className="col-span-2">{almacenData?.descripcion}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Ubicación</label>
          <p className="col-span-2">{almacenData?.ubicacion}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Estado</label>
          <p className="col-span-2">
            {almacenData?.estado === 'activo' ? (
              <Badge variant="success">Activo</Badge>
            ) : (
              <Badge variant="error">Inactivo</Badge>
            )}
          </p>
        </div>
      </div>
    </SheetContent>
  );
}
