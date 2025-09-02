import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { RiDeleteBinLine } from '@remixicon/react';
import { DeleteUnitProductAlert } from '@/app/taller/ordenes-servicio/[id]/_components/dialogs/deleteUnitProductAlert';

export function DeleteProductoFromInventarioButton({
  ordenDeServicioData,
  productoOrdenDeServicio,
}) {
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  return (
    <div className="flex items-center space-x-3">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="cursor-pointer"
              onClick={() => setIsOpenDialogDelete(true)}
            >
              <RiDeleteBinLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DeleteUnitProductAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        actionAfterComplete="refresh"
        ordenDeServicioData={ordenDeServicioData}
        unitProductId={productoOrdenDeServicio?.unitId}
        productId={productoOrdenDeServicio?.productId?._id}
      />
    </div>
  );
}
