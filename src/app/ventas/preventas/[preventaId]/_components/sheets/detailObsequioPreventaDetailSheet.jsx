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
import { BadgeUnitProduct } from '@/app/inventario/productos/[id]/_components/badgeUnitProduct/badgeUnitProduct';

export function DetailObsequioPreventaDetailSheet({ obsequioPreventa }) {
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
                        Obsequio {obsequioPreventa?.nombre}
                      </SheetTitle>
                      <SheetDescription>
                        {obsequioPreventa?.code}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Nombre
                        </label>
                        <p className="col-span-2">{obsequioPreventa?.nombre}</p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Descripción
                        </label>
                        <p className="col-span-2">
                          {obsequioPreventa?.descripcion}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Marca
                        </label>
                        <p className="col-span-2">
                          {obsequioPreventa?.marcaId?.nombre}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Categoría
                        </label>
                        <p className="col-span-2">
                          {obsequioPreventa?.categoryId?.nombre}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Importado
                        </label>
                        <p className="col-span-2">
                          {obsequioPreventa?.importado === 'si' ? 'Si' : 'No'}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Almacén
                        </label>
                        <p className="col-span-2">
                          {obsequioPreventa?.almacenId?.nombre}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="col-span-1 text-left font-bold">
                          Estado
                        </label>
                        <div className="col-span-2">
                          {obsequioPreventa?.estado === 'disponible' && (
                            <BadgeUnitProduct variant="successTable">
                              Disponible
                            </BadgeUnitProduct>
                          )}
                          {obsequioPreventa?.estado === 'reparado' && (
                            <BadgeUnitProduct variant="blueTable">
                              Reparado
                            </BadgeUnitProduct>
                          )}
                          {obsequioPreventa?.estado === 'desaparecido' && (
                            <BadgeUnitProduct variant="orangeTable">
                              Desaparecido
                            </BadgeUnitProduct>
                          )}
                          {obsequioPreventa?.estado === 'dañado' && (
                            <BadgeUnitProduct variant="redTable">
                              Dañado
                            </BadgeUnitProduct>
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
