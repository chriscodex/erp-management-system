'use client';

import { useState } from 'react';
import { RiLock2Fill } from '@remixicon/react';
import { Button } from '@/components/ui/button';
import { FinalizarVentaAlert } from '@/app/ventas/[ventaId]/_components/dialogs/finalizarVentaAlert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function FinalizarVentaButton({ ventaId, disabled }) {
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  return (
    <>
      <TooltipProvider>
        <div className="flex justify-end space-x-4">
          {disabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    className="flex items-center bg-green-600 hover:bg-green-700"
                    disabled
                  >
                    <RiLock2Fill className="mr-1 h-4 w-4" />
                    Finalizar Venta
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Debe imprimir el comprobante antes de finalizar la venta</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              className="flex items-center bg-green-600 hover:bg-green-700"
              onClick={() => setIsOpenDialogDelete(true)}
            >
              <RiLock2Fill className="mr-1 h-4 w-4" />
              Finalizar Venta
            </Button>
          )}
        </div>
        {/* Dialog Delete */}
        <FinalizarVentaAlert
          isOpen={isOpenDialogDelete}
          setIsOpen={setIsOpenDialogDelete}
          ventaId={ventaId}
          actionAfterComplete="push"
        />
      </TooltipProvider>
    </>
  );
}
