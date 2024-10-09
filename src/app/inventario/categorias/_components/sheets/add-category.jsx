'use client';

import { Badge } from '@/components/ui/badge';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export function AddCategory({ categoryData }) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{categoryData?.nombre}</SheetTitle>
        <SheetDescription>
          Vista detallada de la categoría, donde se especifica el segmento al
          que pertenece dentro del inventario.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Segmento</label>
          <p className="col-span-2">{categoryData?.segmentId?.nombre}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Nombre</label>
          <p className="col-span-2">{categoryData?.nombre}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Descripción</label>
          <p className="col-span-2">{categoryData?.descripcion}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Estado</label>
          <p className="col-span-2">
            {categoryData?.estado === 'activo' ? (
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
