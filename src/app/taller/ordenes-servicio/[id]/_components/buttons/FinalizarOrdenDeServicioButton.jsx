"use client";

import { useState } from "react";
import { RiFileCopy2Line } from "@remixicon/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { FinalizarOrdenDeServicioAlert } from "@/app/taller/ordenes-servicio/[id]/_components/dialogs/FinalizarOrdenDeServicioAlert";

export function FinalizarOrdenDeServicioButton({
  ordenDeServicioId,
  disabled
}) {
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex justify-end space-x-4">
        {disabled ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  className="flex items-center bg-green-600 opacity-80 cursor-not-allowed"
                  disabled
                >
                  <RiFileCopy2Line className="mr-2 h-4 w-4" />
                  Finalizar Orden de Servicio
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Debe imprimir el comprobante antes de finalizar la orden de
                servicio
              </p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            className="flex items-center bg-green-600 hover:bg-green-700"
            onClick={() => setIsOpenDialogDelete(true)}
          >
            <RiFileCopy2Line className="mr-2 h-4 w-4" />
            Finalizar Orden de Servicio
          </Button>
        )}
      </div>

      <FinalizarOrdenDeServicioAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        ordenDeServicioId={ordenDeServicioId}
        actionAfterComplete="push"
      />
    </TooltipProvider>
  );
}
