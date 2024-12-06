'use client';

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export function GastoDetail({ gastoData }) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Gasto</SheetTitle>
        <SheetDescription>{gastoData?.descripcion}</SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Monto</label>
          <p className="col-span-2">{gastoData?.Monto}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Fecha</label>
          <p className="col-span-2">{gastoData?.fecha}</p>
        </div>
      </div>
    </SheetContent>
  );
}
