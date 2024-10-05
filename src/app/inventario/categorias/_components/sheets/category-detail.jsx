'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export function CategoryDetail({ categoryData }) {
  console.log(categoryData);
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Detalle de la categoría</SheetTitle>
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
              <Badge variant='success'>
                Activo
              </Badge>
            ) : (
              <Badge variant='error'>
                Inactivo
              </Badge>
            )}
          </p>
        </div>
      </div>

      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
