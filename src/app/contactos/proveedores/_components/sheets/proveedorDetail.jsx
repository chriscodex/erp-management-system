'use client';

import { Badge } from '@/components/ui/badge';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export function ProveedorDetail({ proveedorData }) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{proveedorData?.nombre}</SheetTitle>
        <SheetDescription>
          Vista detallada de los datos del proveedor.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Nombre</label>
          <p className="col-span-2">{proveedorData?.nombre}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">RUC</label>
          <p className="col-span-2">{proveedorData?.ruc}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Direccion</label>
          <p className="col-span-2">{proveedorData?.direccion}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Celular</label>
          <p className="col-span-2">{proveedorData?.celular}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Estado</label>
          <p className="col-span-2">
            {proveedorData?.estado === 'activo' ? (
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
