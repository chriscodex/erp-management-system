"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function ClienteDetail({ clienteData }) {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{clienteData?.datos?.nombre}</SheetTitle>
        <SheetDescription>
          Vista detallada de los datos del cliente.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Nombre</label>
          {clienteData?.tipo === "empresa" ? (
            <p className="col-span-2">{clienteData?.datos?.razonSocial}</p>
          ) : (
            <p className="col-span-2">
              {clienteData?.datos?.nombres} {clienteData?.datos?.apellidos}
            </p>
          )}
          <p className="col-span-2">{clienteData?.datos?.nombre}</p>
        </div>
        {clienteData?.tipo === "empresa" ? (
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="col-span-1 text-left font-bold">RUC</label>
            <p className="col-span-2">{clienteData?.datos?.ruc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 items-center gap-4">
            <label className="col-span-1 text-left font-bold">DNI</label>
            <p className="col-span-2">{clienteData?.datos?.dni}</p>
          </div>
        )}
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Direccion</label>
          <p className="col-span-2">{clienteData?.datos?.direccion}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Email</label>
          <p className="col-span-2">{clienteData?.datos?.email}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <label className="col-span-1 text-left font-bold">Celular</label>
          <p className="col-span-2">{clienteData?.datos?.celular}</p>
        </div>
      </div>
    </SheetContent>
  );
}
