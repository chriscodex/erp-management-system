import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { RiFileListLine } from '@remixicon/react';
import { formatDateShort } from '@/lib/formateador';

export function DetailMecanicoOrdenDeServicioDetailSheet({ mecanico }) {
  return (
    <>
      <div className="flex items-center space-x-3">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer flex">
                <Sheet>
                  <SheetTrigger className="text-start">
                    <RiFileListLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Mecánico {mecanico?.nombre}</SheetTitle>
                      <SheetDescription>{mecanico?.dni}</SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Nombres
                        </label>
                        <p className="col-span-2">{mecanico?.nombres}</p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Apellidos
                        </label>
                        <p className="col-span-2">{mecanico?.apellidos}</p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Dirección
                        </label>
                        <p className="col-span-2">
                          {mecanico?.userId?.direccion || 'Desconocida'}
                        </p>
                      </div>
                      {/* <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Email
                          </label>
                          <p className="col-span-2">
                            {mecanico?.id?.email || "Desconocido"}
                          </p>
                        </div> */}
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Celular
                        </label>
                        <p className="col-span-2">
                          {mecanico?.userId?.celular || 'Desconocido'}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Fecha de ingreso
                        </label>
                        <div className="relative mt-1">
                          <p className="col-span-2">
                            {formatDateShort(
                              mecanico?.userId?.fechaIngreso,
                              false,
                            ) || 'Desconocida'}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Estado
                        </label>
                        <div className="col-span-2">
                          {mecanico?.userId?.estado === 'activo' ? (
                            <Badge variant="success">Activo</Badge>
                          ) : (
                            <Badge variant="error">Inactivo</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Detalle</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
