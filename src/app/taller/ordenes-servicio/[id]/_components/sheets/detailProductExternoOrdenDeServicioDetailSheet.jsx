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

export function DetailProductExternoOrdenDeServicioDetailSheet({ productoExternoOrdenDeServicio }) {

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
                          Producto {productoExternoOrdenDeServicio?.nombre}
                        </SheetTitle>
                        <SheetDescription>
                          {productoExternoOrdenDeServicio?.code}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Nombre
                          </label>
                          <p className="col-span-2">
                            {productoExternoOrdenDeServicio?.nombre}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Descripción
                          </label>
                          <p className="col-span-2">
                            {productoExternoOrdenDeServicio?.descripcion}
                          </p>
                        </div>
                        {productoExternoOrdenDeServicio?.cantidad && (
                          <div className="grid grid-cols-3 items-center gap-4">
                            <label className="col-span-1 text-left font-bold">
                              Cantidad
                            </label>
                            <p className="col-span-2">
                              {productoExternoOrdenDeServicio?.cantidad}
                            </p>
                          </div>
                        )}
                        {productoExternoOrdenDeServicio?.fecha && (
                          <div className="grid grid-cols-3 items-center gap-4">
                            <label className="col-span-1 text-left font-bold">
                              Fecha
                            </label>
                            <p className="col-span-2">
                              {formatDateShort(
                                productoExternoOrdenDeServicio?.fecha
                              , false)}
                            </p>
                          </div>
                        )}
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
