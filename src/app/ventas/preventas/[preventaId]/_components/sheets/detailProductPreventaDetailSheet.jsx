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

export function DetailProductPreventaDetailSheet({ productPreventa }) {
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
                  {productPreventa?.tipo === 'moto' ? (
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Moto {productPreventa?.nombre}</SheetTitle>
                        <SheetDescription>
                          {productPreventa?.code}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Nombre
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.nombre}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Descripción
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.descripcion}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Modelo
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.modelo}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Marca
                          </label>
                          <p className="col-span-2">{productPreventa?.marca}</p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Categoría
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.category}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Importado
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.importado === 'si' ? 'Si' : 'No'}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Almacén
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.almacen}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Estado
                          </label>
                          <div className="col-span-2">
                            {productPreventa?.estado?.titulo ===
                              'disponible' && (
                              <BadgeUnitProduct variant="successTable">
                                Disponible
                              </BadgeUnitProduct>
                            )}
                            {productPreventa?.estado?.titulo === 'reparado' && (
                              <BadgeUnitProduct variant="blueTable">
                                Reparado
                              </BadgeUnitProduct>
                            )}
                            {productPreventa?.estado?.titulo ===
                              'desarmado' && (
                              <BadgeUnitProduct variant="orangeTable">
                                Desarmado
                              </BadgeUnitProduct>
                            )}
                            {productPreventa?.estado?.titulo === 'dañado' && (
                              <BadgeUnitProduct variant="redTable">
                                Dañado
                              </BadgeUnitProduct>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Precio de venta
                          </label>
                          <div className="relative mt-1">
                            <p className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                              S/. {productPreventa?.precioVenta}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  ) : (
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>
                          Producto {productPreventa?.nombre}
                        </SheetTitle>
                        <SheetDescription>
                          {productPreventa?.code}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Nombre
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.nombre}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Descripción
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.descripcion}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Marca
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.marcaId?.nombre}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Categoría
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.categoryId?.nombre}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Importado
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.importado === 'si' ? 'Si' : 'No'}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Almacén
                          </label>
                          <p className="col-span-2">
                            {productPreventa?.almacenId?.nombre}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Estado
                          </label>
                          <div className="col-span-2">
                            {productPreventa?.estado === 'disponible' && (
                              <BadgeUnitProduct variant="successTable">
                                Disponible
                              </BadgeUnitProduct>
                            )}
                            {productPreventa?.estado === 'reparado' && (
                              <BadgeUnitProduct variant="blueTable">
                                Reparado
                              </BadgeUnitProduct>
                            )}
                            {productPreventa?.estado === 'desaparecido' && (
                              <BadgeUnitProduct variant="orangeTable">
                                Desaparecido
                              </BadgeUnitProduct>
                            )}
                            {productPreventa?.estado === 'dañado' && (
                              <BadgeUnitProduct variant="redTable">
                                Dañado
                              </BadgeUnitProduct>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <label className="col-span-1 text-left font-bold">
                            Precio de venta
                          </label>
                          <div className="relative mt-1">
                            <p className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                              S/. {productPreventa?.precioVenta}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  )}
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
