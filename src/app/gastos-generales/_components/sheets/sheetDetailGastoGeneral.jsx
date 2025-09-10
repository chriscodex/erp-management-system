'use client';

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { formatDateShort } from '@/lib/formateador';

export function GastoGeneralDetail({ gastoGeneralData }) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Detalle del gasto general</SheetTitle>
        <SheetDescription>{gastoGeneralData?.descripcion}</SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Monto</label>
          <p className="col-span-2">
            S/. {parseFloat(gastoGeneralData?.monto).toFixed(2)}
          </p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Fecha</label>
          <p className="col-span-2">
            {formatDateShort(gastoGeneralData?.fecha, false)}
          </p>
        </div>
      </div>
    </SheetContent>
  );
}
