'use client';

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { formatDateShort } from '@/lib/formateador';

export function GastoDetail({ gastoData }) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Detalle del gasto</SheetTitle>
        <SheetDescription>{gastoData?.descripcion}</SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Monto</label>
          <p className="col-span-2">{gastoData?.monto}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Fecha</label>
          <p className="col-span-2">{formatDateShort(gastoData?.fecha, false)}</p>
        </div>
      </div>
    </SheetContent>
  );
}
