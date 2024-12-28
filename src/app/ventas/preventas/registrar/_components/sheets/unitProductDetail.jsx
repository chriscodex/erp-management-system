'use client';

import { Badge } from '@/components/ui/badge';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export function UnitProductDetailForPreventa({ unitProductData }) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{unitProductData?.nombre}</SheetTitle>
        <SheetDescription>
        {unitProductData?.descripcion}
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Segmento</label>
          <p className="col-span-2">{unitProductData?.segmentId?.nombre}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Nombre</label>
          <p className="col-span-2">{unitProductData?.nombre}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Descripción</label>
          <p className="col-span-2">{unitProductData?.descripcion}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Estado</label>
          <div className="col-span-2">
            {unitProductData?.estado === 'activo' ? (
              <Badge variant="success">Activo</Badge>
            ) : (
              <Badge variant="error">Inactivo</Badge>
            )}
          </div>
        </div>
      </div>
    </SheetContent>
  );
}
