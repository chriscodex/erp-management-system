import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

export function DetailServicioOrdenDeServicioDetailSheet({
  servicioOrdenDeServicio,
}) {
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
                      <SheetTitle>
                        Servicio {servicioOrdenDeServicio?.nombre}
                      </SheetTitle>
                      <SheetDescription>
                        {servicioOrdenDeServicio?.code}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Descripción
                        </label>
                        <p className="col-span-2">
                          {servicioOrdenDeServicio?.descripcion}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Fecha
                        </label>
                        <div className="relative mt-1">
                          <p className="col-span-2">
                            {formatDateShort(
                              servicioOrdenDeServicio?.fecha,
                              false,
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Precio
                        </label>
                        <div className="relative mt-1">
                          <p className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                            S/. {servicioOrdenDeServicio?.precio}
                          </p>
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
